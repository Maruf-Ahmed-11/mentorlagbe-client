"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Receipt, 
  Loader2, 
  AlertCircle,
  Copy,
  Check,
  ShieldCheck,
  LayoutDashboard
} from "lucide-react";

interface VerificationResult {
  success: boolean;
  message?: string;
  paymentIntentId?: string;
  sessionId?: string;
  amount?: number;
  currency?: string;
  plan?: string;
  role?: string;
  userEmail?: string;
}

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<VerificationResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function verifyPayment() {
      if (!sessionId) {
        setError("Missing Stripe session_id parameter in URL.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error || "Failed to verify payment with Stripe.");
        }

        setData({
          ...json,
          sessionId,
        });

        // Update cached user in localStorage so Pro status and badges immediately appear
        try {
          const current = JSON.parse(localStorage.getItem("mentorlagbe_cached_user") || "null") || {};
          current.plan = "pro";
          localStorage.setItem("mentorlagbe_cached_user", JSON.stringify(current));
        } catch {
          // ignore
        }

        // Immediately notify Navbar, Sidebar, and all listening components
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new CustomEvent("mentorlagbe_user_updated", { detail: { plan: "pro" } }));
        router.refresh();

        toast.success("Payment verified! Pro features unlocked.", { icon: "🎉" });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Payment verification failed";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    verifyPayment();
  }, [sessionId]);

  const copyPaymentIntent = () => {
    if (data?.paymentIntentId) {
      navigator.clipboard.writeText(data.paymentIntentId);
      setCopied(true);
      toast.success("Payment Intent ID copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-full bg-[#0284C7]/10 dark:bg-[#0EA5E9]/20 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#0284C7] dark:text-[#0EA5E9] animate-spin" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-[#0B1320] dark:text-white">
          Verifying Stripe Payment...
        </h2>
        <p className="mt-1 text-xs text-[#64748B] dark:text-[#94A3B8] max-w-sm">
          Please wait while we confirm your checkout session and activate your Pro plan.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center mb-6 text-red-600 dark:text-red-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-[#0B1320] dark:text-white">
          Verification Notice
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#475569] dark:text-[#E2E8F0]/80 max-w-md">
          {error}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-xl bg-[#0284C7] text-white text-xs font-bold shadow-md cursor-pointer hover:bg-[#0369A1] transition-all"
          >
            Retry Verification
          </button>
          <Link
            href="/dashboard"
            className="px-6 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#0284C7]/30 text-xs font-bold text-[#0B1320] dark:text-white hover:bg-[#E2E8F0]/50 transition-all"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const isTutorRole = data?.role === "tutor" || (data?.amount && data.amount >= 15);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto flex flex-col justify-center animate-in fade-in duration-300">
      
      {/* Success Card */}
      <div className="rounded-3xl border border-[#E2E8F0] dark:border-[#0284C7]/30 bg-white dark:bg-[#0B1930]/95 p-6 sm:p-10 shadow-[0_16px_40px_-6px_rgba(2, 132, 199,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-center relative overflow-hidden">
        
        {/* Glowing Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-20 bg-[#0284C7]/20 dark:bg-[#0EA5E9]/30 blur-3xl pointer-events-none" />

        {/* Celebration Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 dark:bg-[#0A2618] border border-emerald-300 dark:border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-50 dark:bg-[#0A2618] text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-600/40 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PAYMENT SUCCESSFUL &bull; PRO ACTIVE</span>
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-[#0B1320] dark:text-white tracking-tight">
          Welcome to <span className="text-[#0284C7] dark:text-[#0EA5E9]">MentorLagbe Pro</span>!
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#475569] dark:text-[#E2E8F0]/80">
          Your payment was processed successfully. You now have unlimited access and priority benefits!
        </p>

        {/* Transaction Details Box */}
        <div className="mt-8 rounded-2xl bg-[#F8FAFC] dark:bg-[#0D1D38]/70 border border-[#E2E8F0] dark:border-[#0284C7]/20 p-5 text-left text-xs space-y-3">
          
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#0284C7]/20">
            <span className="text-[#64748B] dark:text-[#94A3B8]">Plan Upgraded:</span>
            <span className="font-bold text-[#0284C7] dark:text-[#0EA5E9] uppercase font-mono">
              {isTutorRole ? "Pro Tutor ($15 / mo)" : "Pro Student ($10 / mo)"}
            </span>
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#0284C7]/20">
            <span className="text-[#64748B] dark:text-[#94A3B8]">Payment Status:</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700/50">
              PAID &bull; VERIFIED
            </span>
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#0284C7]/20">
            <span className="text-[#64748B] dark:text-[#94A3B8]">Amount Charged:</span>
            <span className="font-mono font-bold text-[#0B1320] dark:text-white">
              ${data?.amount ? data.amount.toFixed(2) : "15.00"} {data?.currency?.toUpperCase() || "USD"}
            </span>
          </div>

          {/* Payment Intent ID (Explicit User Requirement) */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 pt-1">
            <span className="text-[#64748B] dark:text-[#94A3B8] flex items-center gap-1">
              <Receipt className="w-3.5 h-3.5" />
              <span>Payment Intent ID:</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-[#0B1320] dark:text-white truncate max-w-[200px] sm:max-w-[240px]">
                {data?.paymentIntentId || "pi_mock_verified"}
              </span>
              <button
                type="button"
                onClick={copyPaymentIntent}
                title="Copy Payment Intent ID"
                className="p-1 rounded hover:bg-[#E2E8F0] dark:hover:bg-[#0284C7]/30 transition-colors text-[#64748B] dark:text-[#94A3B8]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

        </div>

        {/* Benefits reminder */}
        <div className="mt-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-4 text-xs text-left text-emerald-800 dark:text-emerald-300 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
          <div>
            <span className="font-bold block">Pro Privileges Activated:</span>
            <span>
              {isTutorRole
                ? "You can now post unlimited tuitions with 0% commission, glowing verified badge, and direct applicant matching."
                : "You can now apply to unlimited tuitions with priority applicant ranking and instant tutor alerts."}
            </span>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Go to Dashboard</span>
          </Link>

          {isTutorRole ? (
            <Link
              href="/dashboard/post-tuition"
              className="w-full sm:w-auto px-7 py-3 rounded-xl border border-[#E2E8F0] dark:border-[#0284C7]/30 text-xs font-bold text-[#0B1320] dark:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#102547] transition-all flex items-center justify-center gap-2"
            >
              <span>Post New Tuition</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href="/tuitions"
              className="w-full sm:w-auto px-7 py-3 rounded-xl border border-[#E2E8F0] dark:border-[#0284C7]/30 text-xs font-bold text-[#0B1320] dark:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#102547] transition-all flex items-center justify-center gap-2"
            >
              <span>Browse Tuitions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

      </div>

    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center">
          <Loader2 className="w-8 h-8 text-[#0284C7] animate-spin mb-3" />
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
            Loading Payment Details...
          </p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
