'use client';
import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function UploadPdfPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be 10MB or less.');
      return;
    }
    setPdfFile(file);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setError(null);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be 10MB or less.');
      return;
    }
    setPdfFile(file);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  async function convertPdfToHtml(fileUrl: string, documentId: string, userId: string): Promise<void> {
    try {
      const { convertPdfToHtml } = await import('@/lib/actions/convert-pdf');
      const result = await convertPdfToHtml(fileUrl, documentId, userId);
      
      if (!result.success || !result.htmlContent) {
        throw new Error('PDF conversion failed');
      }

      let finalHtmlContent = result.htmlContent;

      // Upload images if they exist
      if (result.imageData) {
        console.log('Uploading images:', Object.keys(result.imageData));
        
        for (const [imageFile, base64Data] of Object.entries(result.imageData)) {
          // Convert base64 back to blob
          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const imageBlob = new Blob([byteArray], { type: 'image/png' });
          
          // Upload image to Supabase Storage
          const storagePath = `images/${documentId}/${imageFile}`;
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('documents')
            .upload(storagePath, imageBlob, {
              contentType: 'image/png',
              cacheControl: '3600',
              upsert: false,
            });

          if (uploadError) {
            console.error(`Failed to upload image ${imageFile}:`, uploadError);
          } else {
            console.log(`Successfully uploaded image: ${imageFile}`);
            
            // Get the public URL for the image
            const { data: { publicUrl } } = supabase.storage
              .from('documents')
              .getPublicUrl(storagePath);
            
            console.log(`Public URL for ${imageFile}: ${publicUrl}`);
            
            // Update HTML to reference the uploaded image
            const imageRegex = new RegExp(`src="${imageFile}"`, 'g');
            finalHtmlContent = finalHtmlContent.replace(imageRegex, `src="${publicUrl}"`);
          }
        }
      }

      // Upload HTML to Supabase Storage
      const htmlFileName = `${documentId}.html`;
      const htmlBlob = new Blob([finalHtmlContent], { type: 'text/html' });
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(`html/${htmlFileName}`, htmlBlob, {
          contentType: 'text/html',
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('HTML upload error:', uploadError);
        throw new Error(`Failed to upload HTML: ${uploadError.message}`);
      }

      // Get the public URL for the HTML file
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(`html/${htmlFileName}`);

      // Update the document record with the HTML URL
      const { error: updateError } = await supabase
        .from('documents')
        .update({ 
          html_url: publicUrl,
          html_content: finalHtmlContent // Also store in database for quick access
        })
        .eq('id', documentId)
        .eq('user_id', userId);

      if (updateError) {
        console.error('Database update error:', updateError);
        throw new Error(`Failed to update document: ${updateError.message}`);
      }

    } catch (err) {
      console.error('PDF conversion error:', err);
      throw new Error('Failed to convert PDF to HTML');
    }
  }

  async function handleCreateLeadMagnet() {
    if (!pdfFile || !title) return;
    setIsUploading(true);
    setError(null);
    setProgress(0);
    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      console.log('User data:', user);
      console.log('User ID:', user?.id);
      console.log('User error:', userError);
      
      if (userError || !user) {
        throw new Error('User not authenticated');
      }

      // Upload PDF to Supabase Storage
      const safeFileName = pdfFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `pdfs/${Date.now()}_${safeFileName}`;
      const { data, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, pdfFile, {
          cacheControl: '3600',
          upsert: false,
        });
      if (uploadError) throw uploadError;
      
      setProgress(50);
      
      // Insert document metadata into DB first
      const insertData = {
        title,
        description,
        file_url: data?.path,
        user_id: user.id,
      };
      console.log('Inserting data:', insertData);
      
      const { data: docData, error: dbError } = await supabase.from('documents').insert([insertData]).select();
      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }
      
      const documentId = docData?.[0]?.id;
      if (!documentId) {
        throw new Error('Failed to get document ID');
      }
      
      setProgress(75);
      
      // Convert PDF to HTML using server action
      console.log('About to call convertPdfToHtml with:', {
        fileUrl: data?.path,
        documentId,
        userId: user.id
      });
      
      try {
        await convertPdfToHtml(data?.path, documentId, user.id);
        console.log('convertPdfToHtml completed successfully');
      } catch (conversionError) {
        console.error('convertPdfToHtml failed with error:', conversionError);
        throw conversionError;
      }
      
      setProgress(100);
      router.push('/');
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Upload failed.');
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4 py-12">
      <button
        onClick={() => router.push('/upload')}
        className="mb-8 text-gray-600 hover:text-gray-900 text-sm underline self-start"
      >
        ← Back
      </button>
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-xl flex flex-col gap-8">
        <h1 className="text-2xl font-bold mb-2">Create Lead Magnet from PDF</h1>
        <section>
          <h2 className="font-semibold mb-2">Upload Your PDF</h2>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-black transition-colors mb-2"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center">
              <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0l-4 4m4-4l4 4m-8 4h8" /></svg>
              <span className="font-medium text-gray-700">Drop your PDF here</span>
              <span className="text-sm text-gray-500">or click to browse files</span>
              <button
                type="button"
                className="mt-2 px-4 py-2 border rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
              >
                Choose PDF File
              </button>
              <span className="text-xs text-gray-400 mt-1">Maximum file size: 10MB</span>
              {pdfFile && (
                <span className="text-xs text-green-600 mt-2">Selected: {pdfFile.name}</span>
              )}
            </div>
          </div>
        </section>
        <section>
          <h2 className="font-semibold mb-2">Lead Magnet Details</h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring"
              placeholder="Enter lead magnet title..."
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring"
              placeholder="Describe what this lead magnet offers to your audience..."
              rows={4}
            />
          </div>
        </section>
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        {isUploading && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-black h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
            <div className="text-sm text-gray-600 mt-1">
              {progress < 50 ? 'Uploading PDF...' : 
               progress < 75 ? 'Converting to HTML...' : 
               'Saving to database...'}
            </div>
          </div>
        )}
        <button
          className="w-full py-3 rounded bg-black text-white font-semibold text-lg disabled:opacity-50 hover:bg-gray-800 transition-all duration-200"
          disabled={!pdfFile || !title || isUploading}
          onClick={handleCreateLeadMagnet}
        >
          + Create Lead Magnet
        </button>
      </div>
    </div>
  );
} 