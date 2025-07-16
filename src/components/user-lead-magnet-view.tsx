"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, FileText, Star } from "lucide-react"
import { SampleDocumentView } from "./sample-document-view"

export function UserLeadMagnetView() {
  const [step, setStep] = useState<"form" | "success" | "document">("form")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("success")
  }

  const handleDownload = () => {
    // Simulate download
    const link = document.createElement("a")
    link.href = "/placeholder.pdf"
    link.download = "Top-80-Ecom-Homepages-Breakdown.pdf"
    link.click()
  }

  const handleViewDocument = () => {
    setStep("document")
  }

  const handleBackToSuccess = () => {
    setStep("success")
  }

  if (step === "document") {
    return <SampleDocumentView onBack={handleBackToSuccess} />
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <Card className="shadow-xl border-0">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h1>
                <p className="text-gray-600">
                  Your download is ready. Check your email for additional resources and updates.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Top 80 Ecom Homepages Breakdown</h3>
                    <p className="text-sm text-gray-600">Comprehensive analysis and insights</p>
                  </div>
                </div>
                <Button onClick={handleViewDocument} className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  <FileText className="h-5 w-5 mr-2" />
                  View Document Online
                </Button>
              </div>

              <div className="text-sm text-gray-500">
                <p>
                  We've sent a copy to <strong>{formData.email}</strong>
                </p>
                <p className="mt-2">Don't forget to check your spam folder and add us to your contacts!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Lead Magnet Preview */}
          <div className="text-center md:text-left">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Star className="h-4 w-4" />
                Free Download
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Top 80 Ecom Homepages Breakdown</h1>
              <p className="text-xl text-gray-600 mb-6">
                Get exclusive insights into the highest-converting e-commerce homepage designs and strategies used by
                top brands.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">What you'll get:</h3>
              <ul className="space-y-3 text-left">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">80 homepage breakdowns with detailed analysis</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Conversion optimization strategies</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Design patterns that drive sales</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Actionable insights for your store</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500">
              <span>👥 36 responses</span>
            </div>
          </div>

          {/* Right side - Form */}
          <div>
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Your Free Copy</h2>
                  <p className="text-gray-600">Enter your details below to download instantly</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company" className="text-gray-700">
                      Company Name
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Enter your company name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                    Get Access Now
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By downloading, you agree to receive occasional emails with tips and updates. Unsubscribe anytime.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
