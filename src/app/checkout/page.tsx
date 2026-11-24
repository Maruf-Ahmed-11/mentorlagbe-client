"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Loader2, 
  CreditCard,
  Zap,
  ArrowLeft,
  AlertCircle
} from "lucide-react";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryPlan = searchParams.get("plan")?.toLowerCase();
  
  const { data: session } = authClient.useSession();
  const [cachedUser, setCachedUser] = useState<any>(null);
  const [livePlan, setLivePlan] = useState<string>("free");
  const [userRole, setUserRole] = useState<string>("student");
  const [selectedPlan, setSelectedPlan] = useState<"tutor" | "student">("student");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    let initialRole = "student";
    let initialPlan = "free";

    try {
      const saved = localStorage.getItem("mentorlagbe_cached_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        setCachedUser(parsed);
        if (parsed.plan) initialPlan = parsed.plan.toLowerCase();
        if (parsed.role) initialRole = parsed.role.toLowerCase();
      }
    } catch {}

    const email = session?.user?.email || cachedUser?.email || "";
    const sessionRole = ((session?.user as any)?.role || "").toLowerCase();
    const finalRole = sessionRole || initialRole || (email.includes("tutor") || email.includes("teacher") ? "tutor" : "student");
    setUserRole(finalRole);

    // Strict role locking: Students can only buy student plan; Tutors can only buy tutor plan
    if (finalRole === "tutor") {
      setSelectedPlan("tutor");
    } else if (finalRole === "student") {
      setSelectedPlan("student");
    } else {
      // If admin, respect query param
      setSelectedPlan(queryPlan === "tutor" ? "tutor" : "student");
    }

    if (!email) return;

    // Fetch real-time plan status directly from database
    fetch(`/api/user/usage?email=${encodeURIComponent(email)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.plan) {
          setLivePlan(data.plan.toLowerCase());
          try {
            const current = JSON.parse(localStorage.getItem("mentorlagbe_cached_user") || "null") || {};
            current.plan = data.plan;
            localStorage.setItem("mentorlagbe_cached_user", JSON.stringify(current));
          } catch {}
        }
        if (data?.role) {
          const r = data.role.toLowerCase();
          setUserRole(r);
          if (r === "tutor") setSelectedPlan("tutor");
          else if (r === "student") setSelectedPlan("student");
        }
      })
      .catch(() => {});
  }, [session?.user]);

  const isAlreadyPro = livePlan === "pro" || 
                       ((session?.user as any)?.plan || "").toLowerCase() === "pro" || 
                       (cachedUser?.plan || "").toLowerCase() === "pro";

  const isTutor = selectedPlan === "tutor";
  const planPrice = isTutor ? "$15" : "$10";
  const planPeriod = "/ month";
  const planTitle = isTutor ? "Pro Tutor Membership" : "Pro Student Membership";

  const isStudentUser = userRole === "student";
  const isTutorUser = userRole === "tutor";

  const handleCheckout = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isAlreadyPro) {
      toast.error("You are already subscribed to Pro! Duplicate checkout is disabled.", { icon: "💎" });
      return;
    }
    setIsLoading(true);

    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selectedPlan }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to initialize Stripe checkout session.");
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned from Stripe.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error initializing checkout";
      toast.error(msg);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col justify-center animate-in fade-in duration-300">
      
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] dark:text-[#94A3B8] hover:text-[#0284C7] dark:hover:text-[#0EA5E9] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#0EA5E9] border border-[#BAE6FD] dark:border-[#0284C7]/30 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>STRIPE SECURE CHECKOUT</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0B1320] dark:text-white tracking-tight">
          Upgrade to <span className="text-[#0284C7] dark:text-[#0EA5E9]">MentorLagbe Pro</span>
        </h1>
        <p className="mt-2 text-sm text-[#475569] dark:text-[#E2E8F0]/80">
          Unlock unlimited tuition postings, priority booking, and standout verified credentials.
        </p>

        {/* Plan Switcher - Role Locked */}
        <div className="mt-6 inline-flex p-1 rounded-2xl bg-[#E2E8F0]/60 dark:bg-[#0D1D38] border border-[#E2E8F0] dark:border-[#0284C7]/30">
          <button
            type="button"
            disabled={isStudentUser}
            onClick={() => !isStudentUser && setSelectedPlan("tutor")}
            title={isStudentUser ? "Your logged-in account is a Student. Tutor plan is disabled." : undefined}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
              selectedPlan === "tutor"
                ? "bg-[#0284C7] text-white shadow-md cursor-default"
                : isStudentUser
                ? "text-[#64748B]/40 dark:text-[#94A3B8]/30 cursor-not-allowed opacity-60"
                : "text-[#475569] dark:text-[#94A3B8] hover:text-[#0B1320] dark:hover:text-white cursor-pointer"
            }`}
          >
            <span>Tutor Pro ($15)</span>
            {isStudentUser && <span className="text-[10px] ml-1.5 font-mono text-[#0284C7] dark:text-[#38BDF8]">(Tutors Only)</span>}
          </button>

          <button
            type="button"
            disabled={isTutorUser}
            onClick={() => !isTutorUser && setSelectedPlan("student")}
            title={isTutorUser ? "Your logged-in account is a Tutor. Student plan is disabled." : undefined}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
              selectedPlan === "student"
                ? "bg-[#0284C7] text-white shadow-md cursor-default"
                : isTutorUser
                ? "text-[#64748B]/40 dark:text-[#94A3B8]/30 cursor-not-allowed opacity-60"
                : "text-[#475569] dark:text-[#94A3B8] hover:text-[#0B1320] dark:hover:text-white cursor-pointer"
            }`}
          >
            <span>Student Pro ($10)</span>
            {isTutorUser && <span className="text-[10px] ml-1.5 font-mono text-[#0284C7] dark:text-[#38BDF8]">(Students Only)</span>}
          </button>
        </div>
      </div>

      {/* Pricing / Checkout Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Plan Benefits */}
        <div className="lg:col-span-7 rounded-3xl border border-[#E2E8F0] dark:border-[#0284C7]/25 bg-white dark:bg-[#0B1930]/90 p-6 sm:p-8 shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] dark:border-[#0284C7]/20">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#0284C7] dark:text-[#0EA5E9] uppercase">
                YOUR ACCOUNT PLAN
              </span>
              <h2 className="text-xl font-bold text-[#0B1320] dark:text-white mt-0.5">
                {planTitle}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black font-mono text-[#0284C7] dark:text-[#0EA5E9]">
                {planPrice}
              </span>
              <span className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
                {planPeriod}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] mb-4">
              Everything Included in {selectedPlan.toUpperCase()} PRO:
            </h3>

            <ul className="space-y-3.5 text-xs sm:text-sm text-[#0B1320] dark:text-white">
              {isTutor ? (
                <>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#0284C7] dark:text-[#0EA5E9] shrink-0 mt-0.5" />
                    <span><strong>Unlimited Tuition Posts</strong> (Free tier capped at 2 posts)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#0284C7] dark:text-[#0EA5E9] shrink-0 mt-0.5" />
                    <span><strong>Glowing Pro Verified Badge</strong> on profile and listing cards</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#0284C7] dark:text-[#0EA5E9] shrink-0 mt-0.5" />
                    <span>Top priority search placement &amp; direct student inquiry inbox</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#0284C7] dark:text-[#0EA5E9] shrink-0 mt-0.5" />
                    <span>0% platform commission on all tuition payments</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#0284C7] dark:text-[#0EA5E9] shrink-0 mt-0.5" />
                    <span><strong>Unlimited Tuition Applications</strong> (Free tier capped at 10 applications)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#0284C7] dark:text-[#0EA5E9] shrink-0 mt-0.5" />
                    <span><strong>Priority Applicant Spotlight</strong> directly at top of tutor applicant inboxes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#0284C7] dark:text-[#0EA5E9] shrink-0 mt-0.5" />
                    <span>Instant application alerts and verified student badge</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#0284C7] dark:text-[#0EA5E9] shrink-0 mt-0.5" />
                    <span>Unlimited bookmarks and tuition alerts</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E2E8F0] dark:border-[#0284C7]/20 flex items-center justify-between text-xs text-[#64748B] dark:text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Cancel or manage subscription anytime</span>
            </span>
            <span className="font-mono">Stripe Checkout v3</span>
          </div>
        </div>

        {/* Right Column: Checkout Summary & Trigger */}
        <div className="lg:col-span-5 rounded-3xl border border-[#E2E8F0] dark:border-[#0284C7]/25 bg-white dark:bg-[#0B1930]/90 p-6 sm:p-8 shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#0B1320] dark:text-white">
              Order Summary
            </h3>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
              Instant activation linked to your authenticated account.
            </p>

            {/* Already Pro Banner */}
            {isAlreadyPro && (
              <div className="mt-4 p-4 rounded-2xl bg-emerald-50 dark:bg-[#0A2618] border border-emerald-300 dark:border-[#10B981]/40 text-xs text-emerald-800 dark:text-[#10B981] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Active Pro Membership Detected</span>
                  <span>You are already subscribed to Pro! Duplicate checkout is disabled so you are not charged twice.</span>
                </div>
              </div>
            )}

            <div className="mt-6 space-y-3 pb-6 border-b border-[#E2E8F0] dark:border-[#0284C7]/20 text-xs sm:text-sm">
              <div className="flex justify-between text-[#475569] dark:text-[#E2E8F0]/80">
                <span>Account Email:</span>
                <span className="font-mono font-medium text-[#0B1320] dark:text-white truncate max-w-[180px]">
                  {session?.user?.email || cachedUser?.email || "Signed-in user"}
                </span>
              </div>
              <div className="flex justify-between text-[#475569] dark:text-[#E2E8F0]/80">
                <span>Account Role:</span>
                <span className="font-medium text-[#0B1320] dark:text-white uppercase font-mono">
                  {userRole}
                </span>
              </div>
              <div className="flex justify-between text-[#475569] dark:text-[#E2E8F0]/80">
                <span>Selected Plan:</span>
                <span className="font-medium text-[#0284C7] dark:text-[#0EA5E9] font-bold">
                  {planTitle}
                </span>
              </div>
              <div className="flex justify-between text-[#475569] dark:text-[#E2E8F0]/80">
                <span>Billing Period:</span>
                <span className="font-medium text-[#0B1320] dark:text-white">Monthly Subscription</span>
              </div>
            </div>

            <div className="mt-6 flex items-baseline justify-between">
              <span className="text-sm font-bold text-[#0B1320] dark:text-white">
                Total Due Today:
              </span>
              <div className="text-right">
                <span className="text-2xl font-black font-mono text-[#0284C7] dark:text-[#0EA5E9]">
                  {planPrice}.00
                </span>
                <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8] block">
                  USD (Billed via Stripe)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {isAlreadyPro ? (
              <div className="space-y-3">
                <button
                  type="button"
                  disabled
                  className="w-full py-4 rounded-2xl bg-emerald-100 dark:bg-[#0A2618] text-emerald-800 dark:text-[#10B981] border border-emerald-300 dark:border-[#10B981]/50 font-bold text-sm cursor-not-allowed opacity-80 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Already Pro Member &bull; Checkout Disabled</span>
                </button>
                <Link
                  href="/dashboard"
                  className="w-full py-3.5 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Return to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => handleCheckout()}
                disabled={isLoading}
                className="w-full py-4 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] dark:bg-gradient-to-r dark:from-[#0284C7] dark:via-[#0EA5E9] dark:to-[#38BDF8] text-white font-bold text-sm shadow-[0_8px_25px_rgba(2, 132, 199,0.4)] hover:shadow-[0_10px_30px_rgba(2, 132, 199,0.55)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-75"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Redirecting to Stripe...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Proceed to Stripe Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#64748B] dark:text-[#94A3B8]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>256-Bit SSL Encrypted by Stripe</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
          <Loader2 className="w-8 h-8 text-[#0284C7] animate-spin mb-3" />
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
            Loading Checkout...
          </p>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
