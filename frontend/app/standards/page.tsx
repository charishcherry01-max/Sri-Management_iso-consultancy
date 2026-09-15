"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { 
  Shield, 
  Zap, 
  Leaf, 
  HardHat, 
  FileText, 
  CheckCircle2, 
  Utensils, 
  GraduationCap, 
  Bot, 
  Layers, 
  Activity,
  Search,
  Sparkles,
  ArrowRight,
  Filter,
  Compass,
  Clock,
  Award,
  HelpCircle,
  X,
  PhoneCall
} from "lucide-react";
import { AnimatedButton } from "@/components/AnimatedButton";

interface StandardItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: "quality" | "tech" | "safety" | "specialized";
  tag: string;
  timeline: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  benefits: string[];
  industries: string[];
}

const standards: StandardItem[] = [
  {
    id: "9001",
    code: "ISO 9001:2015",
    title: "ISO 9001",
    subtitle: "Quality Management System (QMS)",
    category: "quality",
    tag: "Most Demanded",
    timeline: "3–4 Weeks",
    icon: CheckCircle2,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    description: "The gold standard for Quality Management. Streamlines internal workflows, boosts customer satisfaction, and unlocks corporate and government tender eligibility.",
    benefits: ["Tender qualification eligibility", "High operational efficiency", "Global stakeholder credibility"],
    industries: ["Manufacturing", "Services", "Construction", "Healthcare", "IT"]
  },
  {
    id: "27001",
    code: "ISO 27001:2022",
    title: "ISO 27001",
    subtitle: "Information Security Management (ISMS)",
    category: "tech",
    tag: "High Tech Priority",
    timeline: "4–6 Weeks",
    icon: Shield,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    description: "Enterprise-grade information asset defense. Safeguards intellectual property, cloud infrastructure, and customer data against cyber threats and ransomware.",
    benefits: ["End-to-end data security", "GDPR/DPDP regulatory alignment", "Win high-security enterprise deals"],
    industries: ["IT & SaaS", "Fintech & Banking", "Healthcare Tech", "E-commerce"]
  },
  {
    id: "42001",
    code: "ISO/IEC 42001:2023",
    title: "ISO 42001",
    subtitle: "Artificial Intelligence Management (AIMS)",
    category: "tech",
    tag: "Next-Gen AI Standard",
    timeline: "4–6 Weeks",
    icon: Bot,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    description: "The world's first global AI governance standard. Validates responsible AI usage, algorithmic transparency, data bias mitigation, and safety controls.",
    benefits: ["Ethical AI certification", "Investor & enterprise trust", "Mitigates generative AI risks"],
    industries: ["AI Startups", "IT & Cloud", "Automation", "Data Analytics"]
  },
  {
    id: "14001",
    code: "ISO 14001:2015",
    title: "ISO 14001",
    subtitle: "Environmental Management System (EMS)",
    category: "safety",
    tag: "Sustainability & ESG",
    timeline: "3–5 Weeks",
    icon: Leaf,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    description: "Framework for sustainable business operations. Minimizes environmental impact, manages waste responsibly, and complies with statutory pollution control norms.",
    benefits: ["ESG compliance & reporting", "Reduced energy & raw material waste", "Green tender advantages"],
    industries: ["Manufacturing", "Chemicals & Pharma", "Energy", "Infrastructure"]
  },
  {
    id: "45001",
    code: "ISO 45001:2018",
    title: "ISO 45001",
    subtitle: "Occupational Health & Safety (OH&S)",
    category: "safety",
    tag: "Workforce Safety",
    timeline: "3–5 Weeks",
    icon: HardHat,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    description: "Proactive workplace safety framework. Eliminates workplace hazards, reduces downtime from accidents, and ensures strict compliance with labor laws.",
    benefits: ["Zero workplace incident culture", "Lower insurance liabilities", "Strict legal compliance"],
    industries: ["Construction", "Heavy Industries", "Logistics", "Engineering"]
  },
  {
    id: "15189",
    code: "ISO 15189:2022",
    title: "ISO 15189",
    subtitle: "Medical & Diagnostic Laboratories",
    category: "quality",
    tag: "Clinical Excellence",
    timeline: "4–6 Weeks",
    icon: Activity,
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
    description: "The gold standard for medical diagnostic labs. Ensures test calibration accuracy, patient sample integrity, and clinical laboratory competence.",
    benefits: ["NABL/International alignment", "Physician and patient trust", "Accurate diagnostic validation"],
    industries: ["Diagnostic Centers", "Pathology Labs", "Hospitals", "Biotech"]
  },
  {
    id: "22000",
    code: "ISO 22000:2018",
    title: "ISO 22000",
    subtitle: "Food Safety Management (FSMS)",
    category: "specialized",
    tag: "Food Chain Safety",
    timeline: "3–5 Weeks",
    icon: Utensils,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    description: "Covers the complete food supply chain from farm to fork. Incorporates HACCP principles to prevent biological, chemical, and physical food contamination.",
    benefits: ["FSSAI/Global export readiness", "Eliminates contamination risks", "Retail chain acceptability"],
    industries: ["Food Processing", "Hotels & Catering", "Agriculture", "Packaging"]
  },
  {
    id: "22301",
    code: "ISO 22301:2019",
    title: "ISO 22301",
    subtitle: "Business Continuity Management (BCMS)",
    category: "tech",
    tag: "Crisis Resilience",
    timeline: "3–5 Weeks",
    icon: Zap,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    description: "Emergency preparedness and disaster recovery. Ensures uninterrupted core business operations even during IT outages, supply disruptions, or natural disasters.",
    benefits: ["Rapid disaster recovery", "Zero operational downtime", "Client SLA guarantees"],
    industries: ["IT & Cloud", "Data Centers", "Supply Chain", "Financial Services"]
  },
  {
    id: "21001",
    code: "ISO 21001:2018",
    title: "ISO 21001",
    subtitle: "Educational Organizations (EOMS)",
    category: "specialized",
    tag: "Institutional Quality",
    timeline: "3–4 Weeks",
    icon: GraduationCap,
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    description: "Tailored for universities, schools, colleges, and corporate training institutes to deliver high-quality, student-centric education and standardized curricula.",
    benefits: ["Enhanced institutional reputation", "NAAC/NIRF ranking support", "Parent & student trust"],
    industries: ["Universities", "Colleges & Schools", "EdTech", "Training Academies"]
  },
  {
    id: "ims",
    code: "IMS Framework",
    title: "IMS",
    subtitle: "Integrated Management System (9001 + 14001 + 45001)",
    category: "specialized",
    tag: "Unified Audit Package",
    timeline: "5–7 Weeks",
    icon: Layers,
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
    description: "Combines Quality, Environmental, and Health & Safety management systems into one unified policy and single auditing process, saving up to 40% on audit fees.",
    benefits: ["Single streamlined audit", "Save 40% on consultancy fees", "Total operational governance"],
    industries: ["Large Corporates", "EPC & Infrastructure", "Manufacturing", "Export Houses"]
  }
];

const industryOptions = [
  { id: "it", label: "IT, Software & SaaS", recommended: ["27001", "42001", "9001"] },
  { id: "mfg", label: "Manufacturing & Engineering", recommended: ["9001", "14001", "45001", "ims"] },
  { id: "health", label: "Healthcare & Diagnostic Labs", recommended: ["15189", "9001", "27001"] },
  { id: "food", label: "Food, Beverage & Hospitality", recommended: ["22000", "9001"] },
  { id: "const", label: "Construction & Infrastructure", recommended: ["45001", "14001", "9001", "ims"] },
  { id: "edu", label: "Education & Corporate Training", recommended: ["21001", "9001"] },
];

const objectiveOptions = [
  { id: "tender", label: "Win Government & Corporate Tenders" },
  { id: "cyber", label: "Protect Data & Satisfy Tech Clients" },
  { id: "quality", label: "Improve Operational Quality & Workflow" },
  { id: "safety", label: "Workplace Safety & Labor Compliance" },
  { id: "green", label: "ESG & Environmental Compliance" },
  { id: "ai", label: "AI Governance & Algorithmic Ethics" },
];

export default function StandardsPage() {
  const [activeTab, setActiveTab] = useState<"catalog" | "wizard">("catalog");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [wizardIndustry, setWizardIndustry] = useState<string>("");
  const [wizardObjective, setWizardObjective] = useState<string>("");

  const filteredStandards = useMemo(() => {
    return standards.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.code.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.benefits.some(b => b.toLowerCase().includes(query)) ||
        item.industries.some(i => i.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const recommendedStandards = useMemo(() => {
    if (!wizardIndustry) return [];
    const indObj = industryOptions.find(i => i.id === wizardIndustry);
    if (!indObj) return [];

    let matchedIds = [...indObj.recommended];

    if (wizardObjective === "cyber" && !matchedIds.includes("27001")) matchedIds.unshift("27001");
    if (wizardObjective === "ai" && !matchedIds.includes("42001")) matchedIds.unshift("42001");
    if (wizardObjective === "green" && !matchedIds.includes("14001")) matchedIds.unshift("14001");
    if (wizardObjective === "safety" && !matchedIds.includes("45001")) matchedIds.unshift("45001");
    if (wizardObjective === "tender" && !matchedIds.includes("9001")) matchedIds.unshift("9001");

    return standards.filter(s => matchedIds.includes(s.id));
  }, [wizardIndustry, wizardObjective]);

  return (
    <div className="pt-32 pb-24 min-h-screen relative">
      <div className="fixed top-[-15%] left-[-10%] w-[55%] h-[55%] bg-primary/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-15%] right-[-10%] w-[55%] h-[55%] bg-accent/15 blur-[160px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6"
          >
            <Compass className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Interactive Certification Hub</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-foreground mb-5 leading-tight"
          >
            Global Standards for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-blue-400">
              Modern Enterprise
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            Explore international ISO accreditations or use our smart recommendation tool to discover the exact certifications required for your organization.
          </motion.p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex justify-center mb-10">
          <div className="p-1.5 rounded-2xl glass border border-white/15 bg-black/40 flex items-center gap-2 shadow-xl">
            <button
              onClick={() => setActiveTab("catalog")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "catalog"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Browse All Standards ({standards.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("wizard")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "wizard"
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-accent/30"
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              }`}
            >
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span>Find My ISO (Smart Finder)</span>
            </button>
          </div>
        </div>

        {/* TAB 1: BROWSE CATALOG VIEW */}
        {activeTab === "catalog" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Search & Filter Bar */}
            <div className="glass rounded-3xl p-4 sm:p-6 border border-white/10 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search Input */}
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by code (e.g. 9001, 27001), keyword, or industry..."
                    className="w-full pl-11 pr-10 py-3 rounded-2xl bg-black/50 border border-white/15 text-foreground placeholder:text-muted-foreground/60 text-xs sm:text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                  <span className="text-xs text-muted-foreground font-semibold mr-1 flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5 text-primary" /> Filter:
                  </span>
                  {[
                    { id: "all", label: "All" },
                    { id: "quality", label: "Quality & Medical" },
                    { id: "tech", label: "Cyber & AI" },
                    { id: "safety", label: "Safety & Green" },
                    { id: "specialized", label: "Food & Others" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedCategory === cat.id
                          ? "bg-primary/25 border border-primary/50 text-primary shadow-sm"
                          : "bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search results summary */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-white/5">
                <span>Showing <strong className="text-foreground">{filteredStandards.length}</strong> standards</span>
                {searchQuery && (
                  <span>Filtering for: <strong className="text-primary">"{searchQuery}"</strong></span>
                )}
              </div>
            </div>

            {/* Standards Cards Grid */}
            {filteredStandards.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredStandards.map((standard) => (
                  <motion.div 
                    key={standard.id} 
                    id={standard.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="scroll-mt-32"
                  >
                    <GlassCard className={`h-full flex flex-col p-6 sm:p-8 transition-all hover:scale-[1.02] duration-300 ${standard.borderColor} bg-gradient-to-b from-white/[0.04] to-transparent relative overflow-hidden group`}>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-5">
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                          {standard.code}
                        </span>
                        <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30">
                          {standard.tag}
                        </span>
                      </div>

                      {/* Header icon + titles */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-2xl ${standard.bgColor} flex items-center justify-center border ${standard.borderColor} shrink-0`}>
                          <standard.icon className={`w-6 h-6 ${standard.color}`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-heading font-extrabold text-foreground group-hover:text-primary transition-colors">
                            {standard.title}
                          </h3>
                          <span className="text-xs text-muted-foreground font-medium block">
                            {standard.subtitle}
                          </span>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-6 flex-1">
                        {standard.description}
                      </p>

                      {/* Key Highlights / Benefits */}
                      <div className="space-y-2 mb-6 bg-black/30 p-3.5 rounded-2xl border border-white/5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                          Core Deliverables
                        </span>
                        {standard.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${standard.color}`} />
                            <span className="text-xs font-medium text-foreground/90">{benefit}</span>
                          </div>
                        ))}
                      </div>

                      {/* Timeline & Industries */}
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-6 pb-4 border-b border-white/10">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-primary" />
                          <span>Timeline: <strong>{standard.timeline}</strong></span>
                        </div>
                        <div className="truncate max-w-[150px] text-right">
                          <span>{standard.industries.slice(0, 2).join(", ")}</span>
                        </div>
                      </div>

                      {/* Action CTA Buttons */}
                      <div className="mt-auto space-y-2">
                        <AnimatedButton 
                          variant="default" 
                          className="w-full justify-center text-xs py-2.5" 
                          href={`/register?standard=${standard.id}`}
                        >
                          <span>Get Certified for {standard.title}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </AnimatedButton>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 glass rounded-3xl border border-white/10">
                <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-foreground mb-1">No matching ISO standards found</h3>
                <p className="text-sm text-muted-foreground mb-4">Try searching with a different keyword or standard code.</p>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                  className="px-4 py-2 rounded-xl bg-primary/20 text-primary text-xs font-bold hover:bg-primary/30 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 2: SMART RECOMMENDATION WIZARD */}
        {activeTab === "wizard" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="glass rounded-3xl p-6 sm:p-10 border border-primary/30 shadow-2xl space-y-8 bg-[#081226]/95">
              <div className="text-center max-w-xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-bold mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>30-Second ISO Advisor</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground mb-2">
                  Which ISO Certification Do You Need?
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Select your industry and main business goal to receive tailored certification recommendations.
                </p>
              </div>

              {/* Step 1: Industry */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">1</span>
                  Select Your Industry Sector:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {industryOptions.map((ind) => (
                    <button
                      key={ind.id}
                      type="button"
                      onClick={() => setWizardIndustry(ind.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        wizardIndustry === ind.id
                          ? "bg-primary/25 border-primary text-foreground shadow-lg shadow-primary/20 ring-1 ring-primary"
                          : "bg-black/30 border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/5"
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-bold block">{ind.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Goal */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">2</span>
                  Select Your Primary Business Goal:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {objectiveOptions.map((obj) => (
                    <button
                      key={obj.id}
                      type="button"
                      onClick={() => setWizardObjective(obj.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        wizardObjective === obj.id
                          ? "bg-accent/25 border-accent text-foreground shadow-lg shadow-accent/20 ring-1 ring-accent"
                          : "bg-black/30 border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/5"
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-bold block">{obj.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Recommendation Box */}
              {wizardIndustry ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-3xl bg-gradient-to-br from-primary/20 via-accent/10 to-transparent border border-primary/40 space-y-6"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-accent block">
                        ★ Recommended ISO Portfolio
                      </span>
                      <h4 className="text-lg font-heading font-extrabold text-foreground">
                        Recommended Standards for Your Business
                      </h4>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      98% Fit Match
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendedStandards.map((std, i) => (
                      <div 
                        key={std.id}
                        className="p-4 rounded-2xl bg-black/40 border border-white/15 flex items-start gap-3.5"
                      >
                        <div className={`w-10 h-10 rounded-xl ${std.bgColor} flex items-center justify-center shrink-0 border ${std.borderColor}`}>
                          <std.icon className={`w-5 h-5 ${std.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-sm font-bold text-foreground truncate">{std.title}</span>
                            <span className="text-[10px] font-semibold text-primary px-2 py-0.5 rounded-md bg-primary/15">{std.code}</span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                            {std.description}
                          </p>
                          <AnimatedButton
                            size="sm"
                            variant="glass"
                            href={`/register?standard=${std.id}`}
                            className="text-[11px] py-1.5 px-3"
                          >
                            Apply for {std.title}
                          </AnimatedButton>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Consultation Banner */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-black/60 border border-white/10">
                    <div className="flex items-center gap-3">
                      <PhoneCall className="w-5 h-5 text-primary shrink-0" />
                      <div className="text-left">
                        <span className="text-xs font-bold text-foreground block">
                          Need custom audit scoping or multi-standard package?
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          Our Lead Auditors in Hyderabad provide 1-on-1 gap assessment guidance.
                        </span>
                      </div>
                    </div>
                    <AnimatedButton
                      href="/contact"
                      className="whitespace-nowrap text-xs px-5 py-2.5"
                    >
                      Speak with Lead Auditor
                    </AnimatedButton>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center p-8 border-2 border-dashed border-white/10 rounded-2xl text-muted-foreground text-xs sm:text-sm">
                  👆 Select your Industry Sector above to instantly view personalized ISO recommendations.
                </div>
              )}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
