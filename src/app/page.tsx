import HeroBanner from "@/components/home/HeroBanner";
import FeaturedTuitions from "@/components/home/FeaturedTuitions";
import HowItWorks from "@/components/home/HowItWorks";
import TopSubjectsAndStats from "@/components/home/TopSubjectsAndStats";
import TopMentors from "@/components/home/TopMentors";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#FAF5F6] text-[#180205] dark:bg-[#0E0203] dark:text-white overflow-hidden transition-colors duration-200">
      
      {/* ========================================================================= */}
      {/* CINEMATIC ATMOSPHERIC BACKDROP ARCHITECTURE (Chainsaw Man Noir/Crimson)    */}
      {/* ========================================================================= */}
      
      {/* Ambient Radial Spotlight Blooms across Page */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.32)_0%,_rgba(136,8,22,0.18)_45%,_transparent_75%)] blur-3xl pointer-events-none dark:opacity-100 opacity-30" />
      <div className="absolute top-[35%] -left-48 w-[600px] h-[600px] bg-[#E11D48]/10 rounded-full blur-[160px] pointer-events-none dark:opacity-100 opacity-20" />
      <div className="absolute top-[65%] -right-48 w-[600px] h-[600px] bg-[#880816]/18 rounded-full blur-[160px] pointer-events-none dark:opacity-100 opacity-20" />

      {/* Subtle Texture Grid for High-Tech / Cinematic Feel */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#FF1E40 1px, transparent 1px), linear-gradient(90deg, #FF1E40 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Vignette Edge Shading for Maximum Contrast & Immersion in Dark Mode */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_50%,_rgba(10,2,3,0.85)_100%)] pointer-events-none dark:block hidden" />

      {/* ========================================================================= */}
      {/* 5 CORE HOME PAGE SECTIONS (STRICT COMPLIANCE)                              */}
      {/* ========================================================================= */}
      
      {/* 1. Hero / Banner Section with Engaging Headline, Search Form & Live Preview */}
      <HeroBanner />

      {/* 2. Dynamic Featured Tuitions Section (6 Latest Approved & Active Listings) */}
      <FeaturedTuitions />

      {/* 3. Extra Section 1 — How MentorLagbe Works (4-Step Workflow for Students & Tutors) */}
      <HowItWorks />

      {/* 4. Extra Section 2 — Top Subjects, Platform Statistics & Real Testimonials */}
      <TopSubjectsAndStats />

      {/* Verified Mentor Showcase */}
      <TopMentors />

      {/* 5. Pricing / Subscription Section (Free vs. Pro with 'Subscribe with Stripe' CTA) */}
      <PricingSection />

      {/* Community FAQ Accordion */}
      <FAQSection />

      {/* Final Conversion Call-to-Action Banner */}
      <CallToAction />

    </div>
  );
}
