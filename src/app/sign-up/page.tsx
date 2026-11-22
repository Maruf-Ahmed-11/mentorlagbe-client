"use client";

import { useState, useEffect, Suspense } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Logo from "@/components/Logo";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  GraduationCap, 
  UserCheck, 
  ShieldCheck, 
  KeyRound,
  CheckCircle2,
  XCircle,
  Loader2
} from "lucide-react";

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRoleParam = searchParams.get("role") || "student";

  const [role, setRole] = useState<"student" | "tutor" | "admin">(
    initialRoleParam === "tutor" ? "tutor" : initialRoleParam === "admin" ? "admin" : "student"
  );
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [adminSecretKey, setAdminSecretKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Check if an Admin account already exists in MongoDB
  useEffect(() => {
    async function checkAdminExists() {
      try {
        const res = await fetch("/api/auth/admin-exists");
        const data = await res.json();
        if (data.hasAdmin) {
          setHasAdmin(true);
          // If an admin already exists, force role to student if admin was selected
          setRole((prev) => (prev === "admin" ? "student" : prev));
        } else {
          setHasAdmin(false);
        }
      } catch {
        setHasAdmin(false);
      }
    }
    checkAdminExists();
  }, []);

  // Password validation checks (Matching BookNook standard)
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase;

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!isPasswordValid) {
      toast.error("Password must be at least 6 characters with uppercase & lowercase letters");
      return;
    }

    // Admin security key verification
    if (role === "admin") {
      if (hasAdmin) {
        toast.error("An administrator account already exists. Only one admin is allowed.");
        setRole("student");
        return;
      }
      const validAdminKey = "MENTOR_ADMIN_2026";
      if (adminSecretKey.trim() !== validAdminKey) {
        toast.error("Invalid Admin Secret Key. Use 'MENTOR_ADMIN_2026' for first-time setup.");
        return;
      }
    }

    setLoading(true);

    try {
      await authClient.signUp.email(
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          role,
          plan: "free",
        },
        {
          onSuccess: () => {
            toast.success(
              role === "admin"
                ? "Administrator account created successfully!"
                : `Account created successfully as ${role.toUpperCase()}!`
            );
            router.push("/");
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Failed to create account. Please try again.");
            setLoading(false);
          },
        }
      );
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to create account";
      toast.error(errorMsg);
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to initiate Google sign-up";
      toast.error(errorMsg);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#0A0203] p-4 md:p-8 relative overflow-hidden">
      
      {/* Ambient Crimson Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.22)_0%,_transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-[#880816]/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Auth Container (BookNook Cinematic 2-Column Style) */}
      <div className="flex w-full max-w-[1100px] overflow-hidden rounded-3xl bg-[#140205]/95 border-2 border-[#E11D48]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9),_inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl relative z-10">
        
        {/* Left Side: Moody Cinematic Artwork & Community Quote */}
        <div className="hidden md:flex w-1/2 relative flex-col justify-between p-10 overflow-hidden bg-[#1E0307]">
          {/* Background Image with Dark Vignette (Academic Mentorship & University Study) */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1600&auto=format&fit=crop')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140205] via-[#140205]/65 to-[#140205]/40" />

          {/* Top Badge */}
          <div className="relative z-10">
            <Logo />
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1C0307]/80 border border-[#FF1E40]/50 px-3 py-1 shadow-[0_0_15px_rgba(255,30,64,0.4)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF1E40] animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white">
                02 // JOIN THE COMMUNITY
              </span>
            </div>
          </div>

          {/* Bottom Message */}
          <div className="relative z-10 space-y-3">
            <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-white leading-tight">
              Unlock Your Potential, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF4D6D] to-[#FF1E40]">
                One Lesson at a Time
              </span>
            </h2>
            <p className="text-xs text-[#F4E2E5]/80 leading-relaxed font-sans max-w-sm">
              Create your account to start applying for top-tier tuitions or share your subject expertise with ambitious students nationwide.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#BFA5AA]">
              <span>✓ Instant Free Account</span>
              <span>✓ Zero Commission</span>
            </div>
          </div>
        </div>

        {/* Right Side: Registration Form Card */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-[#140205]/95">
          
          <div className="text-center md:text-left mb-6">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#FF1E40] block mb-1">
              REGISTRATION
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Create your account
            </h1>
            <p className="mt-1 text-xs text-[#F4E2E5]/75">
              Join thousands of learners and educators across Bangladesh
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSignUp} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="text-xs font-medium text-[#F4E2E5] mb-1.5 block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#FF1E40]" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Hasan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl bg-[#1C0307] border border-[#E11D48]/40 pl-10 pr-4 py-3 text-sm text-white placeholder-[#BFA5AA]/60 outline-none focus:border-[#FF1E40] focus:ring-1 focus:ring-[#FF1E40] transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="text-xs font-medium text-[#F4E2E5] mb-1.5 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#FF1E40]" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-[#1C0307] border border-[#E11D48]/40 pl-10 pr-4 py-3 text-sm text-white placeholder-[#BFA5AA]/60 outline-none focus:border-[#FF1E40] focus:ring-1 focus:ring-[#FF1E40] transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Password Field with Eye Toggle */}
            <div>
              <label className="text-xs font-medium text-[#F4E2E5] mb-1.5 block">
                Password (min. 6 characters)
              </label>
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

              {/* Password Criteria Checklist */}
              {password.length > 0 && (
                <div className="mt-2 grid grid-cols-3 gap-1 text-[10px] font-mono">
                  <span className={`flex items-center gap-1 ${hasMinLength ? "text-green-400" : "text-[#BFA5AA]"}`}>
                    {hasMinLength ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                    6+ Chars
                  </span>
                  <span className={`flex items-center gap-1 ${hasUppercase ? "text-green-400" : "text-[#BFA5AA]"}`}>
                    {hasUppercase ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                    1 Uppercase
                  </span>
                  <span className={`flex items-center gap-1 ${hasLowercase ? "text-green-400" : "text-[#BFA5AA]"}`}>
                    {hasLowercase ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                    1 Lowercase
                  </span>
                </div>
              )}
            </div>

            {/* Role Selection: Student vs. Tutor vs. Admin */}
            <div>
              <label className="text-xs font-medium text-[#F4E2E5] mb-2 block">
                I want to join as:
              </label>
              <div className="grid grid-cols-2 gap-3">
                
                {/* Student Option */}
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    role === "student"
                      ? "bg-[#2A060C] border-[#FF1E40] shadow-[0_0_15px_rgba(255,30,64,0.4)]"
                      : "bg-[#1C0307] border-[#E11D48]/30 hover:border-[#FF1E40]/60"
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                      role === "student"
                        ? "border-[#FF1E40] bg-[#FF1E40]"
                        : "border-[#BFA5AA]"
                    }`}
                  >
                    {role === "student" && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white flex items-center gap-1.5">
                      <UserCheck className="h-3.5 w-3.5 text-[#FF1E40]" />
                      <span>Student / Learner</span>
                    </p>
                    <p className="text-[10px] text-[#BFA5AA]">Find tutors &amp; batches</p>
                  </div>
                </button>

                {/* Tutor Option */}
                <button
                  type="button"
                  onClick={() => setRole("tutor")}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    role === "tutor"
                      ? "bg-[#2A060C] border-[#FF1E40] shadow-[0_0_15px_rgba(255,30,64,0.4)]"
                      : "bg-[#1C0307] border-[#E11D48]/30 hover:border-[#FF1E40]/60"
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                      role === "tutor"
                        ? "border-[#FF1E40] bg-[#FF1E40]"
                        : "border-[#BFA5AA]"
                    }`}
                  >
                    {role === "tutor" && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5 text-[#FF1E40]" />
                      <span>Tutor / Mentor</span>
                    </p>
                    <p className="text-[10px] text-[#BFA5AA]">Post &amp; teach batches</p>
                  </div>
                </button>
              </div>

              {/* First-time Admin Signup Accordion / Toggle (ONLY VISIBLE BEFORE FIRST ADMIN REGISTERS) */}
              {hasAdmin === false && (
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => setRole(role === "admin" ? "student" : "admin")}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                      role === "admin"
                        ? "bg-[#35070E] border-[#FF1E40] text-white shadow-[0_0_15px_rgba(255,30,64,0.4)]"
                        : "bg-[#180306] border-[#E11D48]/25 text-[#BFA5AA] hover:text-white hover:border-[#FF1E40]/50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-[#FF1E40]" />
                      <span>First-Time Setup: Sign Up as Administrator</span>
                    </span>
                    <span className="text-[10px] font-bold text-[#FF1E40]">
                      {role === "admin" ? "ACTIVE" : "SELECT"}
                    </span>
                  </button>

                  {/* Admin Secret Key Input Field */}
                  {role === "admin" && (
                    <div className="mt-2.5 p-3 rounded-xl bg-[#200408] border border-[#FF1E40]/50 space-y-2 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-mono text-[#F4E2E5] font-bold">
                          Admin Secret Security Key:
                        </label>
                        <span className="text-[10px] font-mono text-[#FF1E40]">
                          Default: MENTOR_ADMIN_2026
                        </span>
                      </div>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#FF1E40]" />
                        <input
                          type="password"
                          placeholder="Enter MENTOR_ADMIN_2026"
                          value={adminSecretKey}
                          onChange={(e) => setAdminSecretKey(e.target.value)}
                          className="w-full rounded-lg bg-[#140205] border border-[#E11D48]/40 pl-9 pr-3 py-2 text-xs text-white placeholder-[#BFA5AA]/60 outline-none focus:border-[#FF1E40]"
                        />
                      </div>
                      <p className="text-[10px] text-[#BFA5AA] leading-normal font-sans">
                        Grants full control over the website (approving tuitions, user management, and revenue analytics).
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Create Account Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#E11D48] hover:bg-[#FF1E40] text-white text-sm font-bold tracking-wide shadow-[0_0_25px_rgba(255,30,64,0.6)] hover:shadow-[0_0_35px_rgba(255,30,64,0.9)] transition-all cursor-pointer active:scale-95 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account as {role.toUpperCase()}</span>
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

          {/* Google Sign Up Button */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
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
            <span>Sign up with Google</span>
          </button>

          {/* Footer Already Registered Link */}
          <div className="mt-6 text-center text-xs text-[#F4E2E5]/75">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-[#FF1E40] font-bold hover:underline"
            >
              Sign In
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0203] flex items-center justify-center text-white font-mono text-sm">Loading registration portal...</div>}>
      <SignUpContent />
    </Suspense>
  );
}

