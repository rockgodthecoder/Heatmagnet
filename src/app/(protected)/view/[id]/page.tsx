'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface Document {
  id: string;
  title: string;
  description: string;
  file_url: string;
  html_url?: string;
  html_content?: string;
  created_at: string;
  user_id: string;
}

export default function ViewDocument() {
  const params = useParams();
  const router = useRouter();
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>('');

  // Function to process HTML content for better text-image flow
  const processHtmlContent = (html: string): string => {
    // The custom CSS in the manifest should handle most layout issues
    // Just return the HTML as-is for now
    return html;
  };

  useEffect(() => {
    async function fetchDocument() {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          router.push('/auth');
          return;
        }

        const documentId = params.id as string;
        
        // Fetch document metadata
        const { data, error } = await supabase
          .from('documents')
          .select('*')
          .eq('id', documentId)
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching document:', error);
          setError('Document not found');
          return;
        }

        setDocument(data);

        console.log('Document data:', data);
        console.log('HTML content from DB:', data.html_content);
        console.log('HTML URL from DB:', data.html_url);

        // Get HTML content
        if (data.html_content) {
          // Use HTML content from database
          console.log('Using HTML content from database');
          console.log('HTML content preview:', data.html_content.substring(0, 500));
          
          // Check for image references
          const imgMatches = data.html_content.match(/src="([^"]+)"/g);
          console.log('Image references found:', imgMatches);
          
          // Process the HTML content for better text-image flow
          const processedHtml = processHtmlContent(data.html_content);
          setHtmlContent(processedHtml);
        } else if (data.html_url) {
          // Fetch HTML from Supabase Storage
          console.log('Fetching HTML from storage URL:', data.html_url);
          const { data: htmlData, error: htmlError } = await supabase.storage
            .from('documents')
            .download(data.html_url);
          
          if (htmlError || !htmlData) {
            console.error('HTML fetch error:', htmlError);
            setError('Failed to load HTML content');
            return;
          }
          
          const htmlText = await htmlData.text();
          console.log('HTML content from storage:', htmlText.substring(0, 200) + '...');
          
          // Process the HTML content for better text-image flow
          const processedHtml = processHtmlContent(htmlText);
          setHtmlContent(processedHtml);
        } else {
          console.log('No HTML content or URL found');
          setError('No HTML content available');
        }

      } catch (err) {
        console.error('Error:', err);
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchDocument();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading document...</p>
        </div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error || 'Document not found'}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{document.title}</h1>
              {document.description && (
                <p className="text-gray-600 mt-1">{document.description}</p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-gray-600 hover:text-gray-900 text-sm underline"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HTML Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {htmlContent ? (
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <style dangerouslySetInnerHTML={{
              __html: `
                /* Basic styling for PDF content */
                .pdf-content {
                  max-width: 900px;
                  margin: 0 auto;
                  background: white;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                
                /* Additional layout fixes if needed */
                .pdf-content img {
                  max-width: 100%;
                  height: auto;
                }
                
                /* Responsive design */
                @media (max-width: 768px) {
                  .pdf-content {
                    max-width: 100%;
                    padding: 15px;
                  }
                }
              `
            }} />
            <div 
              className="pdf-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <p className="text-gray-600">No HTML content available for this document.</p>
          </div>
        )}
      </main>
    </div>
  );
} 