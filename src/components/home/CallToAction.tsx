import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="relative py-24 bg-[#110204] overflow-hidden border-t border-[#E11D48]/30">
      {/* Cinematic Center Scarlet Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse_at_center,_rgba(255,30,64,0.32)_0%,_rgba(225,29,72,0.18)_50%,_transparent_75%)] blur-3xl pointer-events-none" />

      {/* Decorative Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#FF1E40 1px, transparent 1px), linear-gradient(90deg, #FF1E40 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#FF1E40]/60 bg-[#2D060C] px-4 py-1.5 mb-6 shadow-[0_0_20px_rgba(255,30,64,0.4)]">
          <Sparkles className="h-3.5 w-3.5 text-[#FF1E40] animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-white">
            START YOUR ACADEMIC LEAP TODAY
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.1]">
          Ready to Connect With the{" "}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFE4E6] to-[#FF1E40] drop-shadow-[0_0_35px_rgba(255,30,64,0.85)] mt-1">
            Best Tutors in Bangladesh?
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base text-[#F4E2E5]/85 leading-relaxed font-sans">
          Join thousands of students and tutors transforming academic mentorship. Post your tuition needs or launch your teaching career in minutes.
        </p>

        {/* Dual CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/tuitions"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#E11D48] hover:bg-[#FF1E40] text-white text-sm font-black uppercase tracking-wider shadow-[0_0_30px_rgba(255,30,64,0.7)] hover:shadow-[0_0_45px_rgba(255,30,64,1)] transition-all cursor-pointer active:scale-95 group"
          >
            <span>Find a Mentor</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/sign-up?role=tutor"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[#FF1E40]/60 bg-[#1C0307]/90 hover:bg-[#2D060C] hover:border-white text-white text-sm font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(225,29,72,0.25)] transition-all cursor-pointer"
          >
            <span>Become a Tutor</span>
          </Link>
        </div>

        {/* Guarantees Sub-row */}
        <div className="mt-12 pt-8 border-t border-[#E11D48]/25 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-mono text-[#F4E2E5]/80">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-[#FF1E40]" />
            <span>100% Verified Credentials</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#FF1E40]" />
            <span>0% Platform Commission</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#FF1E40]" />
            <span>Free 1-on-1 Trial Sessions</span>
          </div>
        </div>

      </div>
    </section>
  );
}
