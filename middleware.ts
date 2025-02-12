import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🚀 Allow access to API routes & signup page
  if (pathname.startsWith("/api") || pathname === "/frontend/signup" || pathname === "/frontend/login" || pathname === "/frontend/dashboard") {
    return  NextResponse.next();
  }
  if(pathname.startsWith("/frontend/projects")){
    return  NextResponse.next();
  }


  return withAuth(req, {
    pages: {
      signIn: "/frontend/dashboard",
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Adjust as needed
};
