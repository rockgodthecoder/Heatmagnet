import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  console.log('🚨 MIDDLEWARE RUNNING FOR:', req.nextUrl.pathname)
  
  // TEMPORARILY DISABLED - Using client-side auth checks instead
  return NextResponse.next()
  
  /*
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => req.cookies.set(name, value))
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    }
  )

  try {
    const {
      data: { user },
      error
    } = await supabase.auth.getUser()

    if (error) {
      console.log('❌ Auth error in middleware:', error.message)
    }

    console.log('📊 User status:', !!user)
    console.log('👤 User ID:', user?.id || 'none')
    console.log('📧 User email:', user?.email || 'none')
    console.log('📍 Path:', req.nextUrl.pathname)

    // If no user and trying to access protected routes, redirect to auth
    if (!user && !req.nextUrl.pathname.startsWith('/auth')) {
      console.log('🚫 No user, redirecting to /auth')
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/auth'
      return NextResponse.redirect(redirectUrl)
    }

    // If user exists and trying to access auth page, redirect to home
    if (user && req.nextUrl.pathname.startsWith('/auth')) {
      console.log('✅ User exists, redirecting to /')
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/'
      return NextResponse.redirect(redirectUrl)
    }

    console.log('✅ Middleware passed through')
    return response
  } catch (error) {
    console.log('❌ Middleware error:', error)
    return response
  }
  */
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 