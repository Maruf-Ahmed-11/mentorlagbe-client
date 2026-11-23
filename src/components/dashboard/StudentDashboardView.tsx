"use client";

import Link from "next/link";
import { 
  FileText, 
  Bookmark, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Crown, 
  Zap, 
  ChevronRight 
} from "lucide-react";
import { DashboardViewProps } from "./types";

export default function StudentDashboardView({ userName }: DashboardViewProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#180C0E] dark:text-white tracking-tight flex items-center gap-2">
            <span>Welcome back, {userName}!</span>
            <span>👋</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#5C494C] dark:text-[#BFA5AA] mt-1">
            Track your applied tuition applications, reviews, and learning journey.
          </p>
        </div>

        <Link
          href="/#tuitions"
          className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#D91E48] hover:bg-[#B31438] dark:bg-gradient-to-r dark:from-[#E11D48] dark:via-[#FF1E40] dark:to-[#FF4D6D] text-white font-bold text-xs shadow-[0_4px_16px_rgba(217,30,72,0.3)] dark:shadow-[0_0_20px_rgba(225,29,72,0.5)] dark:hover:shadow-[0_0_30px_rgba(255,30,64,0.8)] transition-all active:scale-95 cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Browse Tuitions</span>
        </Link>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Applied */}
        <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-5 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#D91E48] dark:hover:border-[#FF1E40]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
              Total Applied
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDECEF] dark:bg-[#2A060C] text-[#D91E48] dark:text-[#FF1E40] border border-[#F2B8C4] dark:border-[#E11D48]/30">
              <FileText className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-[#180C0E] dark:text-white tracking-tight drop-shadow-sm">
              0
            </span>
            <p className="text-[11px] text-[#5C494C] dark:text-[#BFA5AA] mt-1">
              Total tuition posts applied for
            </p>
          </div>
        </div>

        {/* Accepted */}
        <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-5 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#D91E48] dark:hover:border-[#FF1E40]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
              Accepted
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ECFDF5] dark:bg-[#0A2618] text-[#059669] dark:text-[#10B981] border border-[#A7F3D0] dark:border-[#10B981]/30">
              <CheckCircle2 className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-[#180C0E] dark:text-white tracking-tight drop-shadow-sm">
              0
            </span>
            <p className="text-[11px] text-[#5C494C] dark:text-[#BFA5AA] mt-1">
              Approved applications by mentors
            </p>
          </div>
        </div>

        {/* Pending */}
        <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-5 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#D91E48] dark:hover:border-[#FF1E40]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
              Pending
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FEF3C7] dark:bg-[#2A060C] text-[#D97706] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#E11D48]/30">
              <Clock className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-[#180C0E] dark:text-white tracking-tight drop-shadow-sm">
              0
            </span>
            <p className="text-[11px] text-[#5C494C] dark:text-[#BFA5AA] mt-1">
              Awaiting mentor review & confirmation
            </p>
          </div>
        </div>

        {/* Current Plan */}
        <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-5 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#D91E48] dark:hover:border-[#FF1E40]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
              Current Plan
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FEF3C7] dark:bg-[#281804] text-[#B45309] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#FFB800]/30 shadow-sm">
              <Crown className="h-4.5 w-4.5 fill-[#B45309] dark:fill-[#FFB800]" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-[#B45309] dark:text-[#FFB800] tracking-tight drop-shadow-sm">
              PRO
            </span>
            <p className="text-[11px] text-[#5C494C] dark:text-[#BFA5AA] mt-1">
              Premium member access enabled
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-6 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-xl space-y-4">
        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#180C0E] dark:text-white flex items-center gap-2">
          <Zap className="h-4 w-4 text-[#D91E48] dark:text-[#FF1E40]" />
          <span>Quick Actions</span>
        </h3>

        <div className="space-y-2.5">
          {/* Row 1: My Applications */}
          <Link
            href="/dashboard/applications"
            className="group flex items-center justify-between p-4 rounded-xl bg-[#FCF9F8] dark:bg-[#100103] border border-[#EADCDD] dark:border-[#E11D48]/20 hover:border-[#D91E48] dark:hover:border-[#FF1E40] hover:bg-[#F5ECEC] dark:hover:bg-[#1E0307] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] dark:bg-[#2A060C] text-[#D91E48] dark:text-[#FF1E40] border border-[#F2B8C4] dark:border-[#E11D48]/30 group-hover:bg-[#D91E48] group-hover:text-white transition-all">
                <FileText className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#180C0E] dark:text-white group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] transition-colors">
                  My Applications
                </h4>
                <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA]">
                  Track and manage submissions
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA] group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Row 2: Saved Tuitions */}
          <Link
            href="/dashboard/saved-tuitions"
            className="group flex items-center justify-between p-4 rounded-xl bg-[#FCF9F8] dark:bg-[#100103] border border-[#EADCDD] dark:border-[#E11D48]/20 hover:border-[#D91E48] dark:hover:border-[#FF1E40] hover:bg-[#F5ECEC] dark:hover:bg-[#1E0307] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEF3C7] dark:bg-[#2A060C] text-[#D97706] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#E11D48]/30 group-hover:bg-[#D97706] group-hover:text-white dark:group-hover:bg-[#FFB800] dark:group-hover:text-black transition-all">
                <Bookmark className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#180C0E] dark:text-white group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] transition-colors">
                  Saved Tuitions
                </h4>
                <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA]">
                  Your bookmarked subjects
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA] group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Row 3: Explore Mentors */}
          <Link
            href="/#tuitions"
            className="group flex items-center justify-between p-4 rounded-xl bg-[#FCF9F8] dark:bg-[#100103] border border-[#EADCDD] dark:border-[#E11D48]/20 hover:border-[#D91E48] dark:hover:border-[#FF1E40] hover:bg-[#F5ECEC] dark:hover:bg-[#1E0307] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] dark:bg-[#2A060C] text-[#D91E48] dark:text-[#FF4D6D] border border-[#F2B8C4] dark:border-[#E11D48]/30 group-hover:bg-[#D91E48] group-hover:text-white transition-all">
                <Search className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#180C0E] dark:text-white group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] transition-colors">
                  Explore Mentors
                </h4>
                <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA]">
                  Find experienced tutors nationwide
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA] group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>

      {/* Success Rate Tip Banner */}
      <div className="rounded-2xl bg-[#FDECEF] dark:bg-gradient-to-r dark:from-[#1E0307] dark:to-[#120205] border border-[#F2B8C4] dark:border-[#E11D48]/30 p-4 sm:p-5 flex items-center gap-4 shadow-sm dark:shadow-lg">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-[#2E070F] text-[#D91E48] dark:text-[#FF1E40] border border-[#F2B8C4] dark:border-[#FF1E40]/40 shadow-sm">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#D91E48] dark:text-[#FF1E40]">
            Boost your success rate
          </p>
          <p className="text-xs text-[#5C494C] dark:text-[#F4E2E5]/80 mt-0.5">
            Keep your student profile and contact details up-to-date so mentors can contact you quickly.
          </p>
        </div>
      </div>
    </div>
  );
}
