"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Sparkles, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

interface Announcement {
  active: boolean;
  title: string;
  message: string;
  imageUrl?: string;
  updatedAt: string;
}

const CACHE_KEY = "sri_hero_notice_v1";

export const HeroNoticeCard = () => {
  const [announcement, setAnnouncement] = useState<Announcement | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) return JSON.parse(cached);
      } catch (e) {
        // Ignore JSON parse error
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchNotice = async () => {
      try {
        const res = await fetch("/api/announcement", { cache: "no-store" });
        const result = await res.json();
        if (isMounted && result.success && result.data && result.data.active) {
          setAnnouncement(result.data);
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(result.data));
          } catch (e) {
            // Storage quota full or disabled
          }
        }
      } catch (err) {
        console.error("Notice fetch error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchNotice();

    return () => {
      isMounted = false;
    };
  }, []);

  const hasNotice = Boolean(announcement && (announcement.title || announcement.message || announcement.imageUrl));

  const displayedTitle = hasNotice && announcement?.title 
    ? announcement.title 
    : "Sri Management Notice Board";

  const displayedMessage = hasNotice && announcement?.message
    ? announcement.message
    : "Welcome to Sri Management. Check here daily for upcoming ISO training batches, audit schedules, and important announcements.";

  // Detect if message is long enough to warrant Read More toggle
  const isLongMessage = displayedMessage.length > 130 || displayedMessage.split("\n").length > 3;

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Outer ambient glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 rounded-[2rem] blur-xl opacity-70 pointer-events-none" />

      {/* Main Glass Card */}
      <div className="relative rounded-[2rem] glass border border-primary/40 bg-[#081226]/95 p-6 sm:p-8 shadow-[0_16px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden">
        {/* Ambient interior light */}
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

          {/* Flyer / Poster Image */}
          {hasNotice && announcement?.imageUrl && !imageError && (
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-lg min-h-[160px] max-h-64 flex items-center justify-center">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-white/5 animate-pulse rounded-2xl" />
              )}
              <img
                src={announcement.imageUrl}
                alt={announcement.title || "Daily Notice"}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`w-full h-auto max-h-64 object-contain rounded-2xl transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          )}

          {/* Title & Message */}
          <div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground leading-snug">
              {displayedTitle}
            </h3>

            {/* Message Body with Smooth Expand / Collapse */}
            <div className="mt-3">
              <div
                className={`text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed transition-all duration-300 ${
                  !isExpanded && isLongMessage ? "line-clamp-3" : "max-h-80 overflow-y-auto pr-1"
                }`}
              >
                {displayedMessage}
              </div>

              {/* Read More Dropdown Button */}
              {isLongMessage && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent transition-all bg-primary/10 hover:bg-primary/20 px-3.5 py-1.5 rounded-xl border border-primary/30 active:scale-95"
                >
                  <span>{isExpanded ? "Show Less" : "Read Full Notice"}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5 transition-transform duration-200" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="relative z-10 pt-5 mt-4 border-t border-white/10 flex items-center justify-between gap-4">
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors group"
          >
            <span>Inquire About This</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/contact"
            className="text-xs text-muted-foreground hover:text-white transition-colors"
          >
            Contact Office →
          </Link>
        </div>
      </div>
    </div>
  );
};
