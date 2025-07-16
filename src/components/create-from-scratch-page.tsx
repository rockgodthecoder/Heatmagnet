"use client"

import { useState } from "react"
import { ArrowLeft, CheckCircle, Eye, Users, Briefcase, GraduationCap, ShoppingCart, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface CreateFromScratchPageProps {
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

export function CreateFromScratchPage({ onBack, onSuccess }: CreateFromScratchPageProps) {
  const [leadMagnetTitle, setLeadMagnetTitle] = useState("")
  const [leadMagnetDescription, setLeadMagnetDescription] = useState("")
  const [content, setContent] = useState("")
  const [selectedForm, setSelectedForm] = useState<string | null>(null)
  const [previewForm, setPreviewForm] = useState<string | null>(null)

  const handleCreateLeadMagnet = () => {
    const selectedFormData = qualificationForms.find((form) => form.id === selectedForm)
    onSuccess({
      title: leadMagnetTitle,
      description: leadMagnetDescription,
      formType: selectedFormData?.name || "Basic Contact Form",
    })
  }

  const selectedFormData = qualificationForms.find((form) => form.id === selectedForm)

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 relative">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Create Lead Magnet from Scratch</h1>
      </div>

      <div className="flex-1 flex items-start justify-center pt-8">
        <div className="w-full max-w-2xl space-y-6">
          {/* Content Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Lead Magnet Content</h2>
              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  placeholder="Enter your lead magnet content here... You can include text, tips, guides, or any valuable information you want to share with your audience."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  This content will be the main value proposition of your lead magnet
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Lead Magnet Details */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Lead Magnet Details</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter lead magnet title..."
                    value={leadMagnetTitle}
                    onChange={(e) => setLeadMagnetTitle(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this lead magnet offers to your audience..."
                    value={leadMagnetDescription}
                    onChange={(e) => setLeadMagnetDescription(e.target.value)}
                    rows={4}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

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

          {/* Create Button */}
          <div className="flex justify-end pt-6">
            <Button onClick={handleCreateLeadMagnet} className="bg-black text-white hover:bg-gray-800" size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Create Lead Magnet
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
