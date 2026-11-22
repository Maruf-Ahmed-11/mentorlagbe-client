"use client";

import Link from "next/link";
import { Bookmark, Search } from "lucide-react";

export default function SavedTuitionsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Saved Tuitions
          </h2>
          <p className="text-sm text-[#94A3B8] mt-1">
            Keep track of courses you've bookmarked to review or apply to later.
          </p>
        </div>

        <Link
          href="/#tuitions"
          className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-full bg-[#00C48C] hover:bg-[#00DDA0] text-[#080D1A] font-semibold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Explore Tuitions</span>
        </Link>
      </div>

      {/* Empty State Card (Matching Image 6) */}
      <div className="rounded-2xl border border-[#15233E] bg-[#0A1124] p-12 md:p-16 flex flex-col items-center justify-center text-center shadow-lg min-h-[380px]">
        {/* Bookmark Icon in amber/gold rounded square */}
        <div className="w-14 h-14 rounded-2xl bg-[#231A0F] border border-[#F59E0B]/30 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
          <Bookmark className="w-7 h-7 text-[#F59E0B]" />
        </div>

        <h3 className="text-lg font-bold text-white">
          No saved tuitions
        </h3>
        <p className="text-sm text-[#94A3B8] max-w-md mt-2 leading-relaxed">
          Browse and bookmark tuitions you're interested in! They will appear here for easy access.
        </p>

        <Link
          href="/#tuitions"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00C48C] hover:bg-[#00DDA0] text-[#080D1A] font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Browse Tuitions</span>
        </Link>
      </div>
    </div>
  );
}
