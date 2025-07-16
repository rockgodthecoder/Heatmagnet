"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
      
      if (!session) {
        console.log('🔒 No session found, redirecting to auth')
        router.push('/auth')
      } else {
        console.log('✅ User authenticated:', session.user.email)
      }
    }

    checkAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔄 Auth state changed:', event, !!session)
      setIsAuthenticated(!!session)
      
      if (!session && event === 'SIGNED_OUT') {
        console.log('🔒 User signed out, redirecting to auth')
        router.push('/auth')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  // Show loading while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sage via-eucalyptus to-muted-teal">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-sage border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sage font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (isAuthenticated === false) {
    return null // Router will handle redirect
  }

  // Show protected content if authenticated
  return <>{children}</>
} 