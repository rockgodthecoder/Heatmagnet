"use client"

import { useState } from "react"
import { FileText, File, BookOpen, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CreateLeadMagnetPageProps {
  onBack: () => void
  onCreateFromPdf: () => void
  onCreateFromScratch: () => void
  onCreateFromNotion: () => void
}

export function CreateLeadMagnetPage({
  onBack,
  onCreateFromPdf,
  onCreateFromScratch,
  onCreateFromNotion,
}: CreateLeadMagnetPageProps) {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)

  const options = [
    {
      id: "scratch",
      title: "Create From Scratch",
      description: "Start with a blank canvas and build your lead magnet from the ground up",
      icon: FileText,
      action: onCreateFromScratch,
    },
    {
      id: "pdf",
      title: "Create from PDF",
      description: "Upload an existing PDF and convert it into an interactive lead magnet",
      icon: File,
      action: onCreateFromPdf,
    },
    {
      id: "notion",
      title: "Create from Notion",
      description: "Import content from your Notion workspace to create a lead magnet",
      icon: BookOpen,
      action: onCreateFromNotion,
    },
  ]

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Create Lead Magnet</h1>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Choose Your Creation Method</h2>
            <p className="text-muted-foreground">Select how you'd like to create your lead magnet</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {options.map((option) => (
              <Card
                key={option.id}
                className="relative cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-primary"
                onMouseEnter={() => setHoveredOption(option.id)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                <CardContent className="flex flex-col items-center text-center p-8">
                  <div className="mb-6 p-4 rounded-full bg-primary/10">
                    <option.icon className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{option.title}</h3>
                  <p className="text-muted-foreground">{option.description}</p>
                </CardContent>

                {/* Hover overlay with Create button */}
                {hoveredOption === option.id && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg transition-all">
                    <Button size="lg" className="bg-white text-black hover:bg-gray-100" onClick={option.action}>
                      Create
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
