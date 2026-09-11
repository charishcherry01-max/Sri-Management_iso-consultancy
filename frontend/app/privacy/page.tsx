import { GlassCard } from "@/components/GlassCard";
import { Shield, Lock, FileText, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Sri Management Consultancy",
  description: "Learn how Sri Management handles and protects your organization's compliance and personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Data Protection & Privacy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm">
            Last Updated: September 2024 &bull; Sri Management Consultancy
          </p>
        </div>

        <GlassCard className="p-8 md:p-12 space-y-8 border-primary/20">
          <section className="space-y-3">
            <h2 className="text-2xl font-heading font-bold text-foreground flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" /> 1. Commitment to Confidentiality
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Sri Management Consultancy (&quot;Sri Management&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) provides ISO consultancy, gap analysis, training, and documentation support to businesses and individuals globally. We understand the sensitive nature of quality records, proprietary operating procedures, and personnel information shared during ISO compliance programs. We hold all client data to strict confidentiality standards aligned with ISO 27001 principles.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-foreground">
              2. Information We Collect
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              We collect information that you directly provide when requesting a consultation, registering for an ISO standard, or communicating with our lead auditors:
            </p>
            <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1.5 pl-2">
              <li><strong>Contact Identifiers:</strong> Name, professional email address, telephone number, and physical office location.</li>
              <li><strong>Organizational Details:</strong> Company legal name, employee headcount, current operational scope, and target ISO standard(s).</li>
              <li><strong>Operational Records:</strong> Draft policies, process flowcharts, risk registries, or internal audit findings provided voluntarily for gap analysis.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-foreground">
              3. How We Use Your Information
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Your information is strictly used to deliver professional ISO management services:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/90">Preparing customized ISO gap assessments and compliance roadmaps.</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/90">Conducting internal auditor and lead implementor training programs.</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/90">Coordinating Stage 1 and Stage 2 certification audits with accredited registrars.</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/90">Responding directly to your inquiries and consultation requests.</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-foreground">
              4. Non-Disclosure & Third-Party Sharing
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              We <strong>do not sell, lease, or monetize</strong> client information. Information is only shared with accredited certification bodies upon your explicit written authorization for final audit scheduling, or when required by governing law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-foreground">
              5. Contact Us Regarding Your Privacy
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              If you have any questions regarding this Privacy Policy or wish to request data updates, please contact our data governance team at:
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm space-y-1">
              <p className="text-foreground font-semibold">Sri Management Consultancy</p>
              <p className="text-muted-foreground">Address: G-10, 12-12-999, Kiran Heights Apartments, Bharath Nagar, Hyderabad, India</p>
              <p className="text-muted-foreground">Email: <a href="mailto:sri.qci@gmail.com" className="text-primary hover:underline">sri.qci@gmail.com</a> / <a href="mailto:sri.isoofficial@gmail.com" className="text-primary hover:underline">sri.isoofficial@gmail.com</a></p>
              <p className="text-muted-foreground">Phone: +91 89774 02032 / +91 81796 29984</p>
            </div>
          </section>
        </GlassCard>
      </div>
    </div>
  );
}
