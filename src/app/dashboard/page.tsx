"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { 
  Users, 
  GraduationCap, 
  Clock, 
  DollarSign, 
  UserCheck, 
  BookOpen, 
  CreditCard, 
  ArrowRight, 
  Search, 
  FileText, 
  Bookmark, 
  TrendingUp,
  Sparkles
} from "lucide-react";

export default function DashboardOverviewPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const userName = user?.name || "asdf";
  const userEmail = user?.email || "admin@mentorlagbe.com";
  const userRole = (user as any)?.role || (userEmail.toLowerCase().includes("admin") ? "admin" : "student");

  // =========================================================================
  // 1. ADMIN DASHBOARD VIEW (Matching Image 1 & 3)
  // =========================================================================
  if (userRole === "admin") {
    return (
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            System Administration
          </h2>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Platform metrics, tuition moderation queue, user roles, and payment volume.
          </p>
        </div>

        {/* 4 Admin Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Total Users */}
          <div className="rounded-2xl bg-[#0F1B33] border border-[#1E2F52] p-5 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#94A3B8]">Total Users</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#142A4D] text-[#38BDF8]">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black text-white font-mono">0</p>
              <p className="text-xs text-[#64748B] mt-1">Registered students and mentors</p>
            </div>
          </div>

          {/* Total Tutors */}
          <div className="rounded-2xl bg-[#0F1B33] border border-[#1E2F52] p-5 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#94A3B8]">Total Tutors</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#142A4D] text-[#00C48C]">
                <GraduationCap className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black text-white font-mono">0</p>
              <p className="text-xs text-[#64748B] mt-1">0 active students enrolled</p>
            </div>
          </div>

          {/* Pending Tuitions */}
          <div className="rounded-2xl bg-[#0F1B33] border border-[#1E2F52] p-5 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#94A3B8]">Pending Tuitions</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#142A4D] text-[#00E5FF]">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-3">
                <p className="text-3xl font-black text-white font-mono">0</p>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-[#00C48C]/15 text-[#00C48C] border border-[#00C48C]/30">
                  All Clear
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-1">Awaiting moderation checks</p>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="rounded-2xl bg-[#0F1B33] border border-[#1E2F52] p-5 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#94A3B8]">Total Revenue</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#142A4D] text-[#10B981]">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black text-white font-mono">$0</p>
              <p className="text-xs text-[#64748B] mt-1">Cumulative Stripe subscription volume</p>
            </div>
          </div>
        </div>

        {/* 3 Clickable Action Cards (Matching Requirement 3 with slight hover animation) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* User Management */}
          <Link
            href="/dashboard"
            className="group rounded-2xl bg-[#0F1B33] hover:bg-[#152547] border border-[#1E2F52] hover:border-[#38BDF8]/60 p-5 flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#14284B] text-[#38BDF8] group-hover:scale-105 transition-transform">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                  User Management
                </h3>
                <p className="text-xs text-[#64748B]">Manage roles &amp; access</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-[#64748B] group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Tuition Moderation */}
          <Link
            href="/dashboard"
            className="group rounded-2xl bg-[#0F1B33] hover:bg-[#152547] border border-[#1E2F52] hover:border-[#FFB800]/60 p-5 flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2A2312] text-[#FFB800] group-hover:scale-105 transition-transform">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-[#FFB800] transition-colors">
                  Tuition Moderation
                </h3>
                <p className="text-xs text-[#64748B]">0 pending review</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-[#64748B] group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Transactions */}
          <Link
            href="/dashboard"
            className="group rounded-2xl bg-[#0F1B33] hover:bg-[#152547] border border-[#1E2F52] hover:border-[#00C48C]/60 p-5 flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B2A22] text-[#00C48C] group-hover:scale-105 transition-transform">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-[#00C48C] transition-colors">
                  Transactions
                </h3>
                <p className="text-xs text-[#64748B]">Stripe payment logs</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-[#64748B] group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. STUDENT WORKSPACE VIEW (Matching Image 4)
  // =========================================================================
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Welcome back, {userName}!</span>
            <span>👋</span>
          </h2>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Track your applied tuition applications, reviews, and learning journey.
          </p>
        </div>

        {/* Top Right: Browse Tuitions with Search Icon */}
        <Link
          href="/tuitions"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00C48C] hover:bg-[#00DDA0] text-[#080D1A] font-bold text-sm shadow-[0_0_20px_rgba(0,196,140,0.4)] transition-all cursor-pointer self-start sm:self-auto"
        >
          <Search className="h-4 w-4" />
          <span>Browse Tuitions</span>
        </Link>
      </div>

      {/* 4 Student Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Applied */}
        <div className="rounded-2xl bg-[#0F1B33] border border-[#1E2F52] p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#94A3B8]">Total Applied</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#142A4D] text-[#00C48C]">
              <FileText className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-white font-mono">0</p>
            <p className="text-xs text-[#64748B] mt-1">Total tuition posts applied for</p>
          </div>
        </div>

        {/* Accepted */}
        <div className="rounded-2xl bg-[#0F1B33] border border-[#1E2F52] p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#94A3B8]">Accepted</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#142A4D] text-[#00C48C]">
              <UserCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-white font-mono">0</p>
            <p className="text-xs text-[#64748B] mt-1">Approved applications by tutors</p>
          </div>
        </div>

        {/* Pending */}
        <div className="rounded-2xl bg-[#0F1B33] border border-[#1E2F52] p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#94A3B8]">Pending</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#142A4D] text-[#00E5FF]">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-white font-mono">0</p>
            <p className="text-xs text-[#64748B] mt-1">Awaiting tutor review and confirmation</p>
          </div>
        </div>

        {/* Current Plan */}
        <div className="rounded-2xl bg-[#0F1B33] border border-[#1E2F52] p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#94A3B8]">Current Plan</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2A2312] text-[#FFB800]">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-white font-mono">PRO</p>
            <p className="text-xs text-[#64748B] mt-1">Premium member access enabled</p>
          </div>
        </div>
      </div>

      {/* Quick Actions (Matching Image 4) */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
          Quick Actions
        </h3>

        <div className="space-y-2.5">
          {/* Action 1: My Applications */}
          <Link
            href="/dashboard/applications"
            className="group flex items-center justify-between p-4 rounded-xl bg-[#0F1B33] hover:bg-[#152547] border border-[#1E2F52] hover:border-[#00C48C]/50 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0E2C22] text-[#00C48C]">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-[#00C48C] transition-colors">
                  My Applications
                </p>
                <p className="text-xs text-[#64748B]">Track and manage submissions</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-[#64748B] group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Action 2: Saved Tuitions */}
          <Link
            href="/dashboard/saved-tuitions"
            className="group flex items-center justify-between p-4 rounded-xl bg-[#0F1B33] hover:bg-[#152547] border border-[#1E2F52] hover:border-[#FFB800]/50 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2A2312] text-[#FFB800]">
                <Bookmark className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-[#FFB800] transition-colors">
                  Saved Tuitions
                </p>
                <p className="text-xs text-[#64748B]">Your bookmarked subjects</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-[#64748B] group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Action 3: Explore Mentors */}
          <Link
            href="/tuitions"
            className="group flex items-center justify-between p-4 rounded-xl bg-[#0F1B33] hover:bg-[#152547] border border-[#1E2F52] hover:border-[#38BDF8]/50 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#14284B] text-[#38BDF8]">
                <Search className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                  Explore Mentors
                </p>
                <p className="text-xs text-[#64748B]">Find experienced tutors</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-[#64748B] group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>

      {/* Boost Tip Banner (Matching Image 4) */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0B2027] border border-[#00C48C]/30 text-xs">
        <TrendingUp className="h-5 w-5 text-[#00C48C] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-[#00C48C]">Boost your success rate: </span>
          <span className="text-[#94A3B8]">
            Keep your student profile and contact details up-to-date so mentors can contact you quickly.
          </span>
        </div>
      </div>
    </div>
  );
}
