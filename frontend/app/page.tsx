"use client";

import { motion } from "framer-motion";
import { AnimatedButton } from "@/components/AnimatedButton";
import { GlassCard } from "@/components/GlassCard";
import { CheckCircle2, Shield, Zap, Award, Globe, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { RoadmapSection } from "@/components/RoadmapSection";
import { FaqSection } from "@/components/FaqSection";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  return (
    <div className="pt-32 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative z-10"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-foreground">Next-Gen ISO Platform</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-7xl font-heading font-extrabold text-foreground leading-[1.1] tracking-tight mb-6">
              Transform Your Organization with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">AI-Powered</span> ISO Compliance
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              Empowering businesses with ISO Certification, Training, Documentation and AI Compliance Assistance. Experience the future of enterprise consultancy.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
              <AnimatedButton size="lg" href="/register">
                Start Consultation
              </AnimatedButton>
              <AnimatedButton variant="glass" size="lg" href="/standards">
                Explore Standards
              </AnimatedButton>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="mt-12 flex items-center gap-6 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" /> No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" /> AI Guided Setup
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 hidden lg:block"
          >
            <div className="relative w-full aspect-square">
              {/* Floating Glass UI Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute top-10 right-10 z-20 w-64"
              >
                <GlassCard className="p-4 border-primary/20 bg-black/40">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">ISO 27001</div>
                      <div className="text-xs text-green-400">100% Compliant</div>
                    </div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-green-400 w-full rounded-full" />
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div
                animate={{ y: [15, -15, 15] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 left-0 z-20 w-72"
              >
                <GlassCard className="p-4 border-accent/20 bg-black/40">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground mb-1">AI Assistant</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">
                        Generating Risk Assessment Policy based on ISO 9001:2015 standards...
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                className="absolute inset-10 rounded-full border border-white/10 border-dashed"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                className="absolute inset-20 rounded-full border border-primary/20"
              />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-primary to-accent blur-[40px] opacity-50" />
                <div className="w-32 h-32 rounded-full glass border border-white/20 flex items-center justify-center shadow-[0_0_80px_rgba(37,99,235,0.4)]">
                  <Award className="w-16 h-16 text-foreground" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Step-by-Step Certification Roadmap */}
      <RoadmapSection />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* CTA Section */}
      <section className="container mx-auto px-4 mt-32">
        <div className="glass rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border-primary/20">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Ready to achieve compliance?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Join hundreds of companies that have streamlined their ISO certification process with our AI-powered platform.
            </p>
            <AnimatedButton size="lg" href="/register">
              Book Your Free Consultation
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  );
}
