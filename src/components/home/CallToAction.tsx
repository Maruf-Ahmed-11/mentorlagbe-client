import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="relative py-24 bg-[#F8FAFC] dark:bg-[#07101E] overflow-hidden border-t border-[#E2E8F0] dark:border-[#0284C7]/30 transition-colors duration-200">
      {/* Cinematic Center Scarlet Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse_at_center,_rgba(224, 242, 254,0.9)_0%,_rgba(252,249,248,0.7)_50%,_transparent_75%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(14, 165, 233,0.32)_0%,_rgba(2, 132, 199,0.18)_50%,_transparent_75%)] blur-3xl pointer-events-none" />

      {/* Decorative Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#0EA5E9 1px, transparent 1px), linear-gradient(90deg, #0EA5E9 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#BAE6FD] dark:border-[#0EA5E9]/60 bg-[#FFFFFF] dark:bg-[#0C4A6E] px-4 py-1.5 mb-6 shadow-[0_4px_16px_rgba(2, 132, 199,0.12)] dark:shadow-[0_0_20px_rgba(14, 165, 233,0.4)]">
          <Sparkles className="h-3.5 w-3.5 text-[#0284C7] dark:text-[#0EA5E9] animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0B1320] dark:text-white">
            START YOUR ACADEMIC LEAP TODAY
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0B1320] dark:text-white uppercase tracking-tight leading-[1.1]">
          Ready to Connect With the{" "}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#0369A1] dark:from-white dark:via-[#E0F2FE] dark:to-[#0EA5E9] drop-shadow-[0_0_18px_rgba(2,132,199,0.25)] dark:drop-shadow-[0_0_35px_rgba(14,165,233,0.85)] mt-1">
            Best Tutors in Bangladesh?
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base text-[#475569] dark:text-[#E2E8F0]/85 leading-relaxed font-sans">
          Join thousands of students and tutors transforming academic mentorship. Post your tuition needs or launch your teaching career in minutes.
        </p>

        {/* Dual CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/tuitions"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] dark:bg-[#0284C7] dark:hover:bg-[#0EA5E9] text-white text-sm font-black uppercase tracking-wider shadow-[0_8px_25px_rgba(2, 132, 199,0.4)] dark:shadow-[0_0_30px_rgba(14, 165, 233,0.7)] hover:shadow-[0_12px_32px_rgba(2, 132, 199,0.55)] dark:hover:shadow-[0_0_45px_rgba(14, 165, 233,1)] transition-all cursor-pointer active:scale-95 group"
          >
            <span>Find a Mentor</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/sign-up?role=tutor"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[#BAE6FD] dark:border-[#0EA5E9]/60 bg-[#FFFFFF] hover:bg-[#F0F7FF] text-[#0B1320] dark:bg-[#0D1D38]/90 dark:hover:bg-[#0C4A6E] dark:hover:border-white dark:text-white text-sm font-bold uppercase tracking-wider shadow-sm dark:shadow-[0_0_20px_rgba(2, 132, 199,0.25)] transition-all cursor-pointer"
          >
            <span>Become a Tutor</span>
          </Link>
        </div>

        {/* Guarantees Sub-row */}
        <div className="mt-12 pt-8 border-t border-[#E2E8F0] dark:border-[#0284C7]/25 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-mono text-[#475569] dark:text-[#E2E8F0]/80">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-[#0284C7] dark:text-[#0EA5E9]" />
            <span>100% Verified Credentials</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#0284C7] dark:text-[#0EA5E9]" />
            <span>0% Platform Commission</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#0284C7] dark:text-[#0EA5E9]" />
            <span>Free 1-on-1 Trial Sessions</span>
          </div>
        </div>

      </div>
    </section>
  );
}
