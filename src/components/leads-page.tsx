"use client"

import { useState } from "react"
import { MoreHorizontal, Calendar, ChevronDown, Phone, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample most engaged leads data
const mostEngagedLeads = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    avatar: "/placeholder.svg?height=40&width=40",
    engagementScore: 98,
    completedMagnets: 12,
    lastActivity: "2 hours ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@startup.io",
    avatar: "/placeholder.svg?height=40&width=40",
    engagementScore: 95,
    completedMagnets: 10,
    lastActivity: "5 hours ago",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@agency.com",
    avatar: "/placeholder.svg?height=40&width=40",
    engagementScore: 92,
    completedMagnets: 9,
    lastActivity: "1 day ago",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david@ecommerce.co",
    avatar: "/placeholder.svg?height=40&width=40",
    engagementScore: 89,
    completedMagnets: 8,
    lastActivity: "2 days ago",
  },
]

// Sample all leads data
const allLeads = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    source: "Top 80 Ecom Homepages",
    status: "Hot",
    engagementScore: 98,
    joinedDate: "15 Mar 2025",
    lastActivity: "2 hours ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@startup.io",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    source: "Tissot Funnel Breakdown",
    status: "Warm",
    engagementScore: 95,
    joinedDate: "18 Mar 2025",
    lastActivity: "5 hours ago",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@agency.com",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    source: "Live Fast Die Young",
    status: "Hot",
    engagementScore: 92,
    joinedDate: "20 Mar 2025",
    lastActivity: "1 day ago",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david@ecommerce.co",
    phone: "+1 (555) 456-7890",
    location: "Seattle, WA",
    source: "Lululemon Funnel",
    status: "Cold",
    engagementScore: 89,
    joinedDate: "22 Mar 2025",
    lastActivity: "2 days ago",
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.wang@tech.com",
    phone: "+1 (555) 567-8901",
    location: "Los Angeles, CA",
    source: "Q1 CRO Bundle",
    status: "Warm",
    engagementScore: 85,
    joinedDate: "25 Mar 2025",
    lastActivity: "3 days ago",
  },
  {
    id: 6,
    name: "James Wilson",
    email: "j.wilson@retail.com",
    phone: "+1 (555) 678-9012",
    location: "Chicago, IL",
    source: "Walmart Funnel",
    status: "Hot",
    engagementScore: 82,
    joinedDate: "28 Mar 2025",
    lastActivity: "4 days ago",
  },
  {
    id: 7,
    name: "Anna Martinez",
    email: "anna.m@marketing.co",
    phone: "+1 (555) 789-0123",
    location: "Miami, FL",
    source: "Checkout Tests",
    status: "Warm",
    engagementScore: 78,
    joinedDate: "30 Mar 2025",
    lastActivity: "5 days ago",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Hot":
      return "bg-red-100 text-red-800 hover:bg-red-100"
    case "Warm":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    case "Cold":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

export function LeadsPage() {
  const [sortBy, setSortBy] = useState("engagement")

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Leads</h1>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Calendar className="h-4 w-4" />
                Sort by Engagement
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy("engagement")}>Engagement Score</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("date")}>Date Joined</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("activity")}>Last Activity</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("name")}>Name</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Most Engaged Leads Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Most Engaged Leads of All Time
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mostEngagedLeads.map((lead) => (
            <Card key={lead.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={lead.avatar || "/placeholder.svg"} alt={lead.name} />
                    <AvatarFallback>
                      {lead.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{lead.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{lead.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Engagement</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {lead.engagementScore}%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Completed</span>
                    <span className="text-xs font-medium">{lead.completedMagnets} magnets</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Last seen</span>
                    <span className="text-xs">{lead.lastActivity}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Leads Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Leads</h2>
        <div className="space-y-1">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-medium text-muted-foreground border-b">
            <div className="col-span-3">Name</div>
            <div className="col-span-2">Contact</div>
            <div className="col-span-2">Source</div>
            <div className="col-span-1 text-center">Status</div>
            <div className="col-span-1 text-center">Score</div>
            <div className="col-span-2 text-center">Joined</div>
            <div className="col-span-1 text-center">Activity</div>
          </div>

          {/* Table Rows */}
          {allLeads.map((lead) => (
            <div
              key={lead.id}
              className="grid grid-cols-12 gap-4 px-4 py-4 hover:bg-muted/50 border-b border-border/50 items-center"
            >
              <div className="col-span-3 flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {lead.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="font-medium text-sm">{lead.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{lead.email}</div>
                </div>
              </div>

              <div className="col-span-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  <Phone className="h-3 w-3" />
                  <span className="truncate">{lead.phone}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{lead.location}</span>
                </div>
              </div>

              <div className="col-span-2">
                <span className="text-sm truncate">{lead.source}</span>
              </div>

              <div className="col-span-1 text-center">
                <Badge variant="secondary" className={getStatusColor(lead.status)}>
                  {lead.status}
                </Badge>
              </div>

              <div className="col-span-1 text-center">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {lead.engagementScore}%
                </Badge>
              </div>

              <div className="col-span-2 text-center text-sm text-muted-foreground">{lead.joinedDate}</div>

              <div className="col-span-1 text-center text-xs text-muted-foreground">{lead.lastActivity}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
