"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Search, FileText, ClipboardCheck, Award, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    phase: "Phase 1: Discovery",
    title: "Gap Analysis & Scope Definition",
    icon: Search,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    description: "Our certified lead auditors analyze your existing operational workflows against target ISO clauses to pinpoint exact compliance gaps and establish the audit scope.",
    highlights: ["Baseline Readiness Assessment", "Clause-by-Clause Gap Matrix", "Milestone Roadmap & Timeline"]
  },
  {
    number: "02",
    phase: "Phase 2: Architecture",
    title: "Documentation & System Design",
    icon: FileText,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    description: "We develop customized management system documentation, Quality Manuals, SOPs, and AI-assisted risk registers tailored precisely to your company culture.",
    highlights: ["Tailored Quality Manuals & SOPs", "Dynamic Risk Assessment Framework", "Zero-Bureaucracy Digital Workflows"]
  },
  {
    number: "03",
    phase: "Phase 3: Execution",
    title: "Training & Internal Audits",
    icon: ClipboardCheck,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    description: "We train your key personnel, conduct mock audits, test operational controls, and execute mandatory internal audits to close all non-conformances prior to the external audit.",
    highlights: ["Staff Awareness & Lead Auditor Coaching", "Management Review Meetings (MRM)", "100% Non-Conformance (NC) Resolution"]
  },
  {
    number: "04",
    phase: "Phase 4: Certification",
    title: "External Audit & ISO Issuance",
    icon: Award,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    description: "We coordinate and support you through Stage 1 & Stage 2 audits with accredited certification registrars (IAF / NABCB registered) until official certificate issuance.",
    highlights: ["Stage 1 & Stage 2 Audit Support", "Accredited 3-Year ISO Certificate", "Surveillance Audit Maintenance"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

export const RoadmapSection = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-32 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 blur-[140px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Proven 4-Step Methodology</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-foreground mb-6">
          Step-by-Step <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Certification Roadmap</span>
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
          From initial discovery to international accreditation, our structured process ensures rapid certification with zero operational disruption.
        </p>
      </div>

      {/* Grid of Roadmap Steps */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
      >
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <motion.div key={step.number} variants={itemVariants} className="flex">
              <GlassCard className={`p-6 sm:p-7 flex flex-col justify-between w-full relative transition-all duration-300 hover:scale-[1.02] ${step.borderColor}`}>
                <div>
                  {/* Top Bar with Number & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-heading font-black text-foreground/20 tracking-tighter">
                      {step.number}
                    </span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${step.bgColor} ${step.color} border ${step.borderColor}`}>
                      {step.phase}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${step.bgColor} border ${step.borderColor} flex items-center justify-center mb-5`}>
                    <Icon className={`w-6 h-6 ${step.color}`} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Key Deliverables / Highlights */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2">
                    Key Outcomes
                  </div>
                  {step.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${step.color} shrink-0 mt-0.5`} />
                      <span className="text-xs text-foreground/85 font-medium leading-tight">{h}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Action Prompt */}
      <div className="mt-12 text-center relative z-10">
        <div className="inline-flex flex-wrap items-center justify-center gap-4 p-4 rounded-2xl glass border border-white/10 max-w-2xl mx-auto">
          <span className="text-sm text-muted-foreground">
            Have an upcoming tender or compliance deadline?
          </span>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
          >
            Get a Customized Timeline <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
