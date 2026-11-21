import HeroBanner from "@/components/home/HeroBanner";
import FeaturedTuitions from "@/components/home/FeaturedTuitions";
import HowItWorks from "@/components/home/HowItWorks";
import TopMentors from "@/components/home/TopMentors";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0E0203] text-white overflow-hidden">
      
      {/* ========================================================================= */}
      {/* CINEMATIC ATMOSPHERIC BACKDROP ARCHITECTURE (Chainsaw Man Noir/Crimson)    */}
      {/* ========================================================================= */}
      
      {/* Ambient Radial Spotlight Blooms across Page */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.32)_0%,_rgba(136,8,22,0.18)_45%,_transparent_75%)] blur-3xl pointer-events-none" />
      <div className="absolute top-[35%] -left-48 w-[600px] h-[600px] bg-[#E11D48]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[65%] -right-48 w-[600px] h-[600px] bg-[#880816]/18 rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle Texture Grid for High-Tech / Cinematic Feel */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#FF1E40 1px, transparent 1px), linear-gradient(90deg, #FF1E40 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Vignette Edge Shading for Maximum Contrast & Immersion */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_50%,_rgba(10,2,3,0.85)_100%)] pointer-events-none" />

      {/* ========================================================================= */}
      {/* MODULAR LANDING PAGE SECTIONS                                             */}
      {/* ========================================================================= */}
      
      {/* 1. Hero Banner with Live Search & Interactive Mentor Preview */}
      <HeroBanner />

      {/* 2. Featured & Dynamic Tuition Posts (Strict Schema Compliant) */}
      <FeaturedTuitions />

      {/* 3. 4-Step Logical Workflow (Student vs. Tutor Tabs) */}
      <HowItWorks />

      {/* 4. Top Verified Mentors (BUET, DU, Medical, IBA) */}
      <TopMentors />

      {/* 5. Transparent Pricing & Pro Plans (Quota & Stripe Integration) */}
      <PricingSection />

      {/* 6. FAQ Accordion */}
      <FAQSection />

      {/* 7. Final Conversion Call-to-Action Banner */}
      <CallToAction />

    </div>
  );
}
