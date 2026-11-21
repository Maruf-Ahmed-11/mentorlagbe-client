import Link from "next/link";
import { ArrowRight, Search, ShieldCheck, Clock, Users, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#07080B] text-slate-100 overflow-hidden">
      {/* Ambient Glows from the Palette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-gradient-to-b from-[#7C8CE4]/12 via-[#38BDF8]/8 to-transparent blur-3xl pointer-events-none" />

      {/* Hero Placeholder Section */}
      <section className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28 flex flex-col items-center text-center">
        
        {/* Category / Platform Tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#7C8CE4]/30 bg-[#0E1018]/80 backdrop-blur-md px-4 py-1.5 mb-8 shadow-[0_0_20px_rgba(124,140,228,0.15)]">
          <span className="flex h-2 w-2 rounded-full bg-[#38BDF8] animate-pulse shadow-[0_0_8px_#38BDF8]" />
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#7C8CE4]">
            Bangladesh's Trusted Tuition & Mentorship Platform
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="max-w-4xl text-4xl sm:text-6xl font-black tracking-tight leading-[1.1]">
          Find Your Perfect Tutor or{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C8CE4] via-[#94A3F2] to-[#38BDF8]">
            Share Your Expertise
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed font-sans">
          Connect with verified home & online tutors from top universities. Post your tuition requirements or apply as an expert mentor across Bangladesh.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/tuitions"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#7C8CE4] px-8 py-3.5 text-sm font-bold text-[#07080B] shadow-[0_0_25px_rgba(124,140,228,0.35)] hover:bg-[#94A3F2] hover:shadow-[0_0_30px_rgba(56,189,248,0.55)] transition-all duration-300 active:scale-95 group"
          >
            <span>Browse Tuitions</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/post-tuition"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#1E2335] bg-[#0E1018] px-8 py-3.5 text-sm font-semibold text-slate-300 hover:text-white hover:border-[#7C8CE4]/60 hover:bg-[#141724] transition-all duration-200"
          >
            <span>Request a Tutor</span>
          </Link>
        </div>

        {/* Highlight Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl text-left">
          
          <div className="group rounded-2xl border border-[#1E2335] bg-[#0E1018]/90 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#7C8CE4]/60 hover:shadow-[0_10px_30px_rgba(124,140,228,0.15)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#141724] border border-[#1E2335] text-[#7C8CE4] group-hover:text-[#38BDF8] transition-colors">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-white group-hover:text-[#7C8CE4] transition-colors">
              Verified Tutors
            </h2>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Academic credentials and student IDs vetted from BUET, DU, Medical, and top institutions.
            </p>
          </div>

          <div className="group rounded-2xl border border-[#1E2335] bg-[#0E1018]/90 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#7C8CE4]/60 hover:shadow-[0_10px_30px_rgba(124,140,228,0.15)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#141724] border border-[#1E2335] text-[#38BDF8] group-hover:text-[#7C8CE4] transition-colors">
              <Clock className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-white group-hover:text-[#7C8CE4] transition-colors">
              Fast Matching
            </h2>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Post your requirements and get connected with available nearby tutors in less than 24 hours.
            </p>
          </div>

          <div className="group rounded-2xl border border-[#1E2335] bg-[#0E1018]/90 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#7C8CE4]/60 hover:shadow-[0_10px_30px_rgba(124,140,228,0.15)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#141724] border border-[#1E2335] text-[#7C8CE4] group-hover:text-[#38BDF8] transition-colors">
              <BookOpen className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-white group-hover:text-[#7C8CE4] transition-colors">
              All Levels & Curricula
            </h2>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Bangla Medium, English Medium (Cambridge/Edexcel), English Version, and university subjects.
            </p>
          </div>

        </div>

      </section>
    </div>
  );
}
