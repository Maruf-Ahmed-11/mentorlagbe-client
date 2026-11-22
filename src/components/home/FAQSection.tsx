"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How does MentorLagbe verify its tutors?",
    answer:
      "All tutors must submit valid student ID cards from accredited universities (BUET, DU, Medical Colleges, etc.) or government NID cards. Our admin moderation team manually reviews credentials, academic history, and contact information before granting the verified tutor status.",
  },
  {
    question: "Is there any commission taken from the tutor's monthly salary?",
    answer:
      "No! MentorLagbe is proud to offer a 0% commission model. Tutors receive 100% of their tuition fees agreed with students or parents. We earn solely through optional Pro subscription plans and featured promotion tiers.",
  },
  {
    question: "What is the difference between the Free and Pro plans?",
    answer:
      "Free Tutors can post up to 2 active tuition listings, while Pro Tutors (৳499/mo) can post unlimited listings, receive a 'Featured Mentor' badge, top search placement, and direct student contact numbers. Free Students can save up to 5 bookmarks, while Student Pro (৳299/mo) unlocks unlimited bookmarks, priority applicant highlights, and WhatsApp status updates.",
  },
  {
    question: "Can I take both Online and Offline tuitions?",
    answer:
      "Yes. Tutors can specify whether their tuition batch is Online (conducted via Zoom, Google Meet, or live interactive platforms) or Offline (home tutoring in specific neighborhoods like Dhanmondi, Uttara, Banani, Mirpur, or other districts across Bangladesh).",
  },
  {
    question: "How does the application and trial session work?",
    answer:
      "Students browse approved listings, click 'Apply Now', and submit their schedule preferences. The tutor receives the inquiry directly in their Tutor Dashboard and can accept or decline. Upon acceptance, both parties coordinate a free demo session to ensure mutual fit before starting.",
  },
  {
    question: "How are Pro subscriptions paid and handled?",
    answer:
      "All Pro upgrades are securely processed using Stripe Checkout. Once the payment succeeds, the Stripe Webhook automatically logs the transaction in our payments database and instantaneously activates your Pro tier features.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative py-20 bg-[#FCF9F8] dark:bg-[#0E0203] overflow-hidden border-t border-[#EADCDD] dark:border-[#E11D48]/20 transition-colors duration-200">
      {/* Background Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[radial-gradient(ellipse_at_center,_rgba(247,232,234,0.85)_0%,_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.15)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F2B8C4] dark:border-[#E11D48]/40 bg-[#FFFFFF] dark:bg-[#1C0307]/80 px-3.5 py-1.5 mb-3 shadow-[0_4px_16px_rgba(217,30,72,0.12)] dark:shadow-[0_0_15px_rgba(225,29,72,0.25)]">
            <HelpCircle className="h-3.5 w-3.5 text-[#D91E48] dark:text-[#FF1E40]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#180C0E] dark:text-white">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#180C0E] dark:text-white uppercase tracking-tight">
            Got <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D91E48] via-[#FF1E40] to-[#B31438] dark:from-white dark:via-[#FF4D6D] dark:to-[#FF1E40] drop-shadow-[0_0_16px_rgba(217,30,72,0.25)] dark:drop-shadow-[0_0_20px_rgba(255,30,64,0.6)]">Questions?</span>
          </h2>
          <p className="mt-2 text-sm text-[#5C494C] dark:text-[#F4E2E5]/80">
            Everything you need to know about Bangladesh&apos;s leading tuition ecosystem.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#FFFFFF] dark:bg-[#180306]/85 border border-[#EADCDD] dark:border-[#E11D48]/30 shadow-[0_8px_24px_-4px_rgba(24,12,14,0.05),_0_0_0_1px_rgba(242,184,196,0.2)] dark:shadow-none hover:border-[#D91E48] dark:hover:border-[#FF1E40] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-[#180C0E] hover:text-[#D91E48] dark:text-white dark:hover:text-[#FF1E40] transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.question}</span>
                  <div
                    className={`h-7 w-7 rounded-lg bg-[#F5ECEC] dark:bg-[#2D060C] border border-[#F2B8C4] dark:border-[#FF1E40]/50 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#D91E48] text-white dark:bg-[#E11D48]" : "text-[#180C0E] dark:text-white"
                    }`}
                  >
                    <ChevronDown className={`h-4 w-4 ${isOpen ? "text-white" : "text-[#180C0E] dark:text-white"}`} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C494C] dark:text-[#F4E2E5]/80 leading-relaxed border-t border-[#EADCDD] dark:border-[#E11D48]/15 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
