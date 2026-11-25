import { GraduationCap } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F8FAFC] dark:bg-[#050B14] flex flex-col items-center justify-center px-4 py-16">
      <div className="relative flex flex-col items-center gap-5 max-w-md w-full text-center">
        {/* Glowing Loader Ring */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-2xl border-2 border-[#BAE6FD] dark:border-[#0284C7]/30 animate-ping opacity-30" />
          <div className="h-16 w-16 rounded-2xl bg-white dark:bg-[#0B1930] border border-[#BAE6FD] dark:border-[#0284C7]/50 shadow-[0_8px_24px_rgba(2,132,199,0.18)] dark:shadow-[0_0_28px_rgba(14,165,233,0.35)] flex items-center justify-center">
            <GraduationCap className="w-7 h-7 text-[#0284C7] dark:text-[#38BDF8] animate-pulse" />
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#0284C7] dark:text-[#38BDF8]">
            MENTORLAGBE // LOADING
          </p>
          <p className="text-sm text-[#475569] dark:text-[#94A3B8]">
            Preparing your mentorship workspace...
          </p>
        </div>

        {/* Subtle Skeleton Bar */}
        <div className="w-48 h-1.5 rounded-full bg-[#E2E8F0] dark:bg-[#0D1D38] overflow-hidden">
          <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-[#0284C7] to-[#38BDF8] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
