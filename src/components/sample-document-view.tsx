"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Star,
  TrendingUp,
  Users,
  ShoppingCart,
  MessageCircle,
  Send,
  X,
  FileText,
  Eye,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { ConversionLabPage } from "./conversion-lab-page"

interface SampleDocumentViewProps {
  onBack: () => void
}

const relatedDocuments = [
  {
    id: 1,
    title: "Checkout Abandonment Recovery Guide",
    description: "26 proven strategies to reduce cart abandonment",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Checkout+Guide",
    views: "2.1k",
    readTime: "8 min",
    category: "CRO",
  },
  {
    id: 2,
    title: "Mobile Commerce Optimization",
    description: "Complete guide to mobile e-commerce best practices",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Mobile+Commerce",
    views: "1.8k",
    readTime: "12 min",
    category: "Mobile",
  },
  {
    id: 3,
    title: "Product Page Conversion Tactics",
    description: "15 elements that boost product page conversions",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Product+Pages",
    views: "3.2k",
    readTime: "6 min",
    category: "CRO",
  },
  {
    id: 4,
    title: "Email Marketing for E-commerce",
    description: "Automated sequences that drive repeat purchases",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Email+Marketing",
    views: "1.5k",
    readTime: "10 min",
    category: "Marketing",
  },
  {
    id: 5,
    title: "Social Proof Implementation",
    description: "How to add trust signals that convert visitors",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Social+Proof",
    views: "2.7k",
    readTime: "5 min",
    category: "CRO",
  },
]

export function SampleDocumentView({ onBack }: SampleDocumentViewProps) {
  const [bookmarked, setBookmarked] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "What are you struggling with right now? I'll show you more relevant guides.",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showConversionLabPage, setShowConversionLabPage] = useState(false)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user" as const,
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Thanks for sharing! Based on your question, I recommend checking out our 'Conversion Rate Optimization Checklist' and 'Mobile Commerce Best Practices' guides. Would you like me to send those to you?",
        sender: "bot" as const,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  if (showConversionLabPage) {
    return <ConversionLabPage onBack={() => setShowConversionLabPage(false)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Top 80 Ecom Homepages Breakdown</h1>
                <p className="text-sm text-gray-600">Comprehensive analysis and insights</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBookmarked(!bookmarked)}
                className={bookmarked ? "bg-yellow-50 border-yellow-200" : ""}
              >
                <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-yellow-400 text-yellow-400" : ""}`} />
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div
          className={`grid gap-8 transition-all duration-300 ${
            sidebarCollapsed ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-4"
          }`}
        >
          {/* Main Content */}
          <div
            className={`space-y-8 transition-all duration-300 ${sidebarCollapsed ? "lg:col-span-1" : "lg:col-span-3"}`}
          >
            {/* Introduction */}
            <Card>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">The Ultimate E-commerce Homepage Analysis</h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    We analyzed 80 of the highest-converting e-commerce homepages to uncover the patterns, strategies,
                    and design elements that drive sales.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">80</div>
                    <div className="text-sm text-gray-600">Homepages Analyzed</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">15+</div>
                    <div className="text-sm text-gray-600">Key Insights</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">100M+</div>
                    <div className="text-sm text-gray-600">Combined Traffic</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Findings */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Findings</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">1. Hero Section Optimization</h4>
                    <p className="text-gray-600 mb-3">
                      87% of top-performing homepages feature a clear value proposition within the first 3 seconds of
                      loading. The most effective hero sections combine:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                      <li>Compelling headline that addresses customer pain points</li>
                      <li>High-quality product imagery or video</li>
                      <li>Clear call-to-action button with action-oriented text</li>
                      <li>Social proof elements (reviews, ratings, customer count)</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-500 pl-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">2. Navigation Patterns</h4>
                    <p className="text-gray-600 mb-3">
                      The most successful e-commerce sites use a hybrid navigation approach that balances simplicity
                      with comprehensive product discovery:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                      <li>Sticky navigation bar with search prominence</li>
                      <li>Mega menus for category-rich stores</li>
                      <li>Breadcrumb navigation for easy backtracking</li>
                      <li>Quick access to account and cart</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">3. Trust Signals</h4>
                    <p className="text-gray-600 mb-3">
                      Trust-building elements are strategically placed throughout high-converting homepages:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                      <li>Customer reviews and ratings prominently displayed</li>
                      <li>Security badges and payment options</li>
                      <li>Return policy and guarantee information</li>
                      <li>Press mentions and awards</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sample Analysis */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Sample Analysis: Brand Spotlight</h3>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">A</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Allbirds</h4>
                      <p className="text-gray-600">Sustainable footwear brand</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">What Works:</h5>
                      <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                        <li>Clean, minimalist design that reflects brand values</li>
                        <li>Sustainability messaging prominently featured</li>
                        <li>Product benefits clearly communicated</li>
                        <li>Strong use of lifestyle imagery</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Conversion Elements:</h5>
                      <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                        <li>Free shipping threshold clearly stated</li>
                        <li>30-day trial period highlighted</li>
                        <li>Customer reviews integrated into product display</li>
                        <li>Size guide easily accessible</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actionable Insights */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Actionable Insights for Your Store</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Quick Wins</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-sm font-bold">1</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Optimize your headline</p>
                          <p className="text-sm text-gray-600">Focus on benefits, not features</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-sm font-bold">2</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Add social proof</p>
                          <p className="text-sm text-gray-600">Display reviews and customer count</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-sm font-bold">3</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Improve CTA buttons</p>
                          <p className="text-sm text-gray-600">Use action words and contrasting colors</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Long-term Strategy</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-600 text-sm font-bold">1</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Implement A/B testing</p>
                          <p className="text-sm text-gray-600">Test different layouts and messaging</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-600 text-sm font-bold">2</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Personalization</p>
                          <p className="text-sm text-gray-600">Tailor content based on user behavior</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-600 text-sm font-bold">3</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Mobile optimization</p>
                          <p className="text-sm text-gray-600">Ensure seamless mobile experience</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Related Documents */}
          {!sidebarCollapsed && (
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <Card>
                  <CardContent
                    className="p-6 cursor-pointer hover:bg-blue-50 transition-colors duration-200 group"
                    onClick={() => setShowConversionLabPage(true)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                        <TrendingUp className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 group-hover:text-blue-700 transition-colors">
                          ConversionLab
                        </h4>
                        <p className="text-xs text-blue-700">E-commerce Optimization Experts</p>
                      </div>
                    </div>
                    <p className="text-sm text-blue-800 leading-relaxed mb-4">
                      We help e-commerce brands increase their conversion rates through data-driven optimization
                      strategies and proven methodologies.
                    </p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-blue-700">
                      Book a Call
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Recommended from ConversionLab</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSidebarCollapsed(true)}
                        className="h-8 w-8 p-0 hover:bg-gray-100"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {relatedDocuments.map((doc) => (
                        <div key={doc.id} className="group cursor-pointer">
                          <div className="relative mb-3">
                            <img
                              src={doc.thumbnail || "/placeholder.svg"}
                              alt={doc.title}
                              className="w-full h-24 object-cover rounded-lg bg-gray-100"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                              <FileText className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-900 text-sm leading-tight group-hover:text-blue-600 transition-colors">
                              {doc.title}
                            </h4>
                            <p className="text-xs text-gray-600 line-clamp-2">{doc.description}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  <span>{doc.views}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{doc.readTime}</span>
                                </div>
                              </div>
                              <span className="bg-gray-100 px-2 py-1 rounded text-xs">{doc.category}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Collapsed Sidebar Toggle */}
          {sidebarCollapsed && (
            <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-40">
              <Button
                onClick={() => setSidebarCollapsed(false)}
                className="bg-white shadow-lg border hover:bg-gray-50 h-12 w-12 p-0 rounded-full"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <Button
            onClick={() => setChatOpen(true)}
            className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 h-14 w-14 rounded-full p-0"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        ) : (
          <Card className="w-80 h-96 shadow-xl border-0 bg-white">
            <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <span className="font-medium">Guide Assistant</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setChatOpen(false)}
                className="text-white hover:bg-blue-700 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col h-80">
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about your challenges..."
                    className="flex-1"
                  />
                  <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
