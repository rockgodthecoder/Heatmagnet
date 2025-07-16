"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { CreateLeadMagnetPage } from "@/components/create-lead-magnet-page"
import { CreateFromPdfPage } from "@/components/create-from-pdf-page"
import { LeadMagnetSuccessPage } from "@/components/lead-magnet-success-page"
import { LeadMagnetsPage } from "@/components/lead-magnets-page"
import { LeadsPage } from "@/components/leads-page"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CreateFromScratchPage } from "@/components/create-from-scratch-page"
import { CreateFromNotionPage } from "@/components/create-from-notion-page"
import { UserLeadMagnetView } from "@/components/user-lead-magnet-view"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<
    | "home"
    | "dashboard"
    | "lead-magnets"
    | "leads"
    | "create-lead-magnet"
    | "create-from-pdf"
    | "create-from-scratch"
    | "create-from-notion"
    | "lead-magnet-success"
  >("home")
  const [leadMagnetData, setLeadMagnetData] = useState<{
    title: string
    description: string
    formType: string
  } | undefined>(undefined)
  const [mode, setMode] = useState<"admin" | "user">("admin")

  const handleCreateLeadMagnet = () => {
    setCurrentPage("create-lead-magnet")
  }

  const handleCreateFromPdf = () => {
    setCurrentPage("create-from-pdf")
  }

  const handleCreateFromScratch = () => {
    setCurrentPage("create-from-scratch")
  }

  const handleCreateFromNotion = () => {
    setCurrentPage("create-from-notion")
  }

  const handleLeadMagnetSuccess = (data: { title: string; description: string; formType: string }) => {
    setLeadMagnetData(data)
    setCurrentPage("lead-magnet-success")
    // After a short delay, navigate to lead magnets page
    setTimeout(() => {
      setCurrentPage("lead-magnets")
    }, 3000)
  }

  const handleBackToHome = () => {
    setCurrentPage("home")
  }

  const handleBackToCreateOptions = () => {
    setCurrentPage("create-lead-magnet")
  }

  const handleNavigate = (page: string) => {
    setCurrentPage(page as any)
  }

  return (
    <>
      {mode === "user" ? (
        <>
          <UserLeadMagnetView />
          {/* Floating Mode Toggle */}
          <div className="fixed bottom-6 left-6 z-50">
            <Button
              onClick={() => setMode("admin")}
              className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 h-12 px-4 rounded-full"
              size="lg"
            >
              ⚙️ Switch to Admin
            </Button>
          </div>
        </>
      ) : (
        <SidebarProvider defaultOpen={false}>
          <AppSidebar onCreateLeadMagnet={handleCreateLeadMagnet} onNavigate={handleNavigate} />
          <SidebarInset>
            <header className="flex h-20 shrink-0 items-center justify-between bg-sage/50 backdrop-blur-lg border border-sage/60 shadow-lg rounded-2xl px-8 mt-4 mx-4 z-10">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-sage/40 rounded-lg p-2 transition-colors" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-eucalyptus/40 backdrop-blur rounded-full flex items-center justify-center ring-2 ring-sage">
                    <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold text-sage font-sans">LeadMagnet Platform</h1>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-4 h-4 bg-sand rounded-full inline-block"></span>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-2 border-sage/60 hover:border-muted-teal/60 hover:bg-eucalyptus/40 backdrop-blur rounded-full transition-all duration-200 font-sans text-muted-teal"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h6v-2H4v2zM4 11h6V9H4v2zM4 7h6V5H4v2z" />
                  </svg>
                  Analytics
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-2 border-sand/60 hover:border-sage/60 hover:bg-eucalyptus/40 backdrop-blur rounded-full transition-all duration-200 font-sans text-sand"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </Button>
              </div>
            </header>

            {currentPage === "home" && (
              <div className="flex flex-1 flex-col gap-8 p-10 bg-gradient-to-br from-sage via-eucalyptus to-muted-teal min-h-[calc(100vh-6rem)] relative overflow-hidden">
                {/* Green SVG Blob */}
                <svg className="absolute right-0 top-0 w-2/3 h-full opacity-40 z-0" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="200" cy="200" rx="200" ry="120" fill="#b7d3b0" />
                  <ellipse cx="300" cy="100" rx="80" ry="60" fill="#cbead3" />
                  <ellipse cx="100" cy="300" rx="60" ry="40" fill="#8ec5b6" />
                </svg>
                {/* Hero Section */}
                <div className="text-left py-12 z-10">
                  <div className="bg-sage/60 backdrop-blur-lg border border-sage/60 shadow-lg rounded-3xl p-10 inline-block">
                    <h1 className="text-5xl font-extrabold text-sage font-sans mb-4">AI-Powered Lead Magnet Platform</h1>
                    <p className="text-2xl text-muted-teal max-w-2xl mb-8 font-sans">Transform your PDFs into interactive lead magnets with AI-driven insights and a fresh, glassy green design.</p>
                    <div className="flex gap-4">
                      <Button 
                        onClick={handleCreateLeadMagnet}
                        className="bg-black text-white font-bold px-10 py-4 rounded-full shadow-md hover:bg-gray-800 transition-all duration-200 text-lg font-sans backdrop-blur"
                      >
                        Create Lead Magnet
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setCurrentPage("lead-magnets")}
                        className="border-2 border-sand/60 text-sand px-10 py-4 rounded-full font-bold font-sans hover:bg-eucalyptus/40 hover:text-sage transition-all duration-200 text-lg backdrop-blur"
                      >
                        View All
                      </Button>
                    </div>
                  </div>
                </div>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 z-10">
                  <div className="bg-muted-teal/60 backdrop-blur-lg border border-sage/60 shadow-lg rounded-2xl p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-teal font-medium font-sans">Total Lead Magnets</p>
                        <p className="text-4xl font-extrabold text-sage font-sans">12</p>
                      </div>
                      <div className="w-14 h-14 bg-sage/40 backdrop-blur rounded-full flex items-center justify-center">
                        <svg className="w-7 h-7 text-muted-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-eucalyptus/60 backdrop-blur-lg border border-sage/60 shadow-lg rounded-2xl p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sage font-medium font-sans">Total Leads</p>
                        <p className="text-4xl font-extrabold text-muted-teal font-sans">847</p>
                      </div>
                      <div className="w-14 h-14 bg-muted-teal/40 backdrop-blur rounded-full flex items-center justify-center">
                        <svg className="w-7 h-7 text-eucalyptus" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-sage/60 backdrop-blur-lg border border-sage/60 shadow-lg rounded-2xl p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sand font-medium font-sans">Conversion Rate</p>
                        <p className="text-4xl font-extrabold text-sage font-sans">23.4%</p>
                      </div>
                      <div className="w-14 h-14 bg-sand/40 backdrop-blur rounded-full flex items-center justify-center">
                        <svg className="w-7 h-7 text-sand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Recent Activity */}
                <div className="bg-eucalyptus/60 backdrop-blur-lg border border-sage/60 shadow-lg rounded-2xl p-8 z-10">
                  <h3 className="text-2xl font-bold text-sage mb-4 font-sans">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-sage/20 rounded-xl">
                      <div className="w-10 h-10 bg-muted-teal/40 backdrop-blur rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sage">New lead magnet created</p>
                        <p className="text-sm text-muted-teal">"E-commerce Conversion Guide" - 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-eucalyptus/20 rounded-xl">
                      <div className="w-10 h-10 bg-sage/40 backdrop-blur rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-eucalyptus" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-eucalyptus">Lead captured</p>
                        <p className="text-sm text-sage">sarah@company.com downloaded "Marketing Funnel Guide" - 4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-sand/20 rounded-xl">
                      <div className="w-10 h-10 bg-eucalyptus/40 backdrop-blur rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-sand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sand">PDF converted</p>
                        <p className="text-sm text-eucalyptus">"Sales Strategy PDF" successfully converted to HTML - 6 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentPage === "dashboard" && (
              <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Lead Magnets</h2>
                  <Button 
                    onClick={handleCreateLeadMagnet}
                    className="bg-black text-white px-6 py-2 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-200 font-semibold"
                  >
                    + Create New
                  </Button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start h-12 text-left">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Upload PDF
                      </Button>
                      <Button variant="outline" className="w-full justify-start h-12 text-left">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        View Documents
                      </Button>
                      <Button variant="outline" className="w-full justify-start h-12 text-left">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Analytics
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Documents</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">E-commerce Guide</p>
                          <p className="text-xs text-gray-600">2 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">Marketing Funnel</p>
                          <p className="text-xs text-gray-600">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentPage === "lead-magnets" && (
              <LeadMagnetsPage onBack={() => setCurrentPage('home')} />
            )}

            {currentPage === "leads" && <LeadsPage />}

            {currentPage === "create-lead-magnet" && (
              <CreateLeadMagnetPage
                onBack={handleBackToHome}
                onCreateFromPdf={handleCreateFromPdf}
                onCreateFromScratch={handleCreateFromScratch}
                onCreateFromNotion={handleCreateFromNotion}
              />
            )}

            {currentPage === "create-from-pdf" && (
              <CreateFromPdfPage onBack={handleBackToCreateOptions} onSuccess={handleLeadMagnetSuccess} />
            )}

            {currentPage === "lead-magnet-success" && (
              <LeadMagnetSuccessPage onBack={handleBackToCreateOptions} leadMagnetData={leadMagnetData} />
            )}

            {currentPage === "create-from-scratch" && (
              <CreateFromScratchPage onBack={handleBackToCreateOptions} onSuccess={handleLeadMagnetSuccess} />
            )}

            {currentPage === "create-from-notion" && (
              <CreateFromNotionPage onBack={handleBackToCreateOptions} onSuccess={handleLeadMagnetSuccess} />
            )}
          </SidebarInset>
          {/* Floating Mode Toggle */}
          <div className="fixed bottom-6 left-6 z-50">
            <Button
              onClick={() => setMode("user")}
              className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 h-12 px-4 rounded-full"
              size="lg"
            >
              👤 Switch to User
            </Button>
          </div>
        </SidebarProvider>
      )}
    </>
  )
}
