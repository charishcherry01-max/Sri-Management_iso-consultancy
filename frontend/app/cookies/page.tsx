import { GlassCard } from "@/components/GlassCard";
import { Cookie, ShieldCheck, Settings2, Info } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Sri Management Consultancy",
  description: "Understand how Sri Management uses cookies and similar technologies to enhance your browsing experience.",
};

export default function CookiePage() {
  return (
    <div className="pt-32 pb-20 min-h-screen container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6">
            <Cookie className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Transparent Tracking</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Cookie Policy
          </h1>
          <p className="text-muted-foreground text-sm">
            Last Updated: September 2024 &bull; Sri Management Consultancy
          </p>
        </div>

        <GlassCard className="p-8 md:p-12 space-y-8 border-primary/20">
          <section className="space-y-3">
            <h2 className="text-2xl font-heading font-bold text-foreground flex items-center gap-3">
              <Info className="w-6 h-6 text-primary" /> What Are Cookies?
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Cookies are small data text files placed on your browser or device when you visit websites. They help websites remember preferences, analyze site performance, and ensure smooth security and session management.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-heading font-bold text-foreground">
              Cookies We Use on Sri Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4" /> Strictly Necessary Cookies
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Required for core platform navigation, secure form transmissions, and server load balancing. These cannot be disabled.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-accent font-semibold text-sm">
                  <Settings2 className="w-4 h-4" /> Performance & Analytics
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Help us understand how visitors interact with our standard pages and consultation forms, allowing continuous speed and usability improvements.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-foreground">
              Managing Your Cookie Preferences
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Most modern web browsers allow you to manage or block cookies through browser settings. Please note that disabling essential cookies may impact interactive features, such as form submissions and session persistence.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-foreground">
              Questions & Inquiries
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              For any questions regarding our cookie practices, contact us at: <a href="mailto:sri.qci@gmail.com" className="text-primary hover:underline">sri.qci@gmail.com</a>.
            </p>
          </section>
        </GlassCard>
      </div>
    </div>
  );
}
