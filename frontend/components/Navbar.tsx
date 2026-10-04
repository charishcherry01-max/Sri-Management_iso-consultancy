"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Shield, 
  Sparkles, 
  CheckCircle2, 
  Bot, 
  Leaf, 
  HardHat, 
  Activity, 
  Utensils, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight,
  GraduationCap,
  Search,
  FileText,
  Award,
  Bell
} from "lucide-react";
import Image from "next/image";
import { AnimatedButton } from "./AnimatedButton";
import { motion, AnimatePresence } from "framer-motion";

const standardsMegaMenu = [
  {
    category: "Quality & Healthcare",
    items: [
      { id: "9001", name: "ISO 9001:2015", desc: "Quality Management System (QMS)", icon: CheckCircle2, color: "text-blue-400" },
      { id: "15189", name: "ISO 15189", desc: "Medical Laboratory Quality", icon: Activity, color: "text-rose-400" },
      { id: "22000", name: "ISO 22000", desc: "Food Safety Management", icon: Utensils, color: "text-emerald-400" },
    ]
  },
  {
    category: "Cybersecurity & Technology",
    items: [
      { id: "27001", name: "ISO 27001:2022", desc: "Information Security Management", icon: Shield, color: "text-purple-400" },
      { id: "42001", name: "ISO 42001", desc: "AI Management System (AIMS)", icon: Bot, color: "text-cyan-400" },
      { id: "22301", name: "ISO 22301", desc: "Business Continuity Management", icon: Sparkles, color: "text-yellow-400" },
    ]
  },
  {
    category: "Sustainability & Safety",
    items: [
      { id: "14001", name: "ISO 14001:2015", desc: "Environmental Management", icon: Leaf, color: "text-green-400" },
      { id: "45001", name: "ISO 45001:2018", desc: "Occupational Health & Safety", icon: HardHat, color: "text-orange-400" },
      { id: "ims", name: "IMS Certification", desc: "Integrated Management Framework", icon: Award, color: "text-violet-400" },
    ]
  }
];

const servicesDropdown = [
  { name: "Gap Analysis & Audit", desc: "Identify compliance discrepancies", href: "/services", icon: Search },
  { name: "ISO Training Courses", desc: "Lead Auditor & Internal Auditor modules", href: "/training", icon: GraduationCap },
  { name: "Documentation & SOPs", desc: "Complete ISO manual preparation", href: "/services", icon: FileText },
  { name: "Certification Liaison", desc: "End-to-end audit body support", href: "/services", icon: Award },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [standardsOpen, setStandardsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileStandardsOpen, setMobileStandardsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const standardsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setStandardsOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const handleStandardsMouseEnter = () => {
    if (standardsTimeoutRef.current) clearTimeout(standardsTimeoutRef.current);
    setStandardsOpen(true);
    setServicesOpen(false);
  };

  const handleStandardsMouseLeave = () => {
    standardsTimeoutRef.current = setTimeout(() => {
      setStandardsOpen(false);
    }, 150);
  };

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesOpen(true);
    setStandardsOpen(false);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-[#081226]/95 border-b border-primary/40 shadow-2xl backdrop-blur-2xl"
            : "bg-[#081226]/90 border-b border-white/10 backdrop-blur-xl"
        )}
      >
        {/* Sleek Top Notification & Direct Contact Bar */}
        <div className="w-full bg-gradient-to-r from-blue-950/95 via-slate-900/95 to-indigo-950/95 border-b border-primary/30 backdrop-blur-md py-1.5 px-3 sm:px-6">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs">
            {/* Direct Lead Auditor Hotline */}
            <a 
              href="tel:+918977402032" 
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors group py-0.5"
              title="Call Lead Auditor Directly"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="font-semibold text-primary group-hover:text-accent">📞 Direct Lead Auditor Line:</span>
              <span className="font-bold text-white tracking-wide underline underline-offset-2 decoration-primary/40 group-hover:decoration-accent">+91 89774 02032</span>
            </a>

            {/* Fast-Track 21-Day Turnaround Available */}
            <div className="hidden sm:inline-flex items-center gap-2">
              <span className="text-white/20 hidden md:inline">•</span>
              <Link 
                href="/register" 
                className="inline-flex items-center gap-1 font-semibold text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30 transition-all shadow-sm"
              >
                <span>⏱️ Fast-Track 21-Day Turnaround Available</span>
              </Link>
              <span className="text-white/20 hidden md:inline">•</span>
            </div>

            {/* Instant WhatsApp Support */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/918977402032?text=Hello%20Sri%20Management%2C%20I%20would%20like%20to%20inquire%20about%20ISO%20Certification%20and%20Auditing."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-sm"
                title="Chat on WhatsApp"
              >
                <span>💬 Instant WhatsApp Support</span>
              </a>

              <Link 
                href="/notice" 
                className="hidden lg:inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:text-accent transition-colors ml-1"
                title="View Notice Board"
              >
                <Bell className="w-3 h-3" />
                <span>Notice Board</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className={cn("container mx-auto px-4 flex items-center justify-between transition-all duration-300", isScrolled ? "py-2.5" : "py-3")}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative p-1 rounded-xl bg-white shadow-md transition-transform group-hover:scale-105">
              <Image 
                src="/logo-new.jpg" 
                alt="Sri Management Logo" 
                width={36} 
                height={36} 
                className="rounded-lg object-contain" 
              />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-heading font-extrabold tracking-tight text-white block leading-none">
                Sri Management
              </span>
              <span className="text-[10px] tracking-wider text-slate-300 uppercase font-bold block mt-0.5">
                ISO Consultancy & Training
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {/* Home Link */}
            <Link
              href="/"
              className={cn(
                "relative px-4 py-2 rounded-full text-xs lg:text-sm font-bold transition-all duration-200",
                isActive("/")
                  ? "text-white bg-primary border border-primary/60 shadow-lg shadow-primary/25"
                  : "text-slate-100 hover:text-white hover:bg-white/10"
              )}
            >
              Home
            </Link>

            {/* About Link */}
            <Link
              href="/about"
              className={cn(
                "relative px-4 py-2 rounded-full text-xs lg:text-sm font-bold transition-all duration-200",
                isActive("/about")
                  ? "text-white bg-primary border border-primary/60 shadow-lg shadow-primary/25"
                  : "text-slate-100 hover:text-white hover:bg-white/10"
              )}
            >
              About Us
            </Link>

            {/* Standards with Mega-Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleStandardsMouseEnter}
              onMouseLeave={handleStandardsMouseLeave}
            >
              <Link
                href="/standards"
                className={cn(
                  "relative inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs lg:text-sm font-bold transition-all duration-200",
                  isActive("/standards")
                    ? "text-white bg-primary border border-primary/60 shadow-lg shadow-primary/25"
                    : "text-slate-100 hover:text-white hover:bg-white/10"
                )}
              >
                <span>Standards</span>
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", standardsOpen ? "rotate-180 text-white" : "")} />
              </Link>

              {/* Mega Dropdown Panel */}
              <AnimatePresence>
                {standardsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[720px] max-w-[90vw] z-[100]"
                  >
                    <div className="bg-[#081226] border border-primary/40 rounded-3xl p-6 shadow-[0_25px_80px_rgba(0,0,0,0.95)] relative z-[100]">
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
                          <span className="text-xs font-bold uppercase tracking-wider text-primary">ISO Certification Catalog</span>
                        </div>
                        <Link 
                          href="/standards" 
                          className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                        >
                          Interactive Standards Explorer <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-3 gap-6">
                        {standardsMegaMenu.map((group, idx) => (
                          <div key={idx} className="space-y-3">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70 block">
                              {group.category}
                            </span>
                            <div className="space-y-2">
                              {group.items.map((item) => (
                                <Link
                                  key={item.id}
                                  href={`/standards#${item.id}`}
                                  className="group/item flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                                >
                                  <item.icon className={cn("w-4 h-4 mt-0.5 shrink-0 transition-transform group-hover/item:scale-110", item.color)} />
                                  <div>
                                    <span className="text-xs font-bold text-foreground block group-hover/item:text-primary transition-colors">
                                      {item.name}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground block line-clamp-1">
                                      {item.desc}
                                    </span>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer Highlight Banner inside dropdown */}
                      <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between bg-primary/10 -mx-6 -mb-6 p-4 rounded-b-3xl">
                        <div className="flex items-center gap-2 text-xs text-foreground/90">
                          <Sparkles className="w-4 h-4 text-accent shrink-0" />
                          <span>Need guidance choosing the right ISO standard for your industry?</span>
                        </div>
                        <Link
                          href="/standards"
                          className="text-xs font-bold text-primary hover:text-accent whitespace-nowrap ml-4 flex items-center gap-1"
                        >
                          Find Your ISO →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services with Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <Link
                href="/services"
                className={cn(
                  "relative inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs lg:text-sm font-bold transition-all duration-200",
                  isActive("/services")
                    ? "text-white bg-primary border border-primary/60 shadow-lg shadow-primary/25"
                    : "text-slate-100 hover:text-white hover:bg-white/10"
                )}
              >
                <span>Services</span>
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", servicesOpen ? "rotate-180 text-white" : "")} />
              </Link>

              {/* Services Dropdown Panel */}
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 pt-3 w-80 z-[100]"
                  >
                    <div className="bg-[#081226] border border-primary/40 rounded-2xl p-4 shadow-[0_25px_80px_rgba(0,0,0,0.95)] space-y-1.5 relative z-[100]">
                      {servicesDropdown.map((service, idx) => (
                        <Link
                          key={idx}
                          href={service.href}
                          className="group/srv flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                        >
                          <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 group-hover/srv:bg-primary group-hover/srv:text-primary-foreground transition-colors">
                            <service.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-foreground block group-hover/srv:text-primary transition-colors">
                              {service.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground block line-clamp-1">
                              {service.desc}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Training Link */}
            <Link
              href="/training"
              className={cn(
                "relative px-4 py-2 rounded-full text-xs lg:text-sm font-bold transition-all duration-200",
                isActive("/training")
                  ? "text-white bg-primary border border-primary/60 shadow-lg shadow-primary/25"
                  : "text-slate-100 hover:text-white hover:bg-white/10"
              )}
            >
              Training
            </Link>

            {/* Contact Link */}
            <Link
              href="/contact"
              className={cn(
                "relative px-4 py-2 rounded-full text-xs lg:text-sm font-bold transition-all duration-200",
                isActive("/contact")
                  ? "text-white bg-primary border border-primary/60 shadow-lg shadow-primary/25"
                  : "text-slate-100 hover:text-white hover:bg-white/10"
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <AnimatedButton 
              href="/register" 
              size="sm" 
              className="px-5 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary border border-white/20 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all rounded-full"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Apply for ISO</span>
            </AnimatedButton>
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            className="md:hidden text-foreground p-2 rounded-xl glass border border-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 glass pt-28 pb-8 px-6 flex flex-col gap-4 md:hidden overflow-y-auto bg-[#070f22]/98 backdrop-blur-3xl"
          >
            {/* Direct Links with active pill */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-lg font-heading font-bold p-3 rounded-xl transition-colors",
                isActive("/") ? "bg-primary/20 text-primary border border-primary/30" : "text-foreground hover:bg-white/5"
              )}
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-lg font-heading font-bold p-3 rounded-xl transition-colors",
                isActive("/about") ? "bg-primary/20 text-primary border border-primary/30" : "text-foreground hover:bg-white/5"
              )}
            >
              About Us
            </Link>

            {/* Mobile Standards Accordion */}
            <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.02]">
              <button
                type="button"
                onClick={() => setMobileStandardsOpen(!mobileStandardsOpen)}
                className="w-full flex items-center justify-between p-3 text-lg font-heading font-bold text-foreground"
              >
                <span>ISO Standards</span>
                <ChevronDown className={cn("w-5 h-5 transition-transform", mobileStandardsOpen ? "rotate-180 text-primary" : "")} />
              </button>

              {mobileStandardsOpen && (
                <div className="p-3 pt-0 space-y-2 border-t border-white/5">
                  <Link
                    href="/standards"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs font-bold text-primary p-2 rounded-lg bg-primary/10"
                  >
                    ✦ Open Interactive Standards Explorer
                  </Link>
                  {standardsMegaMenu.flatMap(g => g.items).slice(0, 6).map((item) => (
                    <Link
                      key={item.id}
                      href={`/standards#${item.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-white p-2 rounded-lg hover:bg-white/5"
                    >
                      <item.icon className={cn("w-4 h-4", item.color)} />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Services Accordion */}
            <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.02]">
              <button
                type="button"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between p-3 text-lg font-heading font-bold text-foreground"
              >
                <span>Services</span>
                <ChevronDown className={cn("w-5 h-5 transition-transform", mobileServicesOpen ? "rotate-180 text-primary" : "")} />
              </button>

              {mobileServicesOpen && (
                <div className="p-3 pt-0 space-y-1.5 border-t border-white/5">
                  {servicesDropdown.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-white p-2 rounded-lg hover:bg-white/5"
                    >
                      <item.icon className="w-4 h-4 text-primary" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/training"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-lg font-heading font-bold p-3 rounded-xl transition-colors",
                isActive("/training") ? "bg-primary/20 text-primary border border-primary/30" : "text-foreground hover:bg-white/5"
              )}
            >
              Training Modules
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-lg font-heading font-bold p-3 rounded-xl transition-colors",
                isActive("/contact") ? "bg-primary/20 text-primary border border-primary/30" : "text-foreground hover:bg-white/5"
              )}
            >
              Contact Office
            </Link>

            <Link
              href="/notice"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-semibold text-primary/80 flex items-center gap-2 p-3 rounded-xl bg-primary/10 border border-primary/20"
            >
              <Bell className="w-4 h-4 text-primary" />
              <span>Staff Notice Portal</span>
            </Link>

            <div className="mt-auto pt-4 flex flex-col gap-3">
              <AnimatedButton 
                href="/register" 
                className="w-full justify-center text-white font-extrabold bg-gradient-to-r from-primary to-blue-600 border border-white/20 shadow-lg shadow-primary/30"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Apply for ISO</span>
              </AnimatedButton>
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
                <a href="tel:+918977402032" className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-primary" /> +91 89774 02032
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

