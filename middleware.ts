import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if user is authenticated via cookies
  const isAuthenticated = request.cookies.has("user")

  // Protected routes
  const protectedPaths = ["/profile", "/checkout"]
  const isProtectedRoute = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  // Redirect to login if accessing protected route while not authenticated
  if (isProtectedRoute && !isAuthenticated) {
    const redirectUrl = new URL("/login", request.url)
    redirectUrl.searchParams.set("from", request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Always redirect to home if accessing login while authenticated
  if (request.nextUrl.pathname === "/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/profile/:path*", "/checkout/:path*", "/login"],
}

