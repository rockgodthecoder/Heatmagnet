"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<'sign-in' | 'sign-up' | 'forgot'>("sign-in")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  // Listen for auth state changes
  useEffect(() => {
    console.log('🔧 Setting up auth state listener...')
    
    // Check current session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log('🔧 Current session check:', { session: !!session, error: error?.message })
    })
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔄 Auth state changed:', event, !!session)
      console.log('👤 Session user:', session?.user?.email || 'none')
      if (event === 'SIGNED_IN' && session) {
        console.log('✅ User signed in, redirecting...')
        // Use router.push for better Next.js integration
        setTimeout(() => {
          router.push('/')
        }, 500)
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  function handleTab(mode: 'sign-in' | 'sign-up') {
    setAuthMode(mode)
    setError(null)
    setSuccess(null)
    setEmail("")
    setPassword("")
  }

  function handleForgot() {
    setAuthMode("forgot")
    setError(null)
    setSuccess(null)
    setEmail("")
    setPassword("")
  }

  function handleBackToSignIn() {
    setAuthMode("sign-in")
    setError(null)
    setSuccess(null)
    setEmail("")
    setPassword("")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      if (authMode === "sign-up") {
        console.log('🔐 Attempting sign up with:', { email, password: '***' })
        const { data, error } = await supabase.auth.signUp({ email, password })
        console.log('📊 Sign up response:', { data: !!data, error: error?.message })
        if (error) throw error
        console.log('✅ Sign up successful')
        setSuccess("Account created! Signing you in...")
      } else if (authMode === "sign-in") {
        console.log('🔐 Attempting sign in with:', { email, password: '***' })
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        console.log('📊 Sign in response:', { 
          data: !!data, 
          user: data?.user?.email || 'none',
          session: !!data?.session,
          error: error?.message 
        })
        if (error) throw error
        console.log('✅ Sign in successful')
        setSuccess("Signed in! Redirecting...")
        
        // Check session immediately after sign in
        const { data: { session } } = await supabase.auth.getSession()
        console.log('🔍 Session after sign in:', { session: !!session, user: session?.user?.email || 'none' })
      } else if (authMode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + "/auth/reset"
        })
        if (error) throw error
        setSuccess("Password reset email sent. Check your inbox.")
      }
    } catch (err: any) {
      setError(err.message || "Authentication error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sage via-eucalyptus to-muted-teal font-sans">
      <div className="w-full max-w-md mx-auto p-8 bg-sage/60 backdrop-blur-lg border border-sage/60 shadow-2xl rounded-3xl flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-extrabold text-sage mb-1">Welcome</h1>
          <p className="text-muted-teal text-sm">Sign in or create an account to continue</p>
        </div>
        <div className="flex justify-center gap-2 mb-2">
          <button
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 focus:outline-none ${authMode === "sign-in" ? "bg-sage/80 text-muted-teal shadow" : "bg-eucalyptus/40 text-sage hover:bg-sage/30"}`}
            onClick={() => handleTab("sign-in")}
            disabled={authMode === "sign-in"}
          >
            Sign In
          </button>
          <button
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 focus:outline-none ${authMode === "sign-up" ? "bg-sage/80 text-muted-teal shadow" : "bg-eucalyptus/40 text-sage hover:bg-sage/30"}`}
            onClick={() => handleTab("sign-up")}
            disabled={authMode === "sign-up"}
          >
            Sign Up
          </button>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-sage">Email</label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@email.com"
              className="bg-eucalyptus/40 border border-sage/40 focus:border-sage focus:ring-2 focus:ring-sage/30 rounded-xl text-muted-teal placeholder:text-sage"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          {authMode !== "forgot" && (
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-semibold text-sage">Password</label>
              <Input
                id="password"
                type="password"
                autoComplete={authMode === "sign-up" ? "new-password" : "current-password"}
                placeholder="••••••••"
                className="bg-eucalyptus/40 border border-sage/40 focus:border-sage focus:ring-2 focus:ring-sage/30 rounded-xl text-muted-teal placeholder:text-sage"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          )}
          {authMode === "sign-in" && (
            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs text-muted-teal hover:underline hover:text-sage font-semibold"
                onClick={handleForgot}
              >
                Forgot password?
              </button>
            </div>
          )}
          {authMode === "forgot" && (
            <div className="flex flex-col gap-2">
              <p className="text-sage text-sm mb-2">Enter your email to reset your password.</p>
              <button
                type="button"
                className="text-xs text-muted-teal hover:underline hover:text-sage font-semibold w-fit"
                onClick={handleBackToSignIn}
              >
                &larr; Back to Sign In
              </button>
            </div>
          )}
          {error && <div className="text-red-600 text-sm font-semibold text-center">{error}</div>}
          {success && <div className="text-sage text-sm font-semibold text-center">{success}</div>}
          <Button
            type="submit"
            className="w-full bg-sage/80 text-muted-teal font-bold px-6 py-3 rounded-full shadow-md hover:bg-muted-teal/80 hover:text-sage transition-all duration-200 text-lg font-sans flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading && (
              <span className="w-5 h-5 border-2 border-muted-teal border-t-transparent rounded-full animate-spin inline-block"></span>
            )}
            {authMode === "sign-in" && "Sign In"}
            {authMode === "sign-up" && "Sign Up"}
            {authMode === "forgot" && "Send Reset Link"}
          </Button>
        </form>
      </div>
    </div>
  )
} 