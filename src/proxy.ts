import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // All routes that only authenticated users should see
    const protectedRoutes = ["/dashboard"];
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

    // Check for the BetterAuth session cookie directly instead of fetching the API
    // This matches booknook-client pattern and prevents dev server deadlocks on server requests
    const hasSession = request.cookies.getAll().some(
        (cookie) =>
            (cookie.name.includes("session_token") ||
             cookie.name.includes("session_data") ||
             cookie.name.includes("better-auth")) &&
            Boolean(cookie.value && cookie.value.trim() !== "")
    );

    // If unauthenticated user tries to access any protected route, redirect to /sign-in
    if (isProtectedRoute && !hasSession) {
        const signInUrl = new URL("/sign-in", request.url);
        return NextResponse.redirect(signInUrl);
    }

    // If authenticated user visits auth pages, redirect directly to /dashboard
    const authRoutes = ["/sign-in", "/sign-up", "/login", "/register"];
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
    if (isAuthRoute && hasSession) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export default proxy;

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
