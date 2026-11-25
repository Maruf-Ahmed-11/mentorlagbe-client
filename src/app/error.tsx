"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F8FAFC] dark:bg-[#050B14] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="relative z-10 max-w-lg w-full rounded-3xl bg-white dark:bg-[#0B1930]/95 border border-[#E2E8F0] dark:border-[#0284C7]/35 p-8 sm:p-10 text-center shadow-[0_20px_50px_rgba(11,19,32,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.85)] space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-500/40 text-red-600 dark:text-red-400">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-500/40 text-[11px] font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
            SOMETHING WENT WRONG
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B1320] dark:text-white tracking-tight">
            Unexpected Error
          </h1>
          <p className="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
            {error?.message || "An unexpected error occurred while loading this page. Please try again."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-bold shadow-[0_4px_16px_rgba(2,132,199,0.3)] transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#F0F7FF] dark:bg-[#102547] hover:bg-[#E0F2FE] dark:hover:bg-[#132E59] text-[#0284C7] dark:text-[#38BDF8] border border-[#BAE6FD] dark:border-[#0284C7]/35 text-sm font-bold transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
