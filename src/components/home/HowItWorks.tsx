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
    <section id="how-it-works" className="relative py-24 bg-[#F8FAFC] dark:bg-[#07101E] overflow-hidden border-t border-[#E2E8F0] dark:border-[#0284C7]/20 transition-colors duration-200">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(224, 242, 254,0.85)_0%,_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(2, 132, 199,0.18)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#BAE6FD] dark:border-[#0284C7]/40 bg-[#FFFFFF] dark:bg-[#0D1D38]/80 px-4 py-1.5 mb-4 shadow-[0_4px_16px_rgba(2, 132, 199,0.12)] dark:shadow-[0_0_20px_rgba(2, 132, 199,0.25)]">
            <span className="h-2 w-2 rounded-full bg-[#0284C7] dark:bg-[#0EA5E9] animate-pulse shadow-[0_0_8px_#0284C7] dark:shadow-[0_0_8px_#0EA5E9]" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0B1320] dark:text-white">
              SEAMLESS 4-STEP WORKFLOW
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1320] dark:text-white uppercase tracking-tight">
            How MentorLagbe <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#0369A1] dark:from-white dark:via-[#38BDF8] dark:to-[#0EA5E9] drop-shadow-[0_0_16px_rgba(2, 132, 199,0.25)] dark:drop-shadow-[0_0_25px_rgba(14, 165, 233,0.6)]">Works</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#475569] dark:text-[#E2E8F0]/80 leading-relaxed">
            Transparent, zero-middleman connection built for students aiming for academic excellence and verified educators sharing their passion.
          </p>

          {/* Interactive Toggle for Student vs Tutor */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-[#F0F7FF] dark:bg-[#0D1D38] border-2 border-[#E2E8F0] dark:border-[#0284C7]/40 shadow-sm dark:shadow-[0_0_25px_rgba(0,0,0,0.8)]">
            <button
              onClick={() => setActiveTab("student")}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === "student"
                  ? "bg-[#0284C7] text-white shadow-[0_4px_16px_rgba(2, 132, 199,0.35)] dark:shadow-[0_0_20px_rgba(2, 132, 199,0.6)]"
                  : "text-[#475569] hover:text-[#0B1320] dark:text-[#94A3B8] dark:hover:text-white"
              }`}
            >
              For Students &amp; Guardians
            </button>
            <button
              onClick={() => setActiveTab("tutor")}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === "tutor"
                  ? "bg-[#0284C7] text-white shadow-[0_4px_16px_rgba(2, 132, 199,0.35)] dark:shadow-[0_0_20px_rgba(2, 132, 199,0.6)]"
                  : "text-[#475569] hover:text-[#0B1320] dark:text-[#94A3B8] dark:hover:text-white"
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
                className="group relative rounded-2xl bg-[#FFFFFF] dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/30 p-6 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(11,19,32,0.06),_0_0_0_1px_rgba(186,230,253,0.25)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.7),_inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-[#0284C7] dark:hover:border-[#0EA5E9] hover:shadow-[0_16px_36px_-6px_rgba(2,132,199,0.2),_0_0_20px_rgba(2,132,199,0.12)] dark:hover:shadow-[0_0_30px_rgba(2,132,199,0.4)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Step Tag */}
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] dark:border-[#0284C7]/20">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#0284C7] dark:text-[#0EA5E9] uppercase">
                    {item.tag}
                  </span>
                  <span className="text-xl font-mono font-black text-[#64748B]/40 dark:text-white/30 group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] transition-colors">
                    {item.step}
                  </span>
                </div>

                {/* Step Icon */}
                <div className="my-6">
                  <div className="h-14 w-14 rounded-xl bg-[#F0F7FF] dark:bg-[#0C4A6E] border border-[#BAE6FD] dark:border-[#0EA5E9]/50 text-[#0284C7] dark:text-white flex items-center justify-center shadow-[0_4px_14px_rgba(2, 132, 199,0.12)] dark:shadow-[0_0_15px_rgba(14, 165, 233,0.3)] group-hover:scale-110 group-hover:bg-[#0284C7] dark:group-hover:bg-[#0284C7] transition-all duration-300">
                    <Icon className="h-7 w-7 text-[#0284C7] dark:text-white group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Step Text */}
                <div>
                  <h3 className="text-lg font-bold text-[#0B1320] dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#475569] dark:text-[#E2E8F0]/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Step Indicator */}
                <div className="mt-6 pt-4 border-t border-[#E2E8F0] dark:border-[#0284C7]/20 flex items-center gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-[#F0F7FF] dark:bg-[#0C4A6E] overflow-hidden">
                    <div
                      className="h-full bg-[#0284C7] dark:bg-[#0EA5E9] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(2, 132, 199,0.4)]"
                      style={{ width: `${(idx + 1) * 25}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8]">
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
