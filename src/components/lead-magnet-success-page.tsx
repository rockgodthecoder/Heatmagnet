"use client"

import { useState } from "react"
import { ArrowLeft, Copy, Check, ExternalLink, Share2, Eye, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface LeadMagnetSuccessPageProps {
  onBack: () => void
  leadMagnetData?: {
    title: string
    description: string
    formType: string
  }
}

export function LeadMagnetSuccessPage({ onBack, leadMagnetData }: LeadMagnetSuccessPageProps) {
  const [copiedUrl, setCopiedUrl] = useState(false)
  const [copiedEmbedCode, setCopiedEmbedCode] = useState(false)

  // Generate a realistic URL for the lead magnet
  const leadMagnetUrl = `https://leadmagnets.app/m/${Math.random().toString(36).substring(2, 15)}`
  const embedCode = `<iframe src="${leadMagnetUrl}/embed" width="100%" height="600" frameborder="0"></iframe>`

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(leadMagnetUrl)
      setCopiedUrl(true)
      setTimeout(() => setCopiedUrl(false), 2000)
    } catch (err) {
      console.error("Failed to copy URL:", err)
    }
  }

  const handleCopyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCode)
      setCopiedEmbedCode(true)
      setTimeout(() => setCopiedEmbedCode(false), 2000)
    } catch (err) {
      console.error("Failed to copy embed code:", err)
    }
  }

  const handlePreview = () => {
    window.open(leadMagnetUrl, "_blank")
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: leadMagnetData?.title || "My Lead Magnet",
          text: leadMagnetData?.description || "Check out this lead magnet",
          url: leadMagnetUrl,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      // Fallback to copying URL
      handleCopyUrl()
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Lead Magnet Created Successfully!</h1>
      </div>

      <div className="flex-1 flex items-start justify-center pt-8">
        <div className="w-full max-w-2xl space-y-6">
          {/* Success Message */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-green-800">Your lead magnet is ready!</h2>
                  <p className="text-sm text-green-600">
                    {leadMagnetData?.title || "Your PDF lead magnet"} has been successfully created and is now live.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lead Magnet Details */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Lead Magnet Details</h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Title</Label>
                  <p className="font-medium">{leadMagnetData?.title || "Untitled Lead Magnet"}</p>
                </div>
                {leadMagnetData?.description && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                    <p className="text-sm">{leadMagnetData.description}</p>
                  </div>
                )}
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Qualification Form</Label>
                  <Badge variant="secondary" className="mt-1">
                    {leadMagnetData?.formType || "Basic Contact Form"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Share URL */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Share Your Lead Magnet</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="lead-magnet-url" className="text-sm font-medium">
                    Lead Magnet URL
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="lead-magnet-url"
                      value={leadMagnetUrl}
                      readOnly
                      className="font-mono text-sm bg-muted/50"
                    />
                    <Button onClick={handleCopyUrl} variant="outline" className="flex-shrink-0 bg-transparent">
                      {copiedUrl ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copiedUrl ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Share this URL to let people access your lead magnet
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handlePreview} variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                  <Button onClick={handleShare} variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <ExternalLink className="h-4 w-4" />
                    Open
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Embed Code */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Embed on Your Website</h3>
              <div>
                <Label htmlFor="embed-code" className="text-sm font-medium">
                  Embed Code
                </Label>
                <div className="flex gap-2 mt-1">
                  <textarea
                    id="embed-code"
                    value={embedCode}
                    readOnly
                    className="flex-1 min-h-[80px] px-3 py-2 text-sm border border-input bg-muted/50 rounded-md font-mono resize-none"
                  />
                  <Button
                    onClick={handleCopyEmbedCode}
                    variant="outline"
                    className="flex-shrink-0 self-start bg-transparent"
                  >
                    {copiedEmbedCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copiedEmbedCode ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Copy this code to embed the lead magnet directly on your website
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Customize your lead magnet</p>
                    <p className="text-xs text-muted-foreground">Add branding, modify forms, or update content</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Share2 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Start promoting</p>
                    <p className="text-xs text-muted-foreground">Share on social media, email, or embed on your site</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Eye className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Track performance</p>
                    <p className="text-xs text-muted-foreground">Monitor views, conversions, and lead quality</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
