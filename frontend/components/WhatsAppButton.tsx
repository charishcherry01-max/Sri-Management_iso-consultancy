"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // WhatsApp configuration
  const phoneNumber = "918977402032";
  const defaultMessage = encodeURIComponent(
    "Hello Sri Management, I would like to inquire about ISO Certification and Consulting services."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  // Automatically pop up tooltip after 3 seconds for enhanced engagement
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Interactive Tooltip / Greeting Bubble */}
      <AnimatePresence>
        {showTooltip && !isDismissed && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="mb-3 mr-1 bg-[#081226]/95 border border-[#25D366]/40 backdrop-blur-xl rounded-2xl p-3.5 shadow-[0_10px_35px_rgba(0,0,0,0.6)] max-w-xs relative group"
          >
            {/* Close Tooltip Button */}
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center text-xs transition-colors shadow"
              aria-label="Close tooltip"
            >
              <X className="w-3 h-3" />
            </button>

            <div className="flex items-start gap-3">
              <div className="relative mt-0.5">
                <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] ring-2 ring-[#081226]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white tracking-wide">Sri Management</span>
                  <span className="text-[10px] font-medium text-[#25D366] bg-[#25D366]/15 px-1.5 py-0.2 rounded-full">
                    Online
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">
                  Need quick assistance with ISO certification? Chat with our lead auditors on WhatsApp!
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#25D366] hover:underline"
                >
                  Start WhatsApp Chat →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Sri Management on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#20ba5a] to-[#25D366] text-white shadow-[0_10px_35px_rgba(37,211,102,0.45)] hover:shadow-[0_14px_45px_rgba(37,211,102,0.65)] transition-all duration-300"
      >
        {/* Pulsing radar rings for attention */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
        <span className="absolute inset-0 rounded-full border-2 border-white/30 group-hover:border-white/60 transition-colors pointer-events-none" />

        {/* Official WhatsApp SVG Icon */}
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          stroke="currentColor"
          strokeWidth="0"
          fill="currentColor"
          className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-md transition-transform duration-300 group-hover:rotate-6"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>

        {/* Hover Pill Label on Desktop */}
        <span className="absolute right-full mr-3 hidden sm:group-hover:inline-flex items-center whitespace-nowrap bg-[#081226]/90 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg backdrop-blur-md pointer-events-none transition-all">
          Chat with us on WhatsApp
        </span>
      </motion.a>
    </div>
  );
};
