import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check for BetterAuth session cookies directly to prevent deadlocks
  const hasSession = request.cookies.getAll().some(
    (cookie) =>
      (cookie.name.includes("session_token") ||
       cookie.name.includes("session_data") ||
       cookie.name.includes("better-auth")) &&
      Boolean(cookie.value && cookie.value.trim() !== "")
  );

  // 2. Protect /dashboard and all nested routes
  const isProtectedRoute = pathname.startsWith("/dashboard");
  if (isProtectedRoute && !hasSession) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // 3. Prevent logged-in users from visiting auth pages
  const authRoutes = ["/sign-in", "/sign-up", "/login", "/register"];
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/sign-in",
    "/sign-up",
    "/login",
    "/register",
  ],
};

export default proxy;
