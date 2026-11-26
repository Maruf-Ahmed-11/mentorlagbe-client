import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check only the actual BetterAuth session token cookie (never auxiliary state/pkce cookies)
  const hasSession = request.cookies.getAll().some(
    (cookie) =>
      (cookie.name === "better-auth.session_token" ||
        cookie.name === "__Secure-better-auth.session_token" ||
        cookie.name.endsWith(".session_token")) &&
      Boolean(cookie.value && cookie.value.trim() !== "")
  );

  // Protect /dashboard and all nested routes
  const isProtectedRoute = pathname.startsWith("/dashboard");
  if (isProtectedRoute && !hasSession) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};

export default proxy;
