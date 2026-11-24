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
    <section className="relative py-20 bg-[#F8FAFC] dark:bg-[#050B14] overflow-hidden border-t border-[#E2E8F0] dark:border-[#0284C7]/20 transition-colors duration-200">
      {/* Background Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[radial-gradient(ellipse_at_center,_rgba(224, 242, 254,0.85)_0%,_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(2, 132, 199,0.15)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#BAE6FD] dark:border-[#0284C7]/40 bg-[#FFFFFF] dark:bg-[#0D1D38]/80 px-3.5 py-1.5 mb-3 shadow-[0_4px_16px_rgba(2, 132, 199,0.12)] dark:shadow-[0_0_15px_rgba(2, 132, 199,0.25)]">
            <HelpCircle className="h-3.5 w-3.5 text-[#0284C7] dark:text-[#0EA5E9]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B1320] dark:text-white">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1320] dark:text-white uppercase tracking-tight">
            Got <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#0369A1] dark:from-white dark:via-[#38BDF8] dark:to-[#0EA5E9] drop-shadow-[0_0_16px_rgba(2, 132, 199,0.25)] dark:drop-shadow-[0_0_20px_rgba(14, 165, 233,0.6)]">Questions?</span>
          </h2>
          <p className="mt-2 text-sm text-[#475569] dark:text-[#E2E8F0]/80">
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
                className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0B1930]/85 border border-[#E2E8F0] dark:border-[#0284C7]/30 shadow-[0_8px_24px_-4px_rgba(11, 19, 32,0.05),_0_0_0_1px_rgba(186, 230, 253,0.2)] dark:shadow-none hover:border-[#0284C7] dark:hover:border-[#0EA5E9] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-[#0B1320] hover:text-[#0284C7] dark:text-white dark:hover:text-[#0EA5E9] transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.question}</span>
                  <div
                    className={`h-7 w-7 rounded-lg bg-[#F0F7FF] dark:bg-[#0C4A6E] border border-[#BAE6FD] dark:border-[#0EA5E9]/50 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#0284C7] text-white dark:bg-[#0284C7]" : "text-[#0B1320] dark:text-white"
                    }`}
                  >
                    <ChevronDown className={`h-4 w-4 ${isOpen ? "text-white" : "text-[#0B1320] dark:text-white"}`} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#475569] dark:text-[#E2E8F0]/80 leading-relaxed border-t border-[#E2E8F0] dark:border-[#0284C7]/15 animate-fadeIn">
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
