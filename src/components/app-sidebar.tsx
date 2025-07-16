"use client"

import { Home, LayoutDashboard, Magnet, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useState, useEffect } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

// Menu items
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
    id: "home",
  },
  {
    title: "Lead Magnets",
    url: "#",
    icon: Magnet,
    id: "lead-magnets",
  },
  {
    title: "Leads",
    url: "#",
    icon: Users,
    id: "leads",
  },
]

interface AppSidebarProps {
  onCreateLeadMagnet: () => void
  onNavigate: (page: string) => void
}

export function AppSidebar({ onCreateLeadMagnet, onNavigate }: AppSidebarProps) {
  const { setOpen } = useSidebar()
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const handleCreateLeadMagnet = () => {
    onCreateLeadMagnet()
    setOpen(false) // Close sidebar after clicking
  }

  const handleMenuClick = (pageId: string) => {
    onNavigate(pageId)
    setOpen(false) // Close sidebar after clicking menu item
  }

  async function handleSignOut() {
    setSigningOut(true)
    await supabase.auth.signOut()
    setSigningOut(false)
    router.push("/auth")
  }

  return (
    <Sidebar collapsible="offcanvas" className="border-l-4 border-sage bg-sage/40 backdrop-blur-lg shadow-lg rounded-3xl">
      <SidebarContent className="p-6">
        {/* Logo/Brand */}
        <div className="mb-10 flex items-center gap-3 bg-muted-teal/50 backdrop-blur border border-sage/60 shadow rounded-2xl px-4 py-3">
          <div className="w-10 h-10 bg-eucalyptus/40 backdrop-blur rounded-full flex items-center justify-center ring-2 ring-sage">
            <Magnet className="h-6 w-6 text-sage" />
          </div>
          <h2 className="text-2xl font-bold text-sage font-sans">LeadMagnet</h2>
        </div>
        {/* Create Button */}
        <div className="mb-8">
          <Button 
            className="w-full bg-black text-white font-semibold rounded-full py-3 shadow-md hover:bg-gray-800 transition-all duration-200 backdrop-blur" 
            onClick={handleCreateLeadMagnet}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Create Lead Magnet
          </Button>
        </div>
        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-sage uppercase tracking-wider mb-3">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className="group rounded-full px-2 py-1 mb-2 bg-eucalyptus/40 backdrop-blur hover:ring-2 hover:ring-muted-teal transition-all duration-200"
                  >
                    <a 
                      href={item.url} 
                      onClick={() => handleMenuClick(item.id)}
                      className="flex items-center gap-3 px-4 py-2 rounded-full font-medium text-muted-teal group-hover:text-sage"
                    >
                      <div className="w-8 h-8 flex items-center justify-center">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* Quick Stats */}
        <div className="mt-10 p-4 bg-sage/50 backdrop-blur border border-sage/60 rounded-2xl shadow">
          <h3 className="text-sm font-semibold text-sage mb-3">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-sage">Active Magnets</span>
              <span className="font-semibold text-muted-teal">12</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-sage">Total Leads</span>
              <span className="font-semibold text-eucalyptus">847</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-sage">This Month</span>
              <span className="font-semibold text-sand">+23%</span>
            </div>
          </div>
        </div>
        {/* Sign Out Button */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mt-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-gray-700 font-semibold text-lg">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 truncate">
                {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
              </div>
              <div className="text-sm text-gray-600 truncate">{user?.email}</div>
            </div>
          </div>
          <Button
            className="w-full bg-white text-gray-700 font-semibold rounded-lg py-2 shadow-sm hover:bg-gray-50 transition-all duration-200 border border-gray-200 flex items-center justify-center gap-2"
            onClick={handleSignOut}
            disabled={signingOut}
          >
            {signingOut && (
              <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin inline-block"></span>
            )}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Log out
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
