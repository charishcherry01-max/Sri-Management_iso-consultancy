"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Announcement {
  active: boolean;
  title: string;
  message: string;
  imageUrl?: string;
  updatedAt: string;
}

export const HeroNoticeCard = () => {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await fetch("/api/announcement", { cache: "no-store" });
        const result = await res.json();
        if (result.success && result.data && result.data.active) {
          setAnnouncement(result.data);
        } else {
          setAnnouncement(null);
        }
      } catch (err) {
        console.error("Failed to load hero notice:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, []);

  const hasNotice = announcement && (announcement.title || announcement.message || announcement.imageUrl);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-lg mx-auto"
    >
      {/* Outer Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 rounded-[2rem] blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />

      {/* Main Glass Card */}
      <div className="relative rounded-[2rem] glass border border-primary/40 bg-[#081226]/90 p-6 sm:p-8 shadow-[0_12px_48px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden">
        {/* Subtle internal gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/15 blur-[60px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-5">
          {/* Header Badge */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-bold tracking-wide">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
              <Bell className="w-3.5 h-3.5" />
              <span>DAILY UPDATE</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Notice Board</span>
            </div>
          </div>

          {/* Flyer / Poster Image (if uploaded) */}
          {hasNotice && announcement?.imageUrl && (
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/15 bg-black/50 max-h-60 flex items-center justify-center shadow-lg">
              <img
                src={announcement.imageUrl}
                alt={announcement.title || "Daily Notice"}
                className="w-full h-auto max-h-60 object-contain rounded-2xl"
              />
            </div>
          )}

          {/* Title */}
          <div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground leading-snug">
              {hasNotice && announcement?.title ? announcement.title : "Sri Management Notice Board"}
            </h3>

            {/* Message Body */}
            <p className="text-sm sm:text-base text-muted-foreground mt-3 whitespace-pre-line leading-relaxed">
              {hasNotice && announcement?.message
                ? announcement.message
                : "Welcome to Sri Management. Check here daily for upcoming ISO training batches, audit schedules, and important announcements."}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="relative z-10 pt-6 mt-4 border-t border-white/10 flex items-center justify-between gap-4">
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
          >
            <span>Inquire About This</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/contact"
            className="text-xs text-muted-foreground hover:text-white transition-colors"
          >
            Contact Office →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
