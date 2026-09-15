"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Sparkles, ArrowRight, ChevronDown, ChevronUp, Maximize2, X, ExternalLink, Link2 } from "lucide-react";
import Link from "next/link";

interface Announcement {
  active: boolean;
  title: string;
  message: string;
  imageUrl?: string;
  linkUrl?: string;
  linkText?: string;
  links?: { url: string; text: string }[];
  updatedAt: string;
}

const renderFormattedMessage = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      const href = part.startsWith("http") ? part : `https://${part}`;
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-primary hover:text-accent font-semibold underline underline-offset-2 break-all hover:opacity-90 transition-colors inline-flex items-center gap-0.5 mx-0.5"
        >
          <span>{part}</span>
          <ExternalLink className="w-3 h-3 inline-block shrink-0" />
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

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
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Close modal on Escape key press & prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsImageModalOpen(false);
      }
    };

    if (isImageModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isImageModalOpen]);

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

          {/* Flyer / Poster Image with Click to Enlarge */}
          {hasNotice && announcement?.imageUrl && !imageError && (
            <div 
              onClick={() => setIsImageModalOpen(true)}
              className="relative w-full rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-lg min-h-[160px] max-h-64 flex items-center justify-center cursor-zoom-in group transition-all duration-300 hover:border-primary/50"
              title="Click to view full screen"
            >
              {!imageLoaded && (
                <div className="absolute inset-0 bg-white/5 animate-pulse rounded-2xl" />
              )}
              <img
                src={announcement.imageUrl}
                alt={announcement.title || "Daily Notice"}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`w-full h-auto max-h-64 object-contain rounded-2xl transition-all duration-300 group-hover:scale-[1.03] ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Hover Badge: "Click to Enlarge" */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white/90 text-xs font-medium border border-white/20 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-md">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Enlarge</span>
              </div>
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
                {renderFormattedMessage(displayedMessage)}
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

              {/* Dedicated Call-to-Action Link Buttons */}
              {hasNotice && (announcement?.linkUrl || (announcement?.links && announcement.links.some(l => l.url.trim() !== ""))) && (
                <div className="mt-4 pt-1 flex flex-col sm:flex-row flex-wrap gap-3">
                  {/* Legacy Fallback */}
                  {announcement?.linkUrl && (!announcement.links || announcement.links.filter(l => l.url.trim() !== "").length === 0) && (
                    <a
                      href={
                        announcement.linkUrl.startsWith("http://") || 
                        announcement.linkUrl.startsWith("https://") || 
                        announcement.linkUrl.startsWith("/")
                          ? announcement.linkUrl
                          : `https://${announcement.linkUrl}`
                      }
                      target={announcement.linkUrl.startsWith("/") ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-95 text-primary-foreground font-semibold text-xs sm:text-sm shadow-md hover:shadow-primary/30 transition-all active:scale-[0.98] group/btn"
                    >
                      <Link2 className="w-4 h-4 shrink-0" />
                      <span className="truncate">{announcement.linkText?.trim() || "Open Notice Link"}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-80 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                  {/* New Multiple Links */}
                  {announcement?.links?.filter(l => l.url.trim() !== "").map((link, idx) => (
                    <a
                      key={idx}
                      href={
                        link.url.startsWith("http://") || 
                        link.url.startsWith("https://") || 
                        link.url.startsWith("/")
                          ? link.url
                          : `https://${link.url}`
                      }
                      target={link.url.startsWith("/") ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-95 text-primary-foreground font-semibold text-xs sm:text-sm shadow-md hover:shadow-primary/30 transition-all active:scale-[0.98] group/btn"
                    >
                      <Link2 className="w-4 h-4 shrink-0" />
                      <span className="truncate">{link.text?.trim() || "Open Notice Link"}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-80 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="relative z-10 pt-5 mt-4 border-t border-white/10 flex items-center justify-between gap-4">
          <Link
            href="/register"
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

      {/* Full-Screen Image Lightbox Modal */}
      <AnimatePresence>
        {isImageModalOpen && announcement?.imageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsImageModalOpen(false)}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/92 backdrop-blur-md p-4 sm:p-6 md:p-8 cursor-zoom-out"
          >
            {/* Top Control Bar */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl flex items-center justify-between pb-3 mb-2 border-b border-white/10"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Notice Image</span>
                <span className="text-xs text-white/50 hidden sm:inline">• {announcement.title || "Sri Management"}</span>
              </div>

              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all active:scale-95 shadow-lg"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
                <span>Close (Esc)</span>
              </button>
            </div>

            {/* Enlarged Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[82vh] flex items-center justify-center cursor-default"
            >
              <img
                src={announcement.imageUrl}
                alt={announcement.title || "Notice Flyer"}
                className="max-w-full max-h-[82vh] w-auto h-auto object-contain rounded-2xl border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.9)] select-none bg-black/40"
              />
            </motion.div>

            {/* Bottom Caption */}
            {announcement.title && (
              <div 
                onClick={(e) => e.stopPropagation()}
                className="mt-3 text-center text-sm font-medium text-white/80 max-w-2xl px-4"
              >
                {announcement.title}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
