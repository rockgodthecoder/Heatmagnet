"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Upload,
  FileText,
  X,
  CheckCircle,
  Eye,
  Users,
  Briefcase,
  GraduationCap,
  ShoppingCart,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"

interface CreateFromPdfPageProps {
  onBack: () => void
  onSuccess: (data: { title: string; description: string; formType: string }) => void
}

const qualificationForms = [
  {
    id: "basic",
    name: "Basic Contact Form",
    description: "Simple form with name, email, and company",
    icon: Users,
    fields: ["Name", "Email", "Company"],
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "business",
    name: "Business Qualification",
    description: "Detailed business information and needs assessment",
    icon: Briefcase,
    fields: ["Name", "Email", "Company", "Role", "Company Size", "Budget Range", "Timeline"],
    color: "bg-green-100 text-green-800",
  },
  {
    id: "ecommerce",
    name: "E-commerce Lead Form",
    description: "Perfect for online store owners and marketers",
    icon: ShoppingCart,
    fields: ["Name", "Email", "Store URL", "Platform", "Monthly Revenue", "Main Challenge"],
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "education",
    name: "Educational Lead Form",
    description: "Ideal for courses, training, and educational content",
    icon: GraduationCap,
    fields: ["Name", "Email", "Experience Level", "Learning Goals", "Industry"],
    color: "bg-orange-100 text-orange-800",
  },
]

export function CreateFromPdfPage({ onBack, onSuccess }: CreateFromPdfPageProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [leadMagnetTitle, setLeadMagnetTitle] = useState("")
  const [leadMagnetDescription, setLeadMagnetDescription] = useState("")
  const [selectedForm, setSelectedForm] = useState<string | null>(null)
  const [previewForm, setPreviewForm] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const file = event.target.files?.[0]
    if (!file) return
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.")
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be 10MB or less.")
      return
    }
    setUploadedFile(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setError(null)
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.")
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be 10MB or less.")
      return
    }
    setUploadedFile(file)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    setUploadProgress(0)
    setIsUploading(false)
    setError(null)
  }

  async function convertPdfToHtml(fileUrl: string, documentId: string, userId: string): Promise<void> {
    try {
      const { convertPdfToHtml } = await import('@/lib/actions/convert-pdf')
      const result = await convertPdfToHtml(fileUrl, documentId, userId)
      
      if (!result.success || !result.htmlContent) {
        throw new Error('PDF conversion failed')
      }

      let finalHtmlContent = result.htmlContent

      // Upload images if they exist
      if (result.imageData) {
        console.log('Uploading images:', Object.keys(result.imageData))
        
        for (const [imageFile, base64Data] of Object.entries(result.imageData)) {
          // Convert base64 back to blob
          const byteCharacters = atob(base64Data)
          const byteNumbers = new Array(byteCharacters.length)
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i)
          }
          const byteArray = new Uint8Array(byteNumbers)
          const imageBlob = new Blob([byteArray], { type: 'image/png' })
          
          // Upload image to Supabase Storage
          const storagePath = `images/${documentId}/${imageFile}`
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('documents')
            .upload(storagePath, imageBlob, {
              contentType: 'image/png',
              cacheControl: '3600',
              upsert: false,
            })

          if (uploadError) {
            console.error(`Failed to upload image ${imageFile}:`, uploadError)
          } else {
            console.log(`Successfully uploaded image: ${imageFile}`)
            
            // Get the public URL for the image
            const { data: { publicUrl } } = supabase.storage
              .from('documents')
              .getPublicUrl(storagePath)
            
            console.log(`Public URL for ${imageFile}: ${publicUrl}`)
            
            // Update HTML to reference the uploaded image
            const imageRegex = new RegExp(`src="${imageFile}"`, 'g')
            finalHtmlContent = finalHtmlContent.replace(imageRegex, `src="${publicUrl}"`)
          }
        }
      }

      // Upload HTML to Supabase Storage
      const htmlFileName = `${documentId}.html`
      const htmlBlob = new Blob([finalHtmlContent], { type: 'text/html' })
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(`html/${htmlFileName}`, htmlBlob, {
          contentType: 'text/html',
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        console.error('HTML upload error:', uploadError)
        throw new Error(`Failed to upload HTML: ${uploadError.message}`)
      }

      // Get the public URL for the HTML file
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(`html/${htmlFileName}`)

      // Update the document record with the HTML URL
      const { error: updateError } = await supabase
        .from('documents')
        .update({ 
          html_url: publicUrl,
          html_content: finalHtmlContent // Also store in database for quick access
        })
        .eq('id', documentId)
        .eq('user_id', userId)

      if (updateError) {
        console.error('Database update error:', updateError)
        throw new Error(`Failed to update document: ${updateError.message}`)
      }

    } catch (err) {
      console.error('PDF conversion error:', err)
      throw new Error('Failed to convert PDF to HTML')
    }
  }

  const handleCreateLeadMagnet = async () => {
    if (!uploadedFile || !leadMagnetTitle) return
    setIsUploading(true)
    setError(null)
    setUploadProgress(0)
    
    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        throw new Error('User not authenticated')
      }

      // Upload PDF to Supabase Storage
      const safeFileName = uploadedFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const filePath = `pdfs/${Date.now()}_${safeFileName}`
      const { data, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, uploadedFile, {
          cacheControl: '3600',
          upsert: false,
        })
      if (uploadError) throw uploadError
      
      setUploadProgress(50)
      
      // Insert document metadata into DB first
      const insertData = {
        title: leadMagnetTitle,
        description: leadMagnetDescription,
        file_url: data?.path,
        user_id: user.id,
      }
      
      const { data: docData, error: dbError } = await supabase.from('documents').insert([insertData]).select()
      if (dbError) {
        console.error('Database error:', dbError)
        throw dbError
      }
      
      const documentId = docData?.[0]?.id
      if (!documentId) {
        throw new Error('Failed to get document ID')
      }
      
      setUploadProgress(75)
      
      // Convert PDF to HTML using server action
      await convertPdfToHtml(data?.path, documentId, user.id)
      
      setUploadProgress(100)
      
      // Call success callback
      const selectedFormData = qualificationForms.find((form) => form.id === selectedForm)
      onSuccess({
        title: leadMagnetTitle,
        description: leadMagnetDescription,
        formType: selectedFormData?.name || "Basic Contact Form",
      })
      
    } catch (err: any) {
      console.error('Upload error:', err)
      setError(err.message || 'Upload failed.')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const selectedFormData = qualificationForms.find((form) => form.id === selectedForm)

  const isFormComplete = uploadedFile && leadMagnetTitle && selectedForm && !isUploading

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 relative">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Create Lead Magnet from PDF
          </h1>
          <p className="text-gray-600 mt-1">Upload your PDF and convert it into an interactive lead magnet</p>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center">
        <div className="w-full max-w-3xl space-y-8">
          {/* Upload Section */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Upload className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Upload Your PDF</h2>
                  <p className="text-gray-600 text-sm">Select a PDF file to convert into a lead magnet</p>
                </div>
              </div>

              {!uploadedFile ? (
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Upload className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Drop your PDF here</h3>
                  <p className="text-gray-600 mb-6">or click to browse files</p>
                  <Input 
                    type="file" 
                    accept=".pdf" 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    id="pdf-upload"
                    ref={fileInputRef}
                  />
                  <Label htmlFor="pdf-upload">
                    <Button 
                      variant="outline" 
                      className="cursor-pointer bg-white border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 px-8 py-3 rounded-full transition-all duration-200"
                    >
                      Choose PDF File
                    </Button>
                  </Label>
                  <p className="text-xs text-gray-500 mt-4">Maximum file size: 10MB • Supports all PDF formats</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-600">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Ready to convert</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveFile}
                      className="text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full p-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {isUploading && (
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-gray-700">
                          {uploadProgress < 50 ? '📤 Uploading PDF...' : 
                           uploadProgress < 75 ? '🔄 Converting to HTML...' : 
                           '💾 Saving to database...'}
                        </span>
                        <span className="text-blue-600">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {uploadProgress === 100 && !isUploading && (
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border border-green-200">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-800">Upload complete!</p>
                        <p className="text-sm text-green-700">Your PDF has been successfully uploaded and converted</p>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl border border-red-200">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <X className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-red-800">Upload failed</p>
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lead Magnet Details */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Lead Magnet Details</h2>
                  <p className="text-gray-600 text-sm">Configure your lead magnet information</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700 mb-2 block">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter lead magnet title..."
                    value={leadMagnetTitle}
                    onChange={(e) => setLeadMagnetTitle(e.target.value)}
                    className="h-12 border-2 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700 mb-2 block">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this lead magnet offers to your audience..."
                    value={leadMagnetDescription}
                    onChange={(e) => setLeadMagnetDescription(e.target.value)}
                    rows={4}
                    className="border-2 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl transition-all duration-200"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Processing Options */}
          {uploadedFile && uploadProgress === 100 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Processing Options</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="extract-text" defaultChecked />
                    <Label htmlFor="extract-text">Extract text content</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="create-forms" defaultChecked />
                    <Label htmlFor="create-forms">Create interactive forms</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="optimize-images" defaultChecked />
                    <Label htmlFor="optimize-images">Optimize images</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="add-tracking" defaultChecked />
                    <Label htmlFor="add-tracking">Add engagement tracking</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lead Qualification Form Selection */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Lead Qualification Form</h2>
              <p className="text-muted-foreground mb-6">Choose a pre-made form to capture qualified leads</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {qualificationForms.map((form) => (
                  <div
                    key={form.id}
                    className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedForm === form.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedForm(form.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <form.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm mb-1">{form.name}</h3>
                        <p className="text-xs text-muted-foreground mb-3">{form.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className={form.color}>
                            {form.fields.length} fields
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setPreviewForm(previewForm === form.id ? null : form.id)
                            }}
                            className="text-xs"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Preview
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Selection indicator */}
                    {selectedForm === form.id && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                    )}

                    {/* Preview dropdown */}
                    {previewForm === form.id && (
                      <div className="mt-4 p-3 bg-muted/50 rounded-lg border-t">
                        <h4 className="text-xs font-medium mb-2">Form Fields:</h4>
                        <div className="space-y-1">
                          {form.fields.map((field, index) => (
                            <div key={index} className="text-xs text-muted-foreground">
                              • {field}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {selectedFormData && (
                <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">Selected: {selectedFormData.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This form will be shown to users before they can access your lead magnet.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Processing Status */}
          {isProcessing && (
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
                  <h3 className="font-medium">Processing your PDF...</h3>
                  <p className="text-sm text-muted-foreground">
                    This may take a few minutes depending on the file size and complexity.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Create Button */}
          <div className="flex justify-end pt-6">
            <Button 
              onClick={handleCreateLeadMagnet} 
              disabled={!isFormComplete}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed" 
              size="lg"
            >
              {isUploading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Lead Magnet...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create Lead Magnet
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
