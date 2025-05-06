import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("jwt")?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  if (!isAuthPage && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}
