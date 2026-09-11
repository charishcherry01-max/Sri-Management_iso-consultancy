"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How long does the end-to-end ISO certification process take?",
    answer: "Depending on your company's headcount, operational complexity, and existing documentation, the full certification journey typically takes between 4 to 12 weeks. With Sri Management's AI-assisted document drafting and rapid gap closure, small-to-midsize businesses can achieve audit readiness in as fast as 3 to 4 weeks."
  },
  {
    question: "What is the validity period of an ISO certificate?",
    answer: "All accredited ISO certificates are issued with a validity of 3 years. To maintain active certification status, your organization must complete annual surveillance audits at the end of Year 1 and Year 2, followed by a formal re-certification audit at the end of Year 3. Sri Management manages this entire lifecycle on your behalf."
  },
  {
    question: "Which ISO standard is best suited for my business?",
    answer: "ISO 9001 (Quality Management) is universally applicable to any business seeking operational excellence and tender eligibility. IT and SaaS firms prioritize ISO 27001 (Information Security) and ISO 42001 (AI Management). Manufacturing and heavy industry prioritize ISO 14001 (Environmental) and ISO 45001 (Occupational Health & Safety), while clinical facilities require ISO 15189 (Medical Laboratories). You can speak with our lead advisors to map the exact standard to your business goals."
  },
  {
    question: "Does Sri Management issue the final certification?",
    answer: "In accordance with international accreditation guidelines (such as ISO/IEC 17021), consulting firms cannot certify their own advisory work to preserve impartiality. Sri Management acts as your expert advisory and lead auditor partner—we design your procedures, conduct internal audits, and guide your team through Stage 1 & Stage 2 audits with independent, globally recognized certification bodies (IAF & NABCB recognized) until issuance."
  },
  {
    question: "Can the consultation and training be delivered completely remotely?",
    answer: "Yes, 100%. We support fully remote digital implementations for clients across India and globally. Documentation reviews, personnel coaching, mock audits, and management review meetings are seamlessly conducted over secure video conferences and cloud workspaces. We also provide on-site visits for physical facilities and factories whenever required."
  },
  {
    question: "What happens if non-conformances (NCs) are identified during the audit?",
    answer: "Minor non-conformances are common and easily manageable. Our senior consultants work alongside your team to perform root-cause analysis and submit the necessary Corrective Action Plan (CAP) to the external registrar within the required timeframe, ensuring your certification remains on track without penalty."
  }
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-32 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent/15 blur-[140px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6">
          <MessageCircleQuestion className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Frequently Asked Questions</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-foreground mb-6">
          Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Know</span>
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
          Clear answers to common questions about timelines, costs, accreditation, and remote audit readiness.
        </p>
      </div>

      {/* Accordion Container */}
      <div className="max-w-4xl mx-auto space-y-4 relative z-10">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <GlassCard
              key={index}
              className={`transition-all duration-300 overflow-hidden border ${
                isOpen ? "border-primary/40 bg-white/[0.08]" : "border-white/10 hover:border-white/20"
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="text-base sm:text-lg font-heading font-bold text-foreground leading-snug">
                  {faq.question}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                    isOpen
                      ? "bg-primary text-primary-foreground border-primary rotate-180"
                      : "bg-white/5 border-white/10 text-muted-foreground"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2 border-t border-white/10">
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          );
        })}
      </div>

      {/* Footer helper */}
      <div className="text-center mt-12 relative z-10">
        <p className="text-sm text-muted-foreground">
          Have a specific question not listed here?{" "}
          <Link href="/contact" className="text-primary hover:text-accent font-semibold underline underline-offset-4">
            Contact our lead auditors directly
          </Link>
        </p>
      </div>
    </section>
  );
};
