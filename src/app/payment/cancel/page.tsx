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
      
      <div className="rounded-3xl border border-[#EADCDD] dark:border-[#E11D48]/30 bg-white dark:bg-[#140204]/95 p-6 sm:p-10 shadow-[0_16px_40px_-6px_rgba(24,12,14,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-center relative overflow-hidden">
        
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

        <h1 className="text-2xl sm:text-3xl font-black text-[#180C0E] dark:text-white tracking-tight">
          Payment Process Cancelled
        </h1>
        
        <p className="mt-2 text-xs sm:text-sm text-[#5C494C] dark:text-[#F4E2E5]/80">
          No charges were made to your account. Your account remains on the Free tier.
        </p>

        {/* Free Plan Reminders */}
        <div className="mt-6 rounded-2xl bg-[#FCF9F8] dark:bg-[#200408]/60 border border-[#EADCDD] dark:border-[#E11D48]/20 p-5 text-left text-xs space-y-2.5">
          <span className="font-mono font-bold uppercase text-[10px] text-[#8C7679] dark:text-[#BFA5AA] block">
            Current Free Limits:
          </span>
          <p className="text-[#5C494C] dark:text-[#F4E2E5]/80">
            &bull; <strong>Tutors:</strong> Up to <strong>2 free tuition postings</strong>.
          </p>
          <p className="text-[#5C494C] dark:text-[#F4E2E5]/80">
            &bull; <strong>Students:</strong> Up to <strong>10 free tuition applications</strong>.
          </p>
          <p className="text-[#8C7679] dark:text-[#BFA5AA] pt-1">
            You can upgrade to Pro anytime whenever you are ready for unlimited access.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/checkout"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#D91E48] hover:bg-[#B31438] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Checkout Again</span>
          </Link>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#EADCDD] dark:border-[#E11D48]/30 text-xs font-bold text-[#180C0E] dark:text-white hover:bg-[#FCF9F8] dark:hover:bg-[#2A060C] transition-all flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Go to Dashboard</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
