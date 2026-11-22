"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, ShieldCheck, Star, Users, CheckCircle2, Sparkles, MapPin } from "lucide-react";

export default function HeroBanner() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tuitions?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/tuitions");
    }
  };

  return (
    <section id="home" className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background Cinematic Crimson Radial Spotlights */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.38)_0%,_rgba(136,8,22,0.22)_45%,_transparent_75%)] blur-3xl pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#E11D48]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Canvas Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#FF1E40 1px, transparent 1px), linear-gradient(90deg, #FF1E40 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#E11D48]/50 bg-[#1C0307]/85 backdrop-blur-xl px-4 py-2 mb-6 shadow-[0_0_20px_rgba(225,29,72,0.3)]">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1E40] opacity-80" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF1E40] shadow-[0_0_8px_#FF1E40]" />
              </span>
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-white">
                BANGLADESH&apos;S #1 TUITION &amp; MENTORSHIP MARKETPLACE
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.08] text-[#180C0E] dark:text-white">
              Find Your Ideal{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#180C0E] via-[#D91E48] to-[#B31438] dark:from-white dark:via-[#FFE4E6] dark:to-[#FF2E50] drop-shadow-[0_0_35px_rgba(255,30,64,0.3)]">
                Tutor or Mentorship
              </span>
              Batch Today
            </h1>

            {/* Sub-description */}
            <p className="mt-5 text-base sm:text-lg text-[#5C494C] dark:text-[#F4E2E5]/85 leading-relaxed max-w-2xl font-sans">
              Connect with verified tutors for personalized learning in Mathematics, Physics, Programming, IELTS &amp; Academic Curricula across Bangladesh. Verified mentors from BUET, DU, Medical &amp; top institutions.
            </p>

            {/* Interactive Search Bar Form & CTA */}
            <form
              onSubmit={handleSearch}
              className="mt-8 w-full max-w-xl flex flex-col sm:flex-row items-center gap-2.5 p-2 rounded-2xl bg-white dark:bg-[#1C0307]/90 border-2 border-[#EADCDD] dark:border-[#E11D48]/50 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.08)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.8)] focus-within:border-[#D91E48] transition-all"
            >
              <div className="flex items-center gap-3 px-3 w-full">
                <Search className="h-5 w-5 text-[#D91E48] dark:text-[#FF1E40] shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by subject, class level, or keyword..."
                  className="w-full bg-transparent text-sm text-[#180C0E] placeholder-[#8C7679] dark:text-white dark:placeholder-[#BFA5AA] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D91E48] hover:bg-[#B31438] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <span>Search Tuitions</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* Direct Browse Link */}
            <div className="mt-4 flex items-center gap-4 text-xs font-mono text-[#5C494C] dark:text-[#F4E2E5]/80">
              <span>Popular:</span>
              <Link href="/tuitions?q=Math" className="text-[#D91E48] dark:text-[#FF1E40] hover:underline font-bold">#Math</Link>
              <Link href="/tuitions?q=Physics" className="text-[#D91E48] dark:text-[#FF1E40] hover:underline font-bold">#Physics</Link>
              <Link href="/tuitions?q=IELTS" className="text-[#D91E48] dark:text-[#FF1E40] hover:underline font-bold">#IELTS</Link>
              <Link href="/tuitions?q=Programming" className="text-[#D91E48] dark:text-[#FF1E40] hover:underline font-bold">#Programming</Link>
            </div>

            {/* Trust Metrics Row */}
            <div className="mt-10 grid grid-cols-3 gap-6 pt-6 border-t border-[#EADCDD] dark:border-[#E11D48]/25 w-full max-w-xl">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#180C0E] dark:text-white font-mono">
                  2,800+
                </p>
                <p className="text-xs uppercase font-mono tracking-wider text-[#D91E48] dark:text-[#FF1E40] mt-0.5 font-bold">
                  Verified Tutors
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#180C0E] dark:text-white font-mono">
                  18,000+
                </p>
                <p className="text-xs uppercase font-mono tracking-wider text-[#5C494C] dark:text-[#F4E2E5]/75 mt-0.5">
                  Active Students
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#D91E48] dark:text-[#FF1E40] font-mono">
                  99.2%
                </p>
                <p className="text-xs uppercase font-mono tracking-wider text-[#5C494C] dark:text-[#F4E2E5]/75 mt-0.5">
                  Match Success
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Composite Card Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Ambient Background Glow behind Card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#E11D48]/35 to-transparent rounded-3xl blur-2xl pointer-events-none" />

            {/* Main Interactive Tutor Preview Card */}
            <div className="relative w-full max-w-md rounded-3xl border-2 border-[#EADCDD] dark:border-[#E11D48]/50 bg-white dark:bg-[#1C0307]/90 backdrop-blur-2xl p-6 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.08)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.95)] transition-transform hover:-translate-y-1.5 duration-300">
              
              {/* Card Image Banner */}
              <div className="relative h-56 w-full rounded-2xl overflow-hidden border border-[#EADCDD] dark:border-[#E11D48]/30">
                <Image
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
                  alt="Verified Mentor Session"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                
                {/* Mode & Verified Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/75 backdrop-blur-md text-[#FF4D6D] border border-white/20 shadow-md">
                    ONLINE &amp; OFFLINE
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#D91E48] text-white shadow-md">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>BUET Alum</span>
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono text-white">
                  <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-bold">5.0</span>
                  <span className="text-white/80">(140+ reviews)</span>
                </div>
              </div>

              {/* Mentor Info Content */}
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-black text-[#180C0E] dark:text-white">Tahmidur Rahman</h2>
                    <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA] font-mono">B.Sc. Mechanical Engineering, BUET</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#8C7679] dark:text-[#BFA5AA] uppercase font-mono">Monthly Fee</p>
                    <p className="text-lg font-black text-[#D91E48] dark:text-[#FF1E40] font-mono">৳6,000<span className="text-xs text-[#5C494C] dark:text-white">/mo</span></p>
                  </div>
                </div>

                {/* Specializations Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#F5ECEC] dark:bg-[#2A060C] border border-[#EADCDD] dark:border-[#E11D48]/35 text-[#5C494C] dark:text-[#F4E2E5]">
                    HSC Higher Math
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#F5ECEC] dark:bg-[#2A060C] border border-[#EADCDD] dark:border-[#E11D48]/35 text-[#5C494C] dark:text-[#F4E2E5]">
                    Physics 1st &amp; 2nd
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#F5ECEC] dark:bg-[#2A060C] border border-[#EADCDD] dark:border-[#E11D48]/35 text-[#5C494C] dark:text-[#F4E2E5]">
                    BUET Admission
                  </span>
                </div>

                {/* Action Row */}
                <div className="pt-4 border-t border-[#EADCDD] dark:border-[#E11D48]/25 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[#5C494C] dark:text-[#F4E2E5]">
                    <MapPin className="h-3.5 w-3.5 text-[#D91E48] dark:text-[#FF1E40]" />
                    <span>Dhanmondi, Dhaka</span>
                  </div>
                  <Link
                    href="/tuitions"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#D91E48] hover:bg-[#B31438] px-3.5 py-1.5 rounded-lg transition-all shadow-sm"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Floating Overlapping Mini Pill */}
              <div className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white dark:bg-[#0E0203] border border-[#F2B8C4] dark:border-[#FF1E40]/60 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.12)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.9)]">
                <CheckCircle2 className="h-4 w-4 text-[#D91E48] dark:text-[#FF1E40]" />
                <span className="text-xs font-mono font-bold text-[#180C0E] dark:text-white">Instant 24H Application Response</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
