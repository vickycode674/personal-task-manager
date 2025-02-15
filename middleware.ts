import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🚀 Allow access to API routes & public pages
  if (
    pathname.startsWith("/api") ||
    pathname === "/frontend/signup" ||
    pathname === "/frontend/login" ||
    pathname === "/frontend/dashboard" ||
    pathname.startsWith("/frontend/projects")
  ) {
    return NextResponse.next();
  }

  // ✅ Prevent redirect on refresh if user has token
  const token = req.cookies.get("next-auth.session-token") || req.cookies.get("__Secure-next-auth.session-token");

  if (token) {
    return NextResponse.next();
  }

  // 🚨 Redirect unauthorized users to the dashboard login page
  return NextResponse.redirect(new URL("/frontend/dashboard", req.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // ✅ Matches all pages except static files
};
