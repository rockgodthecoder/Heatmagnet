"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  CheckCircle,
  Star,
  Calendar,
  Clock,
  Eye,
  FileText,
  ChevronRight,
  MessageCircle,
  Send,
  X,
} from "lucide-react"
import { Input } from "@/components/ui/input"

interface ConversionLabPageProps {
  onBack: () => void
}

const services = [
  {
    icon: TrendingUp,
    title: "Conversion Rate Optimization",
    description: "Systematic testing and optimization to increase your conversion rates by 20-40%",
    features: ["A/B Testing", "User Experience Analysis", "Landing Page Optimization", "Funnel Analysis"],
  },
  {
    icon: BarChart3,
    title: "Analytics & Data Analysis",
    description: "Deep dive into your data to uncover hidden opportunities and bottlenecks",
    features: ["Google Analytics Setup", "Custom Dashboards", "Performance Tracking", "ROI Analysis"],
  },
  {
    icon: Target,
    title: "E-commerce Optimization",
    description: "Specialized optimization for online stores to maximize revenue per visitor",
    features: [
      "Product Page Optimization",
      "Checkout Flow Improvement",
      "Cart Abandonment Recovery",
      "Mobile Optimization",
    ],
  },
  {
    icon: Users,
    title: "User Research & Testing",
    description: "Understand your customers better through comprehensive research and testing",
    features: ["User Interviews", "Heatmap Analysis", "Session Recordings", "Usability Testing"],
  },
]

const caseStudies = [
  {
    company: "TechGear Pro",
    industry: "Electronics",
    challenge: "Low conversion rate on product pages",
    solution: "Redesigned product pages with better imagery and social proof",
    results: "+127% conversion rate increase",
    revenue: "$2.3M additional revenue",
    timeframe: "3 months",
  },
  {
    company: "StyleHub Fashion",
    industry: "Fashion",
    challenge: "High cart abandonment rate",
    solution: "Optimized checkout flow and added trust signals",
    results: "+89% checkout completion",
    revenue: "$1.8M additional revenue",
    timeframe: "2 months",
  },
  {
    company: "HomeDecor Plus",
    industry: "Home & Garden",
    challenge: "Poor mobile conversion rates",
    solution: "Mobile-first redesign and speed optimization",
    results: "+156% mobile conversions",
    revenue: "$3.1M additional revenue",
    timeframe: "4 months",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechGear Pro",
    content:
      "ConversionLab transformed our online store. The results speak for themselves - 127% increase in conversions and over $2M in additional revenue.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Marketing Director, StyleHub",
    content:
      "Their data-driven approach and attention to detail is impressive. They don't just make changes, they test everything and prove what works.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Founder, HomeDecor Plus",
    content:
      "Working with ConversionLab was the best investment we made. Their mobile optimization alone generated over $3M in additional revenue.",
    rating: 5,
  },
]

export function ConversionLabPage({ onBack }: ConversionLabPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
  })

  const [chatOpen, setChatOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm here to help you with conversion optimization questions. What challenges are you facing with your e-commerce store?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])

  const [analyticsOpen, setAnalyticsOpen] = useState(false)
  const [selectedLeadMagnet, setSelectedLeadMagnet] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

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
        text: "Thanks for your question! Based on your needs, I can recommend specific optimization strategies. Would you like me to connect you with one of our conversion experts for a personalized consultation?",
        sender: "bot" as const,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const handleLeadMagnetClick = (title: string) => {
    setSelectedLeadMagnet(title)
    setAnalyticsOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">ConversionLab</h1>
                <p className="text-sm text-gray-600">E-commerce Optimization Experts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Increase Your Conversion Rates by 20-40%</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We help e-commerce brands optimize their websites using data-driven strategies that deliver measurable
            results. Our proven methodology has generated over $50M in additional revenue for our clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Calendar className="h-5 w-5 mr-2" />
              Book Free Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              View Case Studies
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">$50M+</div>
              <div className="text-gray-600">Additional Revenue Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-gray-600">Successful Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">35%</div>
              <div className="text-gray-600">Average Conversion Increase</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Magnets & Resources Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Free Resources & Lead Magnets</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Download our proven guides and templates to start optimizing your e-commerce store today
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card
              className="hover:shadow-lg transition-shadow group cursor-pointer"
              onClick={() => handleLeadMagnetClick("Top 80 Ecom Homepages Breakdown")}
            >
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <img
                    src="/placeholder.svg?height=160&width=280&text=Top+80+Ecom+Homepages"
                    alt="Top 80 Ecom Homepages Breakdown"
                    className="w-full h-40 object-cover rounded-lg bg-orange-100"
                  />
                  <div className="absolute top-3 right-3 bg-orange-600 text-white px-2 py-1 rounded text-xs font-medium">
                    FREE
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  Top 80 Ecom Homepages Breakdown
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Comprehensive analysis of the highest-converting e-commerce homepage designs and strategies.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>2.1k views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>15 min read</span>
                    </div>
                  </div>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Popular</span>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <FileText className="h-4 w-4 mr-2" />
                  Read Now
                </Button>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow group cursor-pointer"
              onClick={() => handleLeadMagnetClick("26 Tests to Reduce Checkout Abandonment")}
            >
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <img
                    src="/placeholder.svg?height=160&width=280&text=Checkout+Abandonment+Guide"
                    alt="Checkout Abandonment Recovery Guide"
                    className="w-full h-40 object-cover rounded-lg bg-green-100"
                  />
                  <div className="absolute top-3 right-3 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                    FREE
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  26 Tests to Reduce Checkout Abandonment
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Proven strategies and A/B tests to recover lost sales and improve checkout completion rates.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>1.8k views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>12 min read</span>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">CRO</span>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <FileText className="h-4 w-4 mr-2" />
                  Read Now
                </Button>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow group cursor-pointer"
              onClick={() => handleLeadMagnetClick("Mobile Commerce Optimization Guide")}
            >
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <img
                    src="/placeholder.svg?height=160&width=280&text=Mobile+Commerce+Guide"
                    alt="Mobile Commerce Optimization"
                    className="w-full h-40 object-cover rounded-lg bg-purple-100"
                  />
                  <div className="absolute top-3 right-3 bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
                    FREE
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  Mobile Commerce Optimization Guide
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Complete guide to mobile e-commerce best practices and conversion optimization techniques.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>1.5k views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>10 min read</span>
                    </div>
                  </div>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Mobile</span>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <FileText className="h-4 w-4 mr-2" />
                  Read Now
                </Button>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow group cursor-pointer"
              onClick={() => handleLeadMagnetClick("15 Product Page Conversion Tactics")}
            >
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <img
                    src="/placeholder.svg?height=160&width=280&text=Product+Page+Tactics"
                    alt="Product Page Conversion Tactics"
                    className="w-full h-40 object-cover rounded-lg bg-blue-100"
                  />
                  <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                    FREE
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  15 Product Page Conversion Tactics
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Essential elements and strategies to boost product page conversions and increase sales.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>2.3k views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>8 min read</span>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">CRO</span>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <FileText className="h-4 w-4 mr-2" />
                  Read Now
                </Button>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow group cursor-pointer"
              onClick={() => handleLeadMagnetClick("Email Marketing for E-commerce")}
            >
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <img
                    src="/placeholder.svg?height=160&width=280&text=Email+Marketing+Guide"
                    alt="Email Marketing for E-commerce"
                    className="w-full h-40 object-cover rounded-lg bg-yellow-100"
                  />
                  <div className="absolute top-3 right-3 bg-yellow-600 text-white px-2 py-1 rounded text-xs font-medium">
                    FREE
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  Email Marketing for E-commerce
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Automated email sequences and strategies that drive repeat purchases and customer loyalty.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>1.9k views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>14 min read</span>
                    </div>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Marketing</span>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <FileText className="h-4 w-4 mr-2" />
                  Read Now
                </Button>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow group cursor-pointer"
              onClick={() => handleLeadMagnetClick("Social Proof Implementation Guide")}
            >
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <img
                    src="/placeholder.svg?height=160&width=280&text=Social+Proof+Implementation"
                    alt="Social Proof Implementation"
                    className="w-full h-40 object-cover rounded-lg bg-red-100"
                  />
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                    FREE
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  Social Proof Implementation Guide
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  How to add trust signals and social proof elements that convert visitors into customers.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>1.7k views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>6 min read</span>
                    </div>
                  </div>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Trust</span>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <FileText className="h-4 w-4 mr-2" />
                  Read Now
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="bg-transparent">
              View All Resources
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive optimization services designed to maximize your e-commerce performance
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600">Don't just take our word for it</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Book a Call Section */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Book a Call with Us</h2>
          <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
            Ready to increase your conversion rates? Schedule a free 30-minute consultation to discuss your goals and
            see how we can help transform your e-commerce business.
          </p>
          <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 text-lg">
            <Calendar className="h-6 w-6 mr-3" />
            Book Meeting
          </Button>
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
                <span className="font-medium">CRO Assistant</span>
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
                    placeholder="Ask about conversion optimization..."
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
      {/* Analytics Popup */}
      {analyticsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Analytics - {selectedLeadMagnet}</h2>
                <Button variant="ghost" size="sm" onClick={() => setAnalyticsOpen(false)} className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2,143</div>
                  <div className="text-sm text-gray-600">Total Views</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">847</div>
                  <div className="text-sm text-gray-600">Downloads</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">39.5%</div>
                  <div className="text-sm text-gray-600">Conversion Rate</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Direct</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Social Media</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Email</span>
                      <span className="font-medium">18%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Search</span>
                      <span className="font-medium">9%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Top Performing Days</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tuesday</span>
                      <span className="font-medium">156 views</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Wednesday</span>
                      <span className="font-medium">142 views</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Thursday</span>
                      <span className="font-medium">138 views</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Monday</span>
                      <span className="font-medium">124 views</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Downloaded by john@example.com - 2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Viewed by sarah@company.com - 4 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Downloaded by mike@startup.io - 6 hours ago</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setAnalyticsOpen(false)} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
