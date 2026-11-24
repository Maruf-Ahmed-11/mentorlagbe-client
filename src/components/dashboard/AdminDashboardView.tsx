"use client";

import Link from "next/link";
import { 
  Users, 
  GraduationCap, 
  Clock, 
  DollarSign, 
  ArrowUpRight, 
  ShieldCheck,
  Activity,
  CreditCard
} from "lucide-react";
import { DashboardViewProps } from "./types";

export default function AdminDashboardView({ userName }: DashboardViewProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#0D1D38] border border-[#BAE6FD] dark:border-[#0284C7]/35 text-[11px] font-mono font-bold tracking-wider text-[#0284C7] dark:text-[#0EA5E9] uppercase mb-2 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CENTRAL COMMAND // ADMIN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1320] dark:text-white tracking-tight">
            System Administration
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
            Platform metrics, tuition moderation queue, user roles, and payment volume.
          </p>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Total Users */}
        <div className="rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-5 shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#0284C7] dark:hover:border-[#0EA5E9]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Total Users
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#0EA5E9] border border-[#BAE6FD] dark:border-[#0284C7]/30 shadow-sm">
              <Users className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-[#0B1320] dark:text-white tracking-tight drop-shadow-sm">
              0
            </span>
            <p className="text-[11px] text-[#475569] dark:text-[#94A3B8] mt-1">
              Registered students and mentors
            </p>
          </div>
        </div>

        {/* Metric 2: Total Tutors */}
        <div className="rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-5 shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#0284C7] dark:hover:border-[#0EA5E9]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Total Tutors
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#38BDF8] border border-[#BAE6FD] dark:border-[#0284C7]/30 shadow-sm">
              <GraduationCap className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-[#0B1320] dark:text-white tracking-tight drop-shadow-sm">
              0
            </span>
            <p className="text-[11px] text-[#475569] dark:text-[#94A3B8] mt-1">
              Active mentors enrolled
            </p>
          </div>
        </div>

        {/* Metric 3: Pending Tuitions */}
        <div className="rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-5 shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#0284C7] dark:hover:border-[#0EA5E9]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Pending Tuitions
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FEF3C7] dark:bg-[#102547] text-[#D97706] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#0284C7]/30 shadow-sm">
              <Clock className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-black text-[#0B1320] dark:text-white tracking-tight drop-shadow-sm">
                0
              </span>
              <p className="text-[11px] text-[#475569] dark:text-[#94A3B8] mt-1">
                Awaiting moderation checks
              </p>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#ECFDF5] dark:bg-[#0A2618] text-[#059669] dark:text-[#10B981] border border-[#A7F3D0] dark:border-[#10B981]/30">
              All Clear
            </span>
          </div>
        </div>

        {/* Metric 4: Total Revenue */}
        <div className="rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-5 shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#0284C7] dark:hover:border-[#0EA5E9]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Total Revenue
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#0EA5E9] border border-[#BAE6FD] dark:border-[#0284C7]/30 shadow-sm">
              <DollarSign className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-[#0B1320] dark:text-white tracking-tight drop-shadow-sm">
              $0
            </span>
            <p className="text-[11px] text-[#475569] dark:text-[#94A3B8] mt-1">
              Cumulative Stripe subscription volume
            </p>
          </div>
        </div>
      </div>

      {/* 3 Clickable Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: User Management */}
        <Link
          href="/dashboard"
          className="group rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-6 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-xl hover:border-[#0284C7] dark:hover:border-[#0EA5E9] hover:shadow-md transition-all flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#0EA5E9] border border-[#BAE6FD] dark:border-[#0284C7]/30 group-hover:scale-105 transition-transform shadow-sm">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B1320] dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] transition-colors">
                User Management
              </h3>
              <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-0.5">
                Manage roles and credentials
              </p>
            </div>
          </div>
          <ArrowUpRight className="h-5 w-5 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </Link>

        {/* Card 2: Tuition Moderation */}
        <Link
          href="/dashboard"
          className="group rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-6 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-xl hover:border-[#0284C7] dark:hover:border-[#0EA5E9] hover:shadow-md transition-all flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FEF3C7] dark:bg-[#281804] text-[#D97706] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#FFB800]/30 group-hover:scale-105 transition-transform shadow-sm">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B1320] dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] transition-colors">
                Tuition Moderation
              </h3>
              <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-0.5">
                Review and approve listings
              </p>
            </div>
          </div>
          <ArrowUpRight className="h-5 w-5 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </Link>

        {/* Card 3: Transactions */}
        <Link
          href="/dashboard"
          className="group rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-6 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-xl hover:border-[#0284C7] dark:hover:border-[#0EA5E9] hover:shadow-md transition-all flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#0EA5E9] border border-[#BAE6FD] dark:border-[#0284C7]/30 group-hover:scale-105 transition-transform shadow-sm">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B1320] dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] transition-colors">
                Transactions
              </h3>
              <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-0.5">
                Stripe payment logs
              </p>
            </div>
          </div>
          <ArrowUpRight className="h-5 w-5 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </Link>
      </div>
    </div>
  );
}
