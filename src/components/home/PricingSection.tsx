"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, Zap, Shield, ArrowRight } from "lucide-react";

export default function PricingSection() {
  const [roleMode, setRoleMode] = useState<"tutor" | "student">("tutor");

  return (
    <section id="pricing" className="relative py-24 bg-[#110204] overflow-hidden border-t border-[#E11D48]/20">
      {/* Cinematic Central Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.22)_0%,_transparent_75%)] blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E11D48]/40 bg-[#1C0307]/80 px-4 py-1.5 mb-4 shadow-[0_0_20px_rgba(225,29,72,0.25)]">
            <Zap className="h-3.5 w-3.5 text-[#FF1E40]" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-white">
              TRANSPARENT PRICING // ZERO COMMISSION
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Flexible Plans for <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF4D6D] to-[#FF1E40] drop-shadow-[0_0_25px_rgba(255,30,64,0.6)]">Every Need</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#F4E2E5]/80 leading-relaxed">
            Start completely free or unlock unlimited reach with Pro. No hidden cuts, no commission fees on student payments.
          </p>

          {/* Role Mode Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-[#1C0307] border-2 border-[#E11D48]/40 shadow-[0_0_25px_rgba(0,0,0,0.8)]">
            <button
              onClick={() => setRoleMode("tutor")}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                roleMode === "tutor"
                  ? "bg-[#E11D48] text-white shadow-[0_0_20px_rgba(225,29,72,0.6)]"
                  : "text-[#BFA5AA] hover:text-white"
              }`}
            >
              Tutor Plans
            </button>
            <button
              onClick={() => setRoleMode("student")}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                roleMode === "student"
                  ? "bg-[#E11D48] text-white shadow-[0_0_20px_rgba(225,29,72,0.6)]"
                  : "text-[#BFA5AA] hover:text-white"
              }`}
            >
              Student Plans
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Card 1: Free Plan */}
          <div className="relative rounded-2xl bg-[#180306]/85 border border-[#E11D48]/30 p-8 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.7),_inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E11D48]/20">
                <span className="text-xs font-mono font-bold tracking-widest text-[#BFA5AA] uppercase">
                  STARTER TIER
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#240408] border border-[#E11D48]/30 text-[10px] font-mono text-[#F4E2E5]">
                  FREE FOREVER
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-2xl font-bold text-white">Free Plan</h3>
                <p className="mt-1 text-xs sm:text-sm text-[#F4E2E5]/70">
                  {roleMode === "tutor"
                    ? "Ideal for individual tutors starting their mentorship journey."
                    : "Perfect for students searching for their first batch."}
                </p>
                
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black font-mono text-white">৳0</span>
                  <span className="text-xs font-mono text-[#BFA5AA]">/ lifetime</span>
                </div>
              </div>

              {/* Feature List */}
              <ul className="mt-8 space-y-3.5 text-xs sm:text-sm text-[#F4E2E5]/85">
                {roleMode === "tutor" ? (
                  <>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-[#FF1E40] shrink-0" />
                      <span>Post up to <strong>2 Tuitions</strong></span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-[#FF1E40] shrink-0" />
                      <span>Standard Profile Listing</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-[#FF1E40] shrink-0" />
                      <span>Tutor Dashboard &amp; Applicant Inbox</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-[#FF1E40] shrink-0" />
                      <span>Zero Commission on Fee</span>
                    </li>
                    <li className="flex items-center gap-3 text-[#BFA5AA]/50 line-through">
                      <span className="h-4 w-4 shrink-0 text-center">•</span>
                      <span>Featured Mentor Glowing Badge</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-[#FF1E40] shrink-0" />
                      <span>Bookmark up to <strong>5 Tuitions</strong></span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-[#FF1E40] shrink-0" />
                      <span>Search &amp; Filter All Mentors</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-[#FF1E40] shrink-0" />
                      <span>Standard Tuition Application</span>
                    </li>
                    <li className="flex items-center gap-3 text-[#BFA5AA]/50 line-through">
                      <span className="h-4 w-4 shrink-0 text-center">•</span>
                      <span>Priority Applicant Highlight</span>
                    </li>
                    <li className="flex items-center gap-3 text-[#BFA5AA]/50 line-through">
                      <span className="h-4 w-4 shrink-0 text-center">•</span>
                      <span>Instant WhatsApp Status Alerts</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="mt-10">
              <Link
                href="/register"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-[#E11D48]/40 bg-[#240408] hover:bg-[#35070E] hover:border-white text-white text-xs sm:text-sm font-bold tracking-wide transition-all"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Pro Plan (Highlighted Cinematic Card) */}
          <div className="relative rounded-2xl bg-[#200408] border-2 border-[#FF1E40] p-8 shadow-[0_0_40px_rgba(255,30,64,0.35),_inset_0_1px_0_rgba(255,255,255,0.2)] flex flex-col justify-between">
            {/* Pro Floating Ribbon */}
            <div className="absolute -top-3.5 right-6">
              <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#E11D48] to-[#FF1E40] text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(255,30,64,0.9)] flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" />
                <span>RECOMMENDED</span>
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E11D48]/30">
                <span className="text-xs font-mono font-bold tracking-widest text-[#FF1E40] uppercase">
                  UNLIMITED MASTERY
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E11D48]/20 border border-[#FF1E40]/50 text-[10px] font-mono font-bold text-[#FF1E40]">
                  STRIPE POWERED
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-2xl font-bold text-white">
                  {roleMode === "tutor" ? "Tutor Pro" : "Student Pro"}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#F4E2E5]/80">
                  {roleMode === "tutor"
                    ? "Maximized exposure, unlimited posts, and priority student leads."
                    : "Unlimited bookmarks, priority highlight, and instant alerts."}
                </p>
                
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black font-mono text-[#FF1E40] glow-scarlet">
                    {roleMode === "tutor" ? "৳499" : "৳299"}
                  </span>
                  <span className="text-xs font-mono text-[#BFA5AA]">/ month</span>
                </div>
              </div>

              {/* Feature List */}
              <ul className="mt-8 space-y-3.5 text-xs sm:text-sm text-white">
                {roleMode === "tutor" ? (
                  <>
                    <li className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#E11D48] flex items-center justify-center shrink-0 shadow-[0_0_8px_#FF1E40]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="font-semibold"><strong>Unlimited</strong> Tuition Postings</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#E11D48] flex items-center justify-center shrink-0 shadow-[0_0_8px_#FF1E40]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span><strong>Featured Mentor</strong> Glowing Badge</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#E11D48] flex items-center justify-center shrink-0 shadow-[0_0_8px_#FF1E40]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span>Top Placement in Search Results</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#E11D48] flex items-center justify-center shrink-0 shadow-[0_0_8px_#FF1E40]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span>Direct Student Contact Access</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#E11D48] flex items-center justify-center shrink-0 shadow-[0_0_8px_#FF1E40]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span>0% Platform Commission Fee</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#E11D48] flex items-center justify-center shrink-0 shadow-[0_0_8px_#FF1E40]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="font-semibold"><strong>Unlimited</strong> Tuition Bookmarks</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#E11D48] flex items-center justify-center shrink-0 shadow-[0_0_8px_#FF1E40]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span><strong>Priority Applicant</strong> Highlight to Tutors</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#E11D48] flex items-center justify-center shrink-0 shadow-[0_0_8px_#FF1E40]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span>Instant WhatsApp Status Notifications</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#E11D48] flex items-center justify-center shrink-0 shadow-[0_0_8px_#FF1E40]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span>Early Access to New Tuition Openings</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="mt-10">
              <Link
                href="/pricing"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#E11D48] hover:bg-[#FF1E40] text-white text-xs sm:text-sm font-bold tracking-wide shadow-[0_0_25px_rgba(255,30,64,0.7)] hover:shadow-[0_0_35px_rgba(255,30,64,0.95)] transition-all cursor-pointer active:scale-95"
              >
                <span>Upgrade via Stripe Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
