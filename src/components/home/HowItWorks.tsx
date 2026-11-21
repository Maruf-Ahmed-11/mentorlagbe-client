"use client";

import { useState } from "react";
import { UserCheck, FilePlus2, CheckCircle2, Crown, Search, Send, CalendarCheck, ShieldCheck } from "lucide-react";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"student" | "tutor">("student");

  const studentSteps = [
    {
      step: "01",
      icon: Search,
      title: "Discover & Filter Mentors",
      description: "Search approved tuitions by subject, class level, district, and preferred mode (Online live batch or Offline home tutor).",
      tag: "STEP 1: BROWSE",
    },
    {
      step: "02",
      icon: Send,
      title: "Submit Direct Application",
      description: "Fill out the quick enrollment form with your preferred days, timing, and learning goals. Free students can bookmark up to 5 favorites.",
      tag: "STEP 2: APPLY",
    },
    {
      step: "03",
      icon: CalendarCheck,
      title: "Trial Session & Match",
      description: "The tutor reviews your application and accepts your request. Attend a free trial or intro session to ensure the right academic fit.",
      tag: "STEP 3: CONNECT",
    },
    {
      step: "04",
      icon: Crown,
      title: "Pro Benefits & Mastery",
      description: "Upgrade to Student Pro for unlimited saved bookmarks, priority applicant highlights, and instant WhatsApp status notifications.",
      tag: "STEP 4: EXCEL",
    },
  ];

  const tutorSteps = [
    {
      step: "01",
      icon: UserCheck,
      title: "Sign Up & Verify Credentials",
      description: "Register with BetterAuth as a Tutor. Submit your university ID and academic background for our 24-hour verification check.",
      tag: "STEP 1: REGISTER",
    },
    {
      step: "02",
      icon: FilePlus2,
      title: "Publish Tuition Batches",
      description: "Create tuition posts specifying monthly fee, subject, location, and class level. Free mentors post up to 2 posts; Pro mentors post unlimited.",
      tag: "STEP 2: POST",
    },
    {
      step: "03",
      icon: ShieldCheck,
      title: "Admin Moderation Approval",
      description: "Our admin team inspects your post for quality standards. Once approved, your listing goes live across Bangladesh's tuition marketplace.",
      tag: "STEP 3: MODERATION",
    },
    {
      step: "04",
      icon: CheckCircle2,
      title: "Accept Students & 0% Fee",
      description: "Manage student applications from your Tutor Dashboard, accept enrollments, and keep 100% of your earnings with zero commission.",
      tag: "STEP 4: TEACH",
    },
  ];

  const currentSteps = activeTab === "student" ? studentSteps : tutorSteps;

  return (
    <section id="how-it-works" className="relative py-24 bg-[#110204] overflow-hidden border-t border-[#E11D48]/20">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.18)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E11D48]/40 bg-[#1C0307]/80 px-4 py-1.5 mb-4 shadow-[0_0_20px_rgba(225,29,72,0.25)]">
            <span className="h-2 w-2 rounded-full bg-[#FF1E40] animate-pulse shadow-[0_0_8px_#FF1E40]" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-white">
              SEAMLESS 4-STEP WORKFLOW
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            How MentorLagbe <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF4D6D] to-[#FF1E40] drop-shadow-[0_0_25px_rgba(255,30,64,0.6)]">Works</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#F4E2E5]/80 leading-relaxed">
            Transparent, zero-middleman connection built for students aiming for academic excellence and verified educators sharing their passion.
          </p>

          {/* Interactive Toggle for Student vs Tutor */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-[#1C0307] border-2 border-[#E11D48]/40 shadow-[0_0_25px_rgba(0,0,0,0.8)]">
            <button
              onClick={() => setActiveTab("student")}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === "student"
                  ? "bg-[#E11D48] text-white shadow-[0_0_20px_rgba(225,29,72,0.6)]"
                  : "text-[#BFA5AA] hover:text-white"
              }`}
            >
              For Students &amp; Guardians
            </button>
            <button
              onClick={() => setActiveTab("tutor")}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === "tutor"
                  ? "bg-[#E11D48] text-white shadow-[0_0_20px_rgba(225,29,72,0.6)]"
                  : "text-[#BFA5AA] hover:text-white"
              }`}
            >
              For Tutors &amp; Mentors
            </button>
          </div>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-[#1A0306]/90 border border-[#E11D48]/30 p-6 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.7),_inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-[#FF1E40] hover:shadow-[0_0_30px_rgba(225,29,72,0.4)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Step Tag */}
                <div className="flex items-center justify-between pb-4 border-b border-[#E11D48]/20">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF1E40] uppercase">
                    {item.tag}
                  </span>
                  <span className="text-xl font-mono font-black text-white/30 group-hover:text-[#FF1E40] transition-colors">
                    {item.step}
                  </span>
                </div>

                {/* Step Icon */}
                <div className="my-6">
                  <div className="h-14 w-14 rounded-xl bg-[#2D060C] border border-[#FF1E40]/50 text-white flex items-center justify-center shadow-[0_0_15px_rgba(255,30,64,0.3)] group-hover:scale-110 group-hover:bg-[#E11D48] transition-all duration-300">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                </div>

                {/* Step Text */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#FF1E40] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#F4E2E5]/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Step Indicator */}
                <div className="mt-6 pt-4 border-t border-[#E11D48]/20 flex items-center gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-[#2D060C] overflow-hidden">
                    <div
                      className="h-full bg-[#FF1E40] rounded-full transition-all duration-500"
                      style={{ width: `${(idx + 1) * 25}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[#BFA5AA]">
                    {(idx + 1) * 25}%
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
