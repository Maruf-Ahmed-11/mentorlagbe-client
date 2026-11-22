"use client";

import Link from "next/link";
import { FileText, Search } from "lucide-react";

export default function ApplicationsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            My Applications
          </h2>
          <p className="text-sm text-[#94A3B8] mt-1">
            Review the status of your applications submitted to mentors.
          </p>
        </div>

        <Link
          href="/#tuitions"
          className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-full bg-[#00C48C] hover:bg-[#00DDA0] text-[#080D1A] font-semibold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Find More Tuitions</span>
        </Link>
      </div>

      {/* Empty State Card (Matching Image 5) */}
      <div className="rounded-2xl border border-[#15233E] bg-[#0A1124] p-12 md:p-16 flex flex-col items-center justify-center text-center shadow-lg min-h-[380px]">
        {/* Document Icon in rounded square */}
        <div className="w-14 h-14 rounded-2xl bg-[#0F223D] border border-[#00C48C]/30 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(0,196,140,0.15)]">
          <FileText className="w-7 h-7 text-[#00C48C]" />
        </div>

        <h3 className="text-lg font-bold text-white">
          No applications yet
        </h3>
        <p className="text-sm text-[#94A3B8] max-w-md mt-2 leading-relaxed">
          Browse tuitions to get started! Apply directly to courses matching your academic needs.
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
