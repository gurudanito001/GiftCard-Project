/* import { NextRequest, NextResponse } from "next/server";



export async function middleware(req: NextRequest) {
  const role = req.headers.get("authorization");
  const { pathname } = req.nextUrl;

  if (isUserRoute(pathname) && !includes(["user", "admin"], role)) {
    return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
  }

  if (isAdminRoute(pathname) && role !== "admin") {
    return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
  }

  return NextResponse.next();
} */