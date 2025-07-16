"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [sessionChecked, setSessionChecked] = useState(false)
  const [hasSession, setHasSession] = useState(false)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setHasSession(!!data.session)
      setSessionChecked(true)
    })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }
    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setSuccess("Password reset! You can now sign in with your new password.")
    } catch (err: any) {
      setError(err.message || "Password reset failed.")
    } finally {
      setLoading(false)
    }
  }

  if (!sessionChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sage via-eucalyptus to-muted-teal font-sans">
        <div className="text-sage text-lg font-semibold">Checking session...</div>
      </div>
    )
  }

  if (!hasSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sage via-eucalyptus to-muted-teal font-sans">
        <div className="w-full max-w-md mx-auto p-8 bg-sage/60 backdrop-blur-lg border border-sage/60 shadow-2xl rounded-3xl flex flex-col gap-8 items-center">
          <h1 className="text-2xl font-bold text-sage mb-2">Reset Link Expired or Invalid</h1>
          <p className="text-muted-teal text-center mb-4">Your password reset link is invalid or has expired. Please request a new reset link from the <a href="/auth" className="underline text-sage">login page</a>.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sage via-eucalyptus to-muted-teal font-sans">
      <div className="w-full max-w-md mx-auto p-8 bg-sage/60 backdrop-blur-lg border border-sage/60 shadow-2xl rounded-3xl flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-extrabold text-sage mb-1">Reset Your Password</h1>
          <p className="text-muted-teal text-sm">Enter your new password below.</p>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold text-sage">New Password</label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              className="bg-eucalyptus/40 border border-sage/40 focus:border-sage focus:ring-2 focus:ring-sage/30 rounded-xl text-muted-teal placeholder:text-sage"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="font-semibold text-sage">Confirm Password</label>
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              className="bg-eucalyptus/40 border border-sage/40 focus:border-sage focus:ring-2 focus:ring-sage/30 rounded-xl text-muted-teal placeholder:text-sage"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-600 text-sm font-semibold text-center">{error}</div>}
          {success && <div className="text-sage text-sm font-semibold text-center">{success} <a href="/auth" className="underline text-muted-teal ml-2">Sign In</a></div>}
          <Button
            type="submit"
            className="w-full bg-sage/80 text-muted-teal font-bold px-6 py-3 rounded-full shadow-md hover:bg-muted-teal/80 hover:text-sage transition-all duration-200 text-lg font-sans flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading && (
              <span className="w-5 h-5 border-2 border-muted-teal border-t-transparent rounded-full animate-spin inline-block"></span>
            )}
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  )
} 