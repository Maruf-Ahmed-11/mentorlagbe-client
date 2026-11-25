import type { Metadata } from "next";
import PricingSection from "@/components/home/PricingSection";

export const metadata: Metadata = {
  title: "Pricing & Pro Plans | MentorLagbe",
  description:
    "Explore Free and Pro subscription plans for Tutors and Students on MentorLagbe.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#050B14]">
      <PricingSection />
    </main>
  );
}
