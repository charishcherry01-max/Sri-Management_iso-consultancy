"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  Upload, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Lock, 
  Sparkles, 
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Maximize2,
  X
} from "lucide-react";

export default function NoticeAdminPage() {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  const [active, setActive] = useState(true);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [previewExpanded, setPreviewExpanded] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch current announcement
  useEffect(() => {
    const loadCurrent = async () => {
      try {
        setFetching(true);
        const res = await fetch("/api/announcement", { cache: "no-store" });
        const data = await res.json();
        if (data.success && data.data) {
          setActive(Boolean(data.data.active));
          setTitle(data.data.title || "");
          setMessage(data.data.message || "");
          setImageUrl(data.data.imageUrl || "");
        }
      } catch (err) {
        console.error("Failed to fetch announcement:", err);
      } finally {
        setFetching(false);
      }
    };
    loadCurrent();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "1234") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect PIN. (Default test PIN is 1234)");
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const rawResult = event.target?.result as string;
      const img = new window.Image();
      img.onload = () => {
        const maxWidth = 1200;
        const maxHeight = 1200;
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL("image/jpeg", 0.85);
          setImageUrl(compressed);
        } else {
          setImageUrl(rawResult);
        }
      };
      img.src = rawResult;
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/announcement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          active,
          title,
          message,
          imageUrl,
          password: pin
        }),
      });

      const result = await res.json();
      if (result.success) {
        setStatusMessage({ type: "success", text: "Notice updated successfully! It is now live on the website." });
        try {
          localStorage.setItem("sri_hero_notice_v1", JSON.stringify(result.data));
        } catch (e) {}
      } else {
        setStatusMessage({ type: "error", text: result.message || "Failed to update notice." });
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Network error." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-4">
            <Bell className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Admin Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground mb-3">
            Daily Notice & Announcement Manager
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Update today's message and poster. Changes will immediately appear in the visitor popup dialog.
          </p>
        </div>

        {/* PIN Verification Screen */}
        {!isAuthenticated ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto glass rounded-3xl p-8 border border-white/10 text-center shadow-xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-6 text-primary">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Enter Staff PIN</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Enter your access PIN to edit the website notice.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter PIN (Default: 1234)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full text-center tracking-widest text-xl px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                autoFocus
              />

              {authError && (
                <div className="flex items-center justify-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all shadow-lg hover:shadow-primary/30"
              >
                Unlock Notice Editor
              </button>
            </form>
          </motion.div>
        ) : (
          /* Editor + Live Preview Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 glass rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-6"
            >
              <form onSubmit={handleSave} className="space-y-6">
                {/* Status Toggle */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-heading font-bold text-foreground block text-base">
                      Popup Visibility
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {active ? "Notice is ACTIVE and visible to visitors." : "Notice is HIDDEN / OFF."}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActive(!active)}
                    className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                      active ? "bg-primary" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        active ? "translate-x-8" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Notice Title / Headline
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. ISO 9001:2015 Training Batch"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary text-sm"
                  />
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Notice Description / Message
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type details, timings, announcements, or important updates..."
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary text-sm leading-relaxed"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Flyer / Poster Photo (Optional)
                  </label>
                  
                  {imageUrl ? (
                    <div className="relative rounded-2xl overflow-hidden border border-primary/30 p-2 bg-black/40">
                      <img 
                        src={imageUrl} 
                        alt="Notice preview" 
                        className="w-full h-48 object-contain rounded-xl bg-black/50" 
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-4 right-4 p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-xl shadow-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
                      >
                        <Trash2 className="w-4 h-4" /> Remove Photo
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-white/20 hover:border-primary/60 rounded-2xl p-6 text-center cursor-pointer transition-all hover:bg-primary/5"
                    >
                      <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                      <span className="text-sm font-semibold text-foreground block">
                        Click to choose photo from phone/computer
                      </span>
                      <span className="text-xs text-muted-foreground mt-1 block">
                        PNG, JPG, JPEG up to 4MB
                      </span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>

                {/* Status Alert */}
                {statusMessage && (
                  <div
                    className={`p-4 rounded-xl flex items-center gap-3 text-sm ${
                      statusMessage.type === "success"
                        ? "bg-green-500/15 border border-green-500/30 text-green-300"
                        : "bg-red-500/15 border border-red-500/30 text-red-300"
                    }`}
                  >
                    {statusMessage.type === "success" ? (
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                    )}
                    <span>{statusMessage.text}</span>
                  </div>
                )}

                {/* Submit Action */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Save & Publish Notice</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTitle("");
                      setMessage("");
                      setImageUrl("");
                    }}
                    className="py-3.5 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white border border-white/10 text-sm font-semibold transition-colors"
                  >
                    Clear Fields
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Live Visitor Preview Column */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-5 space-y-4"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground px-2">
                <Eye className="w-4 h-4 text-primary" />
                <span>Live Preview (How visitors see it)</span>
              </div>

              <div className="bg-[#081226] border border-primary/30 rounded-3xl p-6 shadow-2xl space-y-4">
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

                {imageUrl && (
                  <div 
                    onClick={() => setIsImageModalOpen(true)}
                    className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/50 max-h-56 flex items-center justify-center cursor-zoom-in group transition-all hover:border-primary/50"
                    title="Click to view full screen"
                  >
                    <img 
                      src={imageUrl} 
                      alt="Preview" 
                      className="w-full h-auto max-h-56 object-contain rounded-2xl transition-transform duration-300 group-hover:scale-[1.02]" 
                    />
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-white/90 text-[11px] font-medium border border-white/20 flex items-center gap-1 shadow-md">
                      <Maximize2 className="w-3 h-3 text-primary" />
                      <span>Enlarge</span>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-lg font-heading font-bold text-foreground leading-snug">
                    {title || "Notice Title will appear here"}
                  </h4>
                  <div className="mt-2">
                    <p className={`text-sm text-muted-foreground whitespace-pre-line leading-relaxed transition-all duration-300 ${!previewExpanded && (message.length > 140 || message.split('\n').length > 3) ? "line-clamp-3" : ""}`}>
                      {message || "Notice message and description will appear here..."}
                    </p>
                    {(message.length > 140 || message.split('\n').length > 3) && (
                      <button
                        type="button"
                        onClick={() => setPreviewExpanded(!previewExpanded)}
                        className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent bg-primary/10 px-3 py-1 rounded-xl border border-primary/30"
                      >
                        <span>{previewExpanded ? "Show Less" : "Read Full Notice"}</span>
                        {previewExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-primary font-semibold flex items-center gap-1">
                    Inquire About This <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-muted-foreground">Contact Office →</span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground text-center p-3 glass rounded-2xl border border-white/5">
                💡 Tip: Your team member can bookmark this page on their phone to update notices in seconds anytime!
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Full-Screen Lightbox Modal for Preview */}
      <AnimatePresence>
        {isImageModalOpen && imageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsImageModalOpen(false)}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/92 backdrop-blur-md p-4 sm:p-6 md:p-8 cursor-zoom-out"
          >
            {/* Top Bar */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl flex items-center justify-between pb-3 mb-2 border-b border-white/10"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Preview Image</span>
                <span className="text-xs text-white/50 hidden sm:inline">• {title || "Daily Notice Preview"}</span>
              </div>

              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all active:scale-95 shadow-lg"
              >
                <X className="w-4 h-4" />
                <span>Close (Esc)</span>
              </button>
            </div>

            {/* Enlarged Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[82vh] flex items-center justify-center cursor-default"
            >
              <img
                src={imageUrl}
                alt="Enlarged Preview"
                className="max-w-full max-h-[82vh] w-auto h-auto object-contain rounded-2xl border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.9)] select-none bg-black/40"
              />
            </motion.div>

            {title && (
              <div 
                onClick={(e) => e.stopPropagation()}
                className="mt-3 text-center text-sm font-medium text-white/80 max-w-2xl px-4"
              >
                {title}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
