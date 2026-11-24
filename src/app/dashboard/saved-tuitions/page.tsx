"use client";

import Link from "next/link";
import { Bookmark, Search, Sparkles } from "lucide-react";

export default function SavedTuitionsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#0D1D38] border border-[#BAE6FD] dark:border-[#0284C7]/35 text-[11px] font-mono font-bold tracking-wider text-[#D97706] dark:text-[#FFB800] uppercase mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BOOKMARKED BATCHES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1320] dark:text-white tracking-tight">
            Saved Tuitions
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
            Keep track of courses you've bookmarked to review or apply to later.
          </p>
        </div>

        <Link
          href="/#tuitions"
          className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] dark:bg-gradient-to-r dark:from-[#0284C7] dark:via-[#0EA5E9] dark:to-[#38BDF8] text-white font-bold text-xs shadow-[0_4px_16px_rgba(2, 132, 199,0.3)] dark:shadow-[0_0_20px_rgba(2, 132, 199,0.5)] dark:hover:shadow-[0_0_30px_rgba(14, 165, 233,0.8)] transition-all active:scale-95 cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Explore Tuitions</span>
        </Link>
      </div>

      {/* Empty State Card */}
      <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#0284C7]/25 bg-white dark:bg-[#0B1930]/90 p-12 md:p-16 flex flex-col items-center justify-center text-center shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl min-h-[380px]">
        {/* Bookmark Icon in amber/gold rounded square */}
        <div className="w-16 h-16 rounded-2xl bg-[#FEF3C7] dark:bg-[#281804] border border-[#FDE68A] dark:border-[#FFB800]/40 flex items-center justify-center mb-5 shadow-sm dark:shadow-[0_0_25px_rgba(255,184,0,0.3)]">
          <Bookmark className="w-8 h-8 text-[#D97706] dark:text-[#FFB800]" />
        </div>

        <h3 className="text-lg font-bold text-[#0B1320] dark:text-white">
          No saved tuitions
        </h3>
        <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] max-w-md mt-2 leading-relaxed">
          Browse and bookmark tuitions you're interested in! They will appear here for easy access.
        </p>

        <Link
          href="/#tuitions"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] dark:bg-[#0284C7] dark:hover:bg-[#0EA5E9] text-white font-bold text-xs transition-all shadow-[0_4px_16px_rgba(2, 132, 199,0.25)] dark:shadow-[0_0_20px_rgba(2, 132, 199,0.5)] dark:hover:shadow-[0_0_30px_rgba(14, 165, 233,0.8)] active:scale-95 cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Browse Tuitions</span>
        </Link>
      </div>
    </div>
  );
}