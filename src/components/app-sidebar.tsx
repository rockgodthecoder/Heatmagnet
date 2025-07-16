"use client"

import { Home, LayoutDashboard, Magnet, Users } from "lucide-react"

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
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
    id: "dashboard",
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

  const handleCreateLeadMagnet = () => {
    onCreateLeadMagnet()
    setOpen(false) // Close sidebar after clicking
  }

  const handleMenuClick = (pageId: string) => {
    onNavigate(pageId)
    setOpen(false) // Close sidebar after clicking menu item
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
            className="w-full bg-sage/80 text-muted-teal font-semibold rounded-full py-3 shadow-md hover:bg-muted-teal/80 hover:text-sage transition-all duration-200 backdrop-blur" 
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
      </SidebarContent>
    </Sidebar>
  )
}
