"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Shield, Zap, Leaf, HardHat, FileText, CheckCircle2, Utensils, GraduationCap, Bot, Layers, Activity } from "lucide-react";
import { AnimatedButton } from "@/components/AnimatedButton";

const standards = [
  {
    id: "9001",
    title: "ISO 9001",
    subtitle: "Quality Management",
    icon: CheckCircle2,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    description: "The internationally recognized standard for Quality Management Systems (QMS). Enhance customer satisfaction and drive continuous improvement.",
    benefits: ["Improved efficiency", "Higher customer satisfaction", "Global recognition"]
  },
  {
    id: "27001",
    title: "ISO 27001",
    subtitle: "Information Security",
    icon: Shield,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    description: "Secure your corporate information and data with a robust Information Security Management System (ISMS). Protect against cyber threats.",
    benefits: ["Data protection", "Risk mitigation", "Regulatory compliance"]
  },
  {
    id: "14001",
    title: "ISO 14001",
    subtitle: "Environmental Management",
    icon: Leaf,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    description: "Minimize your environmental footprint and comply with regulations through an effective Environmental Management System (EMS).",
    benefits: ["Reduced waste", "Energy efficiency", "Sustainable growth"]
  },
  {
    id: "45001",
    title: "ISO 45001",
    subtitle: "Occupational Health & Safety",
    icon: HardHat,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    description: "Create a safer workplace, prevent work-related injury and ill health with a proactive Health and Safety management approach.",
    benefits: ["Injury prevention", "Legal compliance", "Employee wellbeing"]
  },
  {
    id: "22301",
    title: "ISO 22301",
    subtitle: "Business Continuity",
    icon: Zap,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    description: "Prepare for, respond to, and recover from disruptive incidents with a resilient Business Continuity Management System.",
    benefits: ["Rapid recovery", "Reduced downtime", "Operational resilience"]
  },
  {
    id: "22000",
    title: "ISO 22000",
    subtitle: "Food Safety Management",
    icon: Utensils,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    description: "Ensure food safety across the entire supply chain with a robust Food Safety Management System (FSMS).",
    benefits: ["Food safety control", "Consumer trust", "Regulatory compliance"]
  },
  {
    id: "15189",
    title: "ISO 15189",
    subtitle: "Medical Laboratories",
    icon: Activity,
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
    description: "The premier international standard for quality and competence in medical laboratories. Ensure diagnostic accuracy, patient safety, and clinical excellence.",
    benefits: ["Accurate diagnostic results", "Patient safety & clinical trust", "Global laboratory competence"]
  },
  {
    id: "21001",
    title: "ISO 21001",
    subtitle: "Educational Organizations",
    icon: GraduationCap,
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    description: "Enhance satisfaction of learners and other beneficiaries through effective Educational Organizations Management System (EOMS).",
    benefits: ["Improved education quality", "Personalized learning", "Stakeholder satisfaction"]
  },
  {
    id: "42001",
    title: "ISO 42001",
    subtitle: "AI Management System",
    icon: Bot,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    description: "Manage risks and opportunities associated with Artificial Intelligence with a comprehensive AI Management System (AIMS).",
    benefits: ["Responsible AI", "Risk mitigation", "Ethical compliance"]
  },
  {
    id: "ims",
    title: "IMS",
    subtitle: "Integrated Management System",
    icon: Layers,
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
    description: "Combine multiple management system standards into a single, comprehensive, and harmonized framework.",
    benefits: ["Streamlined operations", "Cost reduction", "Unified audits"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function StandardsPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen relative">
      {/* Background Decor */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/20 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6"
          >
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Explore ISO Standards</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-foreground mb-6"
          >
            Global Standards for <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Modern Enterprise</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Discover the key ISO certifications that can elevate your business operations, secure your data, and build trust with your clients globally.
          </motion.p>
        </div>

        {/* Standards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {standards.map((standard) => (
            <motion.div key={standard.id} id={standard.id} variants={itemVariants} className="scroll-mt-32">
              <GlassCard className={`h-full flex flex-col p-8 transition-all hover:scale-[1.02] duration-300 ${standard.borderColor}`}>
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${standard.bgColor} flex items-center justify-center border ${standard.borderColor}`}>
                    <standard.icon className={`w-7 h-7 ${standard.color}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-heading font-bold text-foreground">{standard.title}</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">{standard.subtitle}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                  {standard.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  {standard.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className={`w-4 h-4 ${standard.color}`} />
                      <span className="text-sm font-medium text-foreground/80">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-white/10">
                  <AnimatedButton variant="glass" className="w-full justify-center" href={`/register?standard=${standard.id}`}>
                    Get Certified
                  </AnimatedButton>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
