"use client";

import { useState, useEffect, Suspense } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Logo from "@/components/Logo";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  GraduationCap, 
  UserCheck, 
  ShieldCheck, 
  Loader2
} from "lucide-react";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") || "student";

  const [selectedRole, setSelectedRole] = useState<"student" | "tutor" | "admin">(
    initialRole === "tutor" ? "tutor" : initialRole === "admin" ? "admin" : "student"
  );
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    async function checkAdminExists() {
      try {
        const res = await fetch("/api/auth/admin-exists");
        const data = await res.json();
        setHasAdmin(Boolean(data.hasAdmin));
      } catch {
        setHasAdmin(false);
      }
    }
    checkAdminExists();
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      await authClient.signIn.email(
        { email, password },
        {
          onSuccess: () => {
            toast.success(`Welcome back! Signed in as ${selectedRole.toUpperCase()}`);
            
            // Redirect based on role or to dashboard
            if (selectedRole === "admin") {
              router.push("/dashboard/admin");
            } else if (selectedRole === "tutor") {
              router.push("/dashboard/tutor");
            } else {
              router.push("/dashboard/student");
            }
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Invalid credentials. Please try again.");
            setLoading(false);
          },
        }
      );
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to sign in";
      toast.error(errorMsg);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to initiate Google sign-in";
      toast.error(errorMsg);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#0A0203] p-4 md:p-8 relative overflow-hidden">
      
      {/* Ambient Crimson Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.22)_0%,_transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-[#880816]/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Auth Container (BookNook Cinematic 2-Column Style) */}
      <div className="flex w-full max-w-[1050px] overflow-hidden rounded-3xl bg-[#140205]/95 border-2 border-[#E11D48]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9),_inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl relative z-10">
        
        {/* Left Side: Moody Cinematic Artwork & Community Quote */}
        <div className="hidden md:flex w-1/2 relative flex-col justify-between p-10 overflow-hidden bg-[#1E0307]">
          {/* Background Image with Dark Vignette */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140205] via-[#140205]/65 to-[#140205]/40" />

          {/* Top Badge */}
          <div className="relative z-10">
            <Logo />
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1C0307]/80 border border-[#FF1E40]/50 px-3 py-1 shadow-[0_0_15px_rgba(255,30,64,0.4)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF1E40] animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white">
                01 // ACADEMIC PORTAL
              </span>
            </div>
          </div>

          {/* Bottom Message */}
          <div className="relative z-10 space-y-3">
            <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-white leading-tight">
              Empowering Minds, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF4D6D] to-[#FF1E40]">
                Elevating Futures
              </span>
            </h2>
            <p className="text-xs text-[#F4E2E5]/80 leading-relaxed font-sans max-w-sm">
              Sign in to manage your tuition batches, student applications, and verified mentorship records across Bangladesh.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#BFA5AA]">
              <span>✓ 100% Verified Tutors</span>
              <span>✓ 0% Commission</span>
            </div>
          </div>
        </div>

        {/* Right Side: Authentication Form Card */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-[#140205]/95">
          
          <div className="text-center md:text-left mb-6">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#FF1E40] block mb-1">
              AUTHENTICATION
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Welcome Back
            </h1>
            <p className="mt-1 text-xs text-[#F4E2E5]/75">
              Enter your credentials to access your tuition dashboard
            </p>
          </div>

          {/* 3-Role Login Selector (Student vs. Tutor vs. Admin) */}
          <div className="mb-6">
            <label className="text-[11px] font-mono uppercase tracking-wider text-[#BFA5AA] block mb-2 font-bold">
              Sign In As:
            </label>
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[#1F0307] border border-[#E11D48]/35">
              <button
                type="button"
                onClick={() => setSelectedRole("student")}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedRole === "student"
                    ? "bg-[#E11D48] text-white shadow-[0_0_15px_rgba(225,29,72,0.7)]"
                    : "text-[#BFA5AA] hover:text-white"
                }`}
              >
                <UserCheck className="h-3.5 w-3.5" />
                <span>Student</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole("tutor")}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedRole === "tutor"
                    ? "bg-[#E11D48] text-white shadow-[0_0_15px_rgba(225,29,72,0.7)]"
                    : "text-[#BFA5AA] hover:text-white"
                }`}
              >
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Tutor</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole("admin")}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedRole === "admin"
                    ? "bg-[#E11D48] text-white shadow-[0_0_15px_rgba(225,29,72,0.7)]"
                    : "text-[#BFA5AA] hover:text-white"
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="text-xs font-medium text-[#F4E2E5] mb-1.5 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#FF1E40]" />
                <input
                  type="email"
                  required
                  placeholder={
                    selectedRole === "admin"
                      ? "admin@mentorlagbe.com"
                      : selectedRole === "tutor"
                      ? "tutor@example.com"
                      : "student@example.com"
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-[#1C0307] border border-[#E11D48]/40 pl-10 pr-4 py-3 text-sm text-white placeholder-[#BFA5AA]/60 outline-none focus:border-[#FF1E40] focus:ring-1 focus:ring-[#FF1E40] transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Password Field with Eye Toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-[#F4E2E5]">
                  Password
                </label>
                <Link
                  href="/sign-in"
                  onClick={() => toast("Contact support to reset password", { icon: "ℹ️" })}
                  className="text-[11px] text-[#FF1E40] hover:underline font-mono"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#FF1E40]" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-[#1C0307] border border-[#E11D48]/40 pl-10 pr-10 py-3 text-sm text-white placeholder-[#BFA5AA]/60 outline-none focus:border-[#FF1E40] focus:ring-1 focus:ring-[#FF1E40] transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#BFA5AA] hover:text-white transition-colors cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#E11D48] hover:bg-[#FF1E40] text-white text-sm font-bold tracking-wide shadow-[0_0_25px_rgba(255,30,64,0.6)] hover:shadow-[0_0_35px_rgba(255,30,64,0.9)] transition-all cursor-pointer active:scale-95 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In as {selectedRole.toUpperCase()}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#E11D48]/25" />
            <span className="text-[10px] font-mono uppercase text-[#BFA5AA] tracking-wider">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-[#E11D48]/25" />
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-[#1E0408] border border-[#E11D48]/40 hover:border-white hover:bg-[#2A060C] text-white text-sm font-semibold transition-all cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(225,29,72,0.3)] disabled:opacity-60"
          >
            {googleLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>Sign in with Google</span>
          </button>

          {/* Footer Registration Link */}
          <div className="mt-6 text-center text-xs text-[#F4E2E5]/75">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-[#FF1E40] font-bold hover:underline"
            >
              Sign Up
            </Link>
          </div>

          {/* Admin Setup Helper Link (Only visible before first admin registers) */}
          {hasAdmin === false && (
            <div className="mt-3 text-center text-[11px] text-[#BFA5AA]">
              First-time Administrator?{" "}
              <Link
                href="/sign-up?role=admin"
                className="text-white hover:text-[#FF1E40] underline font-mono"
              >
                Sign Up as Admin
              </Link>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0203] flex items-center justify-center text-white font-mono text-sm">Loading sign-in portal...</div>}>
      <SignInContent />
    </Suspense>
  );
}

