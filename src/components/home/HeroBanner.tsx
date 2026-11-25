"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, ShieldCheck, Star, Users, CheckCircle2, Sparkles, MapPin } from "lucide-react";

export default function HeroBanner() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const replay = () => setAnimKey((k) => k + 1);
    window.addEventListener("mentorlagbe_replay_home", replay);
    return () => window.removeEventListener("mentorlagbe_replay_home", replay);
  }, []);

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
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-[radial-gradient(ellipse_at_center,_rgba(2, 132, 199,0.38)_0%,_rgba(12, 74, 110,0.22)_45%,_transparent_75%)] blur-3xl pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Canvas Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#0EA5E9 1px, transparent 1px), linear-gradient(90deg, #0EA5E9 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div key={animKey} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Live Indicator Pill */}
            <div className="animate-hero-up-1 inline-flex items-center gap-2.5 rounded-full border border-[#BAE6FD] dark:border-[#0284C7]/50 bg-[#FFFFFF] dark:bg-[#0D1D38]/85 backdrop-blur-xl px-4 py-2 mb-6 shadow-[0_4px_16px_rgba(2, 132, 199,0.12)] dark:shadow-[0_0_20px_rgba(2, 132, 199,0.3)]">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0284C7] dark:bg-[#0EA5E9] opacity-80" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0284C7] dark:bg-[#0EA5E9] shadow-[0_0_8px_#0284C7] dark:shadow-[0_0_8px_#0EA5E9]" />
              </span>
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#0B1320] dark:text-white">
                BANGLADESH&apos;S #1 TUITION &amp; MENTORSHIP MARKETPLACE
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="animate-hero-up-2 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.08] text-[#0B1320] dark:text-white">
              Find Your Ideal{" "}
              <span className="block glow-hero-gradient font-black tracking-tight uppercase mt-1">
                Tutor or Mentorship
              </span>
              Batch Today
            </h1>

            {/* Sub-description */}
            <p className="animate-hero-up-3 mt-5 text-base sm:text-lg text-[#475569] dark:text-[#E2E8F0]/85 leading-relaxed max-w-2xl font-sans">
              Connect with verified tutors for personalized learning in Mathematics, Physics, Programming, IELTS &amp; Academic Curricula across Bangladesh. Verified mentors from BUET, DU, Medical &amp; top institutions.
            </p>

            {/* Interactive Search Bar Form & CTA */}
            <form
              onSubmit={handleSearch}
              className="animate-hero-up-4 mt-8 w-full max-w-xl flex flex-col sm:flex-row items-center gap-2.5 p-2 rounded-2xl bg-white dark:bg-[#0D1D38]/90 border-2 border-[#E2E8F0] dark:border-[#0284C7]/50 shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.08)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.8)] focus-within:border-[#0284C7] transition-all"
            >
              <div className="flex items-center gap-3 px-3 w-full">
                <Search className="h-5 w-5 text-[#0284C7] dark:text-[#0EA5E9] shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by subject, class level, or keyword..."
                  className="w-full bg-transparent text-sm text-[#0B1320] placeholder-[#64748B] dark:text-white dark:placeholder-[#94A3B8] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <span>Search Tuitions</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* Direct Browse Link */}
            <div className="animate-hero-up-4 mt-4 flex items-center gap-4 text-xs font-mono text-[#475569] dark:text-[#E2E8F0]/80">
              <span>Popular:</span>
              <Link href="/tuitions?q=Math" className="text-[#0284C7] dark:text-[#0EA5E9] hover:underline font-bold">#Math</Link>
              <Link href="/tuitions?q=Physics" className="text-[#0284C7] dark:text-[#0EA5E9] hover:underline font-bold">#Physics</Link>
              <Link href="/tuitions?q=IELTS" className="text-[#0284C7] dark:text-[#0EA5E9] hover:underline font-bold">#IELTS</Link>
              <Link href="/tuitions?q=Programming" className="text-[#0284C7] dark:text-[#0EA5E9] hover:underline font-bold">#Programming</Link>
            </div>

            {/* Trust Metrics Row */}
            <div className="animate-hero-up-5 mt-10 grid grid-cols-3 gap-6 pt-6 border-t border-[#E2E8F0] dark:border-[#0284C7]/25 w-full max-w-xl">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#0284C7] dark:text-[#38BDF8] dark:glow-azure font-mono">
                  2,800+
                </p>
                <p className="text-xs uppercase font-mono tracking-wider text-[#0284C7] dark:text-[#38BDF8] mt-0.5 font-bold">
                  Verified Tutors
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#0B1320] dark:text-white dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] font-mono">
                  18,000+
                </p>
                <p className="text-xs uppercase font-mono tracking-wider text-[#475569] dark:text-[#E2E8F0]/85 mt-0.5 font-semibold">
                  Active Students
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#0284C7] dark:text-[#38BDF8] dark:glow-azure font-mono">
                  99.2%
                </p>
                <p className="text-xs uppercase font-mono tracking-wider text-[#475569] dark:text-[#E2E8F0]/85 mt-0.5 font-semibold">
                  Match Success
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Composite Card Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Ambient Background Glow behind Card */}
            <div className="animate-hero-card absolute inset-0 bg-gradient-to-tr from-[#BAE6FD]/40 to-transparent dark:from-[#0284C7]/35 dark:to-transparent rounded-3xl blur-2xl pointer-events-none" />

            {/* Main Interactive Tutor Preview Card */}
            <div className="animate-hero-card relative w-full max-w-md rounded-3xl border-2 border-[#BAE6FD] dark:border-[#0284C7]/50 bg-white dark:bg-[#0D1D38]/90 backdrop-blur-2xl p-6 shadow-[0_16px_40px_-8px_rgba(2, 132, 199,0.14),_0_0_20px_rgba(2, 132, 199,0.1)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.95)] transition-transform hover:-translate-y-1.5 duration-300">
              
              {/* Card Image Banner */}
              <div className="relative h-56 w-full rounded-2xl overflow-hidden border border-[#E2E8F0] dark:border-[#0284C7]/30">
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
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/75 backdrop-blur-md text-[#38BDF8] border border-white/20 shadow-md">
                    ONLINE &amp; OFFLINE
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0284C7] text-white shadow-md">
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
                    <h2 className="text-lg font-black text-[#0B1320] dark:text-white">Tahmidur Rahman</h2>
                    <p className="text-xs text-[#475569] dark:text-[#94A3B8] font-mono">B.Sc. Mechanical Engineering, BUET</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#64748B] dark:text-[#94A3B8] uppercase font-mono">Monthly Fee</p>
                    <p className="text-lg font-black text-[#0284C7] dark:text-[#0EA5E9] font-mono">৳6,000<span className="text-xs text-[#475569] dark:text-white">/mo</span></p>
                  </div>
                </div>

                {/* Specializations Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#F0F7FF] dark:bg-[#102547] border border-[#E2E8F0] dark:border-[#0284C7]/35 text-[#475569] dark:text-[#E2E8F0]">
                    HSC Higher Math
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#F0F7FF] dark:bg-[#102547] border border-[#E2E8F0] dark:border-[#0284C7]/35 text-[#475569] dark:text-[#E2E8F0]">
                    Physics 1st &amp; 2nd
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#F0F7FF] dark:bg-[#102547] border border-[#E2E8F0] dark:border-[#0284C7]/35 text-[#475569] dark:text-[#E2E8F0]">
                    BUET Admission
                  </span>
                </div>

                {/* Action Row */}
                <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#0284C7]/25 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[#475569] dark:text-[#E2E8F0]">
                    <MapPin className="h-3.5 w-3.5 text-[#0284C7] dark:text-[#0EA5E9]" />
                    <span>Dhanmondi, Dhaka</span>
                  </div>
                  <Link
                    href="/tuitions"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#0284C7] hover:bg-[#0369A1] px-3.5 py-1.5 rounded-lg transition-all shadow-sm"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Floating Overlapping Mini Pill */}
              <div className="animate-hero-badge absolute -bottom-4 -left-4 hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white dark:bg-[#050B14] border border-[#BAE6FD] dark:border-[#0EA5E9]/60 shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.12)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.9)]">
                <CheckCircle2 className="h-4 w-4 text-[#0284C7] dark:text-[#0EA5E9]" />
                <span className="text-xs font-mono font-bold text-[#0B1320] dark:text-white">Instant 24H Application Response</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
