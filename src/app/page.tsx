import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, BookOpen, CheckCircle, Sparkles, Star, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#110204] text-white overflow-hidden">
      
      {/* ========================================================================= */}
      {/* VISUALLY STUNNING CINEMATIC CRIMSON BACKGROUND ARCHITECTURE                */}
      {/* ========================================================================= */}
      
      {/* 1. Primary Central Crimson Sunburst Spotlight (Matches CSM Key Visual) */}
      <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[950px] h-[550px] bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.42)_0%,_rgba(136,8,22,0.28)_45%,_transparent_75%)] blur-3xl pointer-events-none" />

      {/* 2. Secondary Intense Scarlet Flare */}
      <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,_rgba(255,30,64,0.3)_0%,_rgba(225,29,72,0.15)_50%,_transparent_70%)] blur-2xl pointer-events-none" />

      {/* 3. Deep Blood Wine Peripheral Flares */}
      <div className="absolute top-1/4 -right-40 w-[450px] h-[450px] bg-[#E11D48]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-[450px] h-[450px] bg-[#880816]/25 rounded-full blur-[150px] pointer-events-none" />

      {/* 4. Fine Cinematic Texture Grid & Noise Vignette */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#FF1E40 1px, transparent 1px), linear-gradient(90deg, #FF1E40 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 5. Dramatic Vignette Overlay for Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(14,2,3,0.85)_100%)] pointer-events-none" />

      {/* ========================================================================= */}
      {/* CONTENT LAYER                                                             */}
      {/* ========================================================================= */}
      <section className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-28 md:pb-32 flex flex-col items-center text-center z-10">
        
        {/* Cinematic Crimson Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#E11D48]/45 bg-[#1C0307]/80 backdrop-blur-xl px-4 sm:px-5 py-2 mb-8 shadow-[0_0_25px_rgba(225,29,72,0.35)] transition-all hover:border-[#FF1E40]">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1E40] opacity-80"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF1E40] shadow-[0_0_10px_#FF1E40]"></span>
          </span>
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-white">
            BANGLADESH&apos;S PREMIER TUITION PLATFORM
          </span>
          <span className="text-xs text-[#E11D48]/60 font-mono">|</span>
          <span className="text-xs font-mono font-bold text-[#FF1E40] glow-scarlet">VERIFIED NETWORK</span>
        </div>

        {/* Hero Title (Bold High-Contrast with Luminous Glowing Text) */}
        <h1 className="max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] uppercase">
          <span className="block text-white drop-shadow-[0_4px_25px_rgba(255,255,255,0.2)]">
            FIND YOUR PERFECT TUTOR
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF4D6D] to-[#FF1E40] drop-shadow-[0_0_35px_rgba(225,29,72,0.8)] mt-1">
            OR SHARE EXPERTISE
          </span>
          <span className="block text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#F4E2E5] mt-3 tracking-normal normal-case drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
            Connecting ambitious students with top-rated mentors across Bangladesh
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-[#F4E2E5]/90 leading-relaxed font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Connect with verified home & online tutors from BUET, DU, Medical, and top institutions. Post your tuition requirements or apply as an expert mentor today.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/tuitions"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-[#E11D48] px-9 py-4 text-sm font-black text-white shadow-[0_0_30px_rgba(225,29,72,0.6)] hover:bg-[#FF1E40] hover:shadow-[0_0_45px_rgba(255,30,64,0.9)] transition-all duration-300 active:scale-95 group uppercase tracking-wider"
          >
            <span>Browse Tuitions</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/post-tuition"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#E11D48]/40 bg-[#1C0307]/80 backdrop-blur-md px-9 py-4 text-sm font-bold text-white hover:border-[#FF1E40] hover:bg-[#2A060C] hover:shadow-[0_0_25px_rgba(225,29,72,0.35)] transition-all duration-200 uppercase tracking-wider"
          >
            <span>Request a Tutor</span>
          </Link>
        </div>

        {/* Visually Distinct Feature Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl text-left">
          
          {/* Card 1: Verified Tutors */}
          <div className="group relative rounded-2xl border border-[#E11D48]/35 bg-[#1C0307]/85 backdrop-blur-xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.8),_inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 hover:border-[#FF1E40] hover:shadow-[0_0_35px_rgba(225,29,72,0.45)] hover:-translate-y-1">
            <div className="flex items-center justify-between pb-4 border-b border-[#E11D48]/20">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF1E40] uppercase">
                [ VERIFIED // BUET / DU / MEDICAL ]
              </span>
              <span className="h-2 w-2 rounded-full bg-[#FF1E40] animate-pulse shadow-[0_0_8px_#FF1E40]" />
            </div>

            <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2A060C] border border-[#E11D48]/40 text-[#FF1E40] group-hover:text-white group-hover:bg-[#E11D48] group-hover:shadow-[0_0_20px_rgba(225,29,72,0.6)] transition-all">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <h2 className="mt-4 text-lg font-bold text-white group-hover:text-[#FF1E40] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              Verified Tutors
            </h2>
            <p className="mt-2 text-sm text-[#F4E2E5]/80 leading-relaxed">
              Academic credentials, NID, and student identities vetted from top public and private universities.
            </p>

            <div className="mt-5 pt-4 border-t border-[#E11D48]/20 flex items-center justify-between text-xs font-mono text-[#BFA5AA]">
              <span>ID & DEGREE CHECKED</span>
              <span className="text-[#FF1E40] font-bold">100% VETTED</span>
            </div>
          </div>

          {/* Card 2: Fast Matching */}
          <div className="group relative rounded-2xl border border-[#E11D48]/35 bg-[#1C0307]/85 backdrop-blur-xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.8),_inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 hover:border-[#FF1E40] hover:shadow-[0_0_35px_rgba(225,29,72,0.45)] hover:-translate-y-1">
            <div className="flex items-center justify-between pb-4 border-b border-[#E11D48]/20">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF1E40] uppercase">
                [ SPEED // 24-HOUR RESPONSE ]
              </span>
              <span className="h-2 w-2 rounded-full bg-[#FF1E40] animate-pulse shadow-[0_0_8px_#FF1E40]" />
            </div>

            <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2A060C] border border-[#E11D48]/40 text-[#FF1E40] group-hover:text-white group-hover:bg-[#E11D48] group-hover:shadow-[0_0_20px_rgba(225,29,72,0.6)] transition-all">
              <Zap className="h-6 w-6" />
            </div>

            <h2 className="mt-4 text-lg font-bold text-white group-hover:text-[#FF1E40] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              Instant Tuition Matching
            </h2>
            <p className="mt-2 text-sm text-[#F4E2E5]/80 leading-relaxed">
              Post your requirements and receive matched tutor applications within 24 hours. Direct communication with mentors.
            </p>

            <div className="mt-5 pt-4 border-t border-[#E11D48]/20 flex items-center justify-between text-xs font-mono text-[#BFA5AA]">
              <span>RESPONSE: &lt; 24H</span>
              <span className="text-[#FF1E40] font-bold">ZERO COMMISSION</span>
            </div>
          </div>

          {/* Card 3: All Curricula */}
          <div className="group relative rounded-2xl border border-[#E11D48]/35 bg-[#1C0307]/85 backdrop-blur-xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.8),_inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 hover:border-[#FF1E40] hover:shadow-[0_0_35px_rgba(225,29,72,0.45)] hover:-translate-y-1">
            <div className="flex items-center justify-between pb-4 border-b border-[#E11D48]/20">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF1E40] uppercase">
                [ ACADEMICS // ALL MEDIUMS ]
              </span>
              <span className="h-2 w-2 rounded-full bg-[#FF1E40] animate-pulse shadow-[0_0_8px_#FF1E40]" />
            </div>

            <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2A060C] border border-[#E11D48]/40 text-[#FF1E40] group-hover:text-white group-hover:bg-[#E11D48] group-hover:shadow-[0_0_20px_rgba(225,29,72,0.6)] transition-all">
              <BookOpen className="h-6 w-6" />
            </div>

            <h2 className="mt-4 text-lg font-bold text-white group-hover:text-[#FF1E40] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              All Levels & Curricula
            </h2>
            <p className="mt-2 text-sm text-[#F4E2E5]/80 leading-relaxed">
              Bangla Medium, English Medium (Cambridge/Edexcel), English Version, SSC/HSC, and University STEM tutoring.
            </p>

            <div className="mt-5 pt-4 border-t border-[#E11D48]/20 flex items-center justify-between text-xs font-mono text-[#BFA5AA]">
              <span>CLASS 1 TO UNIVERSITY</span>
              <span className="text-[#FF1E40] font-bold">NATIONWIDE</span>
            </div>
          </div>

        </div>

        {/* Live Metrics Ribbon with Crimson Glass Glow */}
        <div className="mt-16 w-full max-w-5xl rounded-2xl border border-[#E11D48]/40 bg-[#1C0307]/90 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(225,29,72,0.25),_inset_0_1px_0_rgba(255,255,255,0.12)] flex flex-wrap justify-around items-center gap-6">
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-black text-white font-mono drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              1,500+
            </p>
            <p className="text-xs uppercase font-mono tracking-wider text-[#FF1E40] mt-1 font-bold">Verified Mentors</p>
          </div>
          <div className="h-10 w-px bg-[#E11D48]/30 hidden sm:block" />
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-black text-[#FF1E40] font-mono glow-scarlet">
              99.2%
            </p>
            <p className="text-xs uppercase font-mono tracking-wider text-[#F4E2E5]/80 mt-1">Match Success</p>
          </div>
          <div className="h-10 w-px bg-[#E11D48]/30 hidden sm:block" />
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-black text-white font-mono drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              4,800+
            </p>
            <p className="text-xs uppercase font-mono tracking-wider text-[#FF1E40] mt-1 font-bold">Tuitions Completed</p>
          </div>
          <div className="h-10 w-px bg-[#E11D48]/30 hidden sm:block" />
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-black text-[#FF1E40] font-mono glow-scarlet">
              4.9/5
            </p>
            <p className="text-xs uppercase font-mono tracking-wider text-[#F4E2E5]/80 mt-1">Student & Parent Rating</p>
          </div>
        </div>

      </section>
    </div>
  );
}
