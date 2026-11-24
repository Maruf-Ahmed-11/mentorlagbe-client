"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, Sparkles, Zap, Shield, ArrowRight, CheckCircle2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function PricingSection() {
  const [roleMode, setRoleMode] = useState<"tutor" | "student">("tutor");
  const { data: session } = authClient.useSession();
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    try {
      const cached = JSON.parse(localStorage.getItem("mentorlagbe_cached_user") || "null");
      const plan = ((session?.user as any)?.plan || cached?.plan || "free").toLowerCase();
      if (plan === "pro") setIsPro(true);
    } catch {}

    const email = session?.user?.email;
    if (!email) return;

    fetch(`/api/user/usage?email=${encodeURIComponent(email)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.plan === "pro") setIsPro(true);
      })
      .catch(() => {});
  }, [session?.user?.email]);

  return (
    <section id="pricing" className="relative py-24 bg-[#F8FAFC] dark:bg-[#07101E] overflow-hidden border-t border-[#E2E8F0] dark:border-[#0284C7]/20 transition-colors duration-200">
      {/* Cinematic Central Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_center,_rgba(224, 242, 254,0.85)_0%,_transparent_75%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(2, 132, 199,0.22)_0%,_transparent_75%)] blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#BAE6FD] dark:border-[#0284C7]/40 bg-[#FFFFFF] dark:bg-[#0D1D38]/80 px-4 py-1.5 mb-4 shadow-[0_4px_16px_rgba(2, 132, 199,0.12)] dark:shadow-[0_0_20px_rgba(2, 132, 199,0.25)]">
            <Zap className="h-3.5 w-3.5 text-[#0284C7] dark:text-[#0EA5E9]" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0B1320] dark:text-white">
              TRANSPARENT PRICING // ZERO COMMISSION
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1320] dark:text-white uppercase tracking-tight">
            Flexible Plans for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#0369A1] dark:from-white dark:via-[#38BDF8] dark:to-[#0EA5E9] drop-shadow-[0_0_16px_rgba(2, 132, 199,0.25)] dark:drop-shadow-[0_0_25px_rgba(14, 165, 233,0.6)]">Every Need</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#475569] dark:text-[#E2E8F0]/80 leading-relaxed">
            Start completely free or unlock unlimited reach with Pro. No hidden cuts, no commission fees on student payments.
          </p>

          {/* Role Mode Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-[#F0F7FF] dark:bg-[#0D1D38] border-2 border-[#E2E8F0] dark:border-[#0284C7]/40 shadow-sm dark:shadow-[0_0_25px_rgba(0,0,0,0.8)]">
            <button
              onClick={() => setRoleMode("tutor")}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                roleMode === "tutor"
                  ? "bg-[#0284C7] text-white shadow-[0_4px_16px_rgba(2, 132, 199,0.35)] dark:shadow-[0_0_20px_rgba(2, 132, 199,0.6)]"
                  : "text-[#475569] hover:text-[#0B1320] dark:text-[#94A3B8] dark:hover:text-white"
              }`}
            >
              Tutor Plans
            </button>
            <button
              onClick={() => setRoleMode("student")}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                roleMode === "student"
                  ? "bg-[#0284C7] text-white shadow-[0_4px_16px_rgba(2, 132, 199,0.35)] dark:shadow-[0_0_20px_rgba(2, 132, 199,0.6)]"
                  : "text-[#475569] hover:text-[#0B1320] dark:text-[#94A3B8] dark:hover:text-white"
              }`}
            >
              Student Plans
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Card 1: Free Plan */}
          <div className="relative rounded-2xl bg-[#FFFFFF] dark:bg-[#0B1930]/85 border border-[#E2E8F0] dark:border-[#0284C7]/30 p-8 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06),_0_0_0_1px_rgba(186, 230, 253,0.25)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.7),_inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] dark:border-[#0284C7]/20">
                <span className="text-xs font-mono font-bold tracking-widest text-[#64748B] dark:text-[#94A3B8] uppercase">
                  STARTER TIER
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F0F7FF] dark:bg-[#102547] border border-[#E2E8F0] dark:border-[#0284C7]/30 text-[10px] font-mono text-[#475569] dark:text-[#E2E8F0]">
                  FREE FOREVER
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-2xl font-bold text-[#0B1320] dark:text-white">Free Plan</h3>
                <p className="mt-1 text-xs sm:text-sm text-[#475569] dark:text-[#E2E8F0]/70">
                  {roleMode === "tutor"
                    ? "Ideal for individual tutors starting their mentorship journey."
                    : "Perfect for students searching for their first batch."}
                </p>
                
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black font-mono text-[#0B1320] dark:text-white">৳0</span>
                  <span className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">/ lifetime</span>
                </div>
              </div>

              {/* Feature List */}
              <ul className="mt-8 space-y-3.5 text-xs sm:text-sm text-[#475569] dark:text-[#E2E8F0]/85">
                {roleMode === "tutor" ? (
                  <>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-[#0284C7] dark:text-[#0EA5E9] shrink-0" />
                      <span>Post up to <strong>2 Tuitions</strong></span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-[#0284C7] dark:text-[#0EA5E9] shrink-0" />
                      <span>Standard Profile Listing</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-[#0284C7] dark:text-[#0EA5E9] shrink-0" />
                      <span>Tutor Dashboard &amp; Applicant Inbox</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-[#0284C7] dark:text-[#0EA5E9] shrink-0" />
                      <span>Zero Commission on Fee</span>
                    </li>
                    <li className="flex items-center gap-3 text-[#64748B]/50 dark:text-[#94A3B8]/50 line-through">
                      <span className="h-4 w-4 shrink-0 text-center">•</span>
                      <span>Featured Mentor Glowing Badge</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-[#0284C7] dark:text-[#0EA5E9] shrink-0" />
                      <span>Bookmark up to <strong>5 Tuitions</strong></span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-[#0284C7] dark:text-[#0EA5E9] shrink-0" />
                      <span>Search &amp; Filter All Mentors</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-[#0284C7] dark:text-[#0EA5E9] shrink-0" />
                      <span>Standard Tuition Application</span>
                    </li>
                    <li className="flex items-center gap-3 text-[#64748B]/50 dark:text-[#94A3B8]/50 line-through">
                      <span className="h-4 w-4 shrink-0 text-center">•</span>
                      <span>Priority Applicant Highlight</span>
                    </li>
                    <li className="flex items-center gap-3 text-[#64748B]/50 dark:text-[#94A3B8]/50 line-through">
                      <span className="h-4 w-4 shrink-0 text-center">•</span>
                      <span>Instant WhatsApp Status Alerts</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="mt-10">
              <Link
                href="/sign-up"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-[#E2E8F0] bg-[#F0F7FF] hover:bg-[#E2E8F0] text-[#0B1320] dark:border-[#0284C7]/40 dark:bg-[#102547] dark:hover:bg-[#102547] dark:hover:border-white dark:text-white text-xs sm:text-sm font-bold tracking-wide transition-all"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Pro Plan (Highlighted Cinematic Card) */}
          <div className="relative rounded-2xl bg-[#FFFFFF] dark:bg-[#0D1D38] border-2 border-[#0284C7] dark:border-[#0EA5E9] p-8 shadow-[0_16px_40px_-6px_rgba(2, 132, 199,0.22),_0_0_24px_rgba(2, 132, 199,0.15)] dark:shadow-[0_0_40px_rgba(14, 165, 233,0.35),_inset_0_1px_0_rgba(255,255,255,0.2)] flex flex-col justify-between">
            {/* Pro Floating Ribbon */}
            <div className="absolute -top-3.5 right-6">
              <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-[0_4px_16px_rgba(2, 132, 199,0.4)] dark:shadow-[0_0_15px_rgba(14, 165, 233,0.9)] flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" />
                <span>RECOMMENDED</span>
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#BAE6FD] dark:border-[#0284C7]/30">
                <span className="text-xs font-mono font-bold tracking-widest text-[#0284C7] dark:text-[#0EA5E9] uppercase">
                  UNLIMITED MASTERY
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F0F7FF] dark:bg-[#0284C7]/20 border border-[#BAE6FD] dark:border-[#0EA5E9]/50 text-[10px] font-mono font-bold text-[#0284C7] dark:text-[#0EA5E9]">
                  STRIPE POWERED
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-2xl font-bold text-[#0B1320] dark:text-white">
                  {roleMode === "tutor" ? "Tutor Pro" : "Student Pro"}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#475569] dark:text-[#E2E8F0]/80">
                  {roleMode === "tutor"
                    ? "Maximized exposure, unlimited posts, and priority student leads."
                    : "Unlimited bookmarks, priority highlight, and instant alerts."}
                </p>
                
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black font-mono text-[#0284C7] dark:text-[#0EA5E9] drop-shadow-[0_0_12px_rgba(2, 132, 199,0.25)]">
                    {roleMode === "tutor" ? "$15" : "$10"}
                  </span>
                  <span className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">/ month</span>
                </div>
              </div>

              {/* Feature List */}
              <ul className="mt-8 space-y-3.5 text-xs sm:text-sm text-[#0B1320] dark:text-white">
                {roleMode === "tutor" ? (
                  <>
                    <li className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#0284C7] dark:bg-[#0284C7] flex items-center justify-center shrink-0 shadow-[0_0_8px_#0284C7] dark:shadow-[0_0_8px_#0EA5E9]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="font-semibold"><strong>Unlimited</strong> Tuition Postings</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#0284C7] dark:bg-[#0284C7] flex items-center justify-center shrink-0 shadow-[0_0_8px_#0284C7] dark:shadow-[0_0_8px_#0EA5E9]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span><strong>Featured Mentor</strong> Glowing Badge</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#0284C7] dark:bg-[#0284C7] flex items-center justify-center shrink-0 shadow-[0_0_8px_#0284C7] dark:shadow-[0_0_8px_#0EA5E9]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span>Top Placement in Search Results</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#0284C7] dark:bg-[#0284C7] flex items-center justify-center shrink-0 shadow-[0_0_8px_#0284C7] dark:shadow-[0_0_8px_#0EA5E9]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span>Direct Student Contact Access</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#0284C7] dark:bg-[#0284C7] flex items-center justify-center shrink-0 shadow-[0_0_8px_#0284C7] dark:shadow-[0_0_8px_#0EA5E9]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span>0% Platform Commission Fee</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#0284C7] dark:bg-[#0284C7] flex items-center justify-center shrink-0 shadow-[0_0_8px_#0284C7] dark:shadow-[0_0_8px_#0EA5E9]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="font-semibold"><strong>Unlimited</strong> Tuition Bookmarks</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#0284C7] dark:bg-[#0284C7] flex items-center justify-center shrink-0 shadow-[0_0_8px_#0284C7] dark:shadow-[0_0_8px_#0EA5E9]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span><strong>Priority Applicant</strong> Highlight to Tutors</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#0284C7] dark:bg-[#0284C7] flex items-center justify-center shrink-0 shadow-[0_0_8px_#0284C7] dark:shadow-[0_0_8px_#0EA5E9]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span>Instant WhatsApp Status Notifications</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#0284C7] dark:bg-[#0284C7] flex items-center justify-center shrink-0 shadow-[0_0_8px_#0284C7] dark:shadow-[0_0_8px_#0EA5E9]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span>Early Access to New Tuition Openings</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="mt-10">
              {isPro ? (
                <button
                  type="button"
                  disabled
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-100 dark:bg-[#0A2618] text-emerald-800 dark:text-[#10B981] border border-emerald-300 dark:border-[#10B981]/50 text-xs sm:text-sm font-bold tracking-wide opacity-80 cursor-not-allowed"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Already Subscribed &bull; Pro Active</span>
                </button>
              ) : (
                <Link
                  href={`/checkout?plan=${roleMode}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs sm:text-sm font-bold tracking-wide shadow-[0_6px_20px_rgba(2, 132, 199,0.4)] hover:shadow-[0_8px_25px_rgba(2, 132, 199,0.55)] dark:bg-[#0284C7] dark:hover:bg-[#0EA5E9] dark:shadow-[0_0_25px_rgba(14, 165, 233,0.7)] transition-all cursor-pointer active:scale-95"
                >
                  <span>Upgrade to Pro with Stripe</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
