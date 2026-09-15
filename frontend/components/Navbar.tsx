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
            ? "glass py-2.5 border-b border-primary/20 shadow-xl backdrop-blur-xl"
            : "bg-transparent py-4 border-b border-white/5"
        )}
      >
        {/* Top Mini Contact Strip (Desktop only) */}
        <div className="container mx-auto px-4 pb-2 hidden lg:flex items-center justify-between text-[11px] text-muted-foreground border-b border-white/5 mb-2">
          <div className="flex items-center gap-6">
            <a href="tel:+918977402032" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Phone className="w-3 h-3 text-primary" />
              <span>+91 89774 02032</span>
            </a>
            <a href="mailto:sri.isoofficial@gmail.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Mail className="w-3 h-3 text-primary" />
              <span>sri.isoofficial@gmail.com</span>
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-primary" />
              <span>Hyderabad, Telangana</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/notice" 
              className="inline-flex items-center gap-1 text-primary hover:text-accent font-semibold transition-colors"
            >
              <Bell className="w-3 h-3" />
              <span>Daily Notice Portal</span>
            </Link>
            <span className="text-white/20">•</span>
            <span className="text-emerald-400 font-medium">● 100% Audit Pass Guarantee</span>
          </div>
        </div>

        <div className="container mx-auto px-4 flex items-center justify-between">
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
              <span className="text-lg sm:text-xl font-heading font-extrabold tracking-tight text-foreground block leading-none">
                Sri Management
              </span>
              <span className="text-[10px] tracking-wider text-muted-foreground uppercase font-semibold block mt-0.5">
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
                "relative px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-200",
                isActive("/")
                  ? "text-primary bg-primary/15 border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              Home
            </Link>

            {/* About Link */}
            <Link
              href="/about"
              className={cn(
                "relative px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-200",
                isActive("/about")
                  ? "text-primary bg-primary/15 border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
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
                  "relative inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-200",
                  isActive("/standards")
                    ? "text-primary bg-primary/15 border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                <span>Standards</span>
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", standardsOpen ? "rotate-180 text-primary" : "")} />
              </Link>

              {/* Mega Dropdown Panel */}
              <AnimatePresence>
                {standardsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[720px] max-w-[90vw] z-50"
                  >
                    <div className="glass border border-primary/30 rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-[#070f22]/98 backdrop-blur-2xl">
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
                  "relative inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-200",
                  isActive("/services")
                    ? "text-primary bg-primary/15 border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                <span>Services</span>
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", servicesOpen ? "rotate-180 text-primary" : "")} />
              </Link>

              {/* Services Dropdown Panel */}
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 pt-3 w-80 z-50"
                  >
                    <div className="glass border border-primary/30 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#070f22]/98 backdrop-blur-2xl space-y-1.5">
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
                "relative px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-200",
                isActive("/training")
                  ? "text-primary bg-primary/15 border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              Training
            </Link>

            {/* Contact Link */}
            <Link
              href="/contact"
              className={cn(
                "relative px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-200",
                isActive("/contact")
                  ? "text-primary bg-primary/15 border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <AnimatedButton href="/register" size="sm" className="px-5 py-2 text-xs font-bold">
              Book Free Gap Audit
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
              <AnimatedButton href="/register" className="w-full justify-center">
                Book Free Gap Audit
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

