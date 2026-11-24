"use client";

import Link from "next/link";
import { 
  XCircle, 
  ArrowLeft, 
  RotateCcw, 
  Sparkles, 
  ShieldAlert, 
  LayoutDashboard 
} from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto flex flex-col justify-center animate-in fade-in duration-300">
      
      <div className="rounded-3xl border border-[#E2E8F0] dark:border-[#0284C7]/30 bg-white dark:bg-[#0B1930]/95 p-6 sm:p-10 shadow-[0_16px_40px_-6px_rgba(11, 19, 32,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-center relative overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-16 bg-amber-500/10 dark:bg-amber-500/15 blur-2xl pointer-events-none" />

        {/* Cancellation Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/40 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 shadow-lg shadow-amber-500/10">
          <XCircle className="w-9 h-9" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700/40 mb-3">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>CHECKOUT CANCELLED</span>
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-[#0B1320] dark:text-white tracking-tight">
          Payment Process Cancelled
        </h1>
        
        <p className="mt-2 text-xs sm:text-sm text-[#475569] dark:text-[#E2E8F0]/80">
          No charges were made to your account. Your account remains on the Free tier.
        </p>

        {/* Free Plan Reminders */}
        <div className="mt-6 rounded-2xl bg-[#F8FAFC] dark:bg-[#0D1D38]/60 border border-[#E2E8F0] dark:border-[#0284C7]/20 p-5 text-left text-xs space-y-2.5">
          <span className="font-mono font-bold uppercase text-[10px] text-[#64748B] dark:text-[#94A3B8] block">
            Current Free Limits:
          </span>
          <p className="text-[#475569] dark:text-[#E2E8F0]/80">
            &bull; <strong>Tutors:</strong> Up to <strong>2 free tuition postings</strong>.
          </p>
          <p className="text-[#475569] dark:text-[#E2E8F0]/80">
            &bull; <strong>Students:</strong> Up to <strong>10 free tuition applications</strong>.
          </p>
          <p className="text-[#64748B] dark:text-[#94A3B8] pt-1">
            You can upgrade to Pro anytime whenever you are ready for unlimited access.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/checkout"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Checkout Again</span>
          </Link>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#E2E8F0] dark:border-[#0284C7]/30 text-xs font-bold text-[#0B1320] dark:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#102547] transition-all flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Go to Dashboard</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
