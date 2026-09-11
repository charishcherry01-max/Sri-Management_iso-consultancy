import { GlassCard } from "@/components/GlassCard";
import { FileText, ShieldCheck, Scale, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Sri Management Consultancy",
  description: "Terms and conditions governing the provision of ISO consultancy, documentation, and training by Sri Management Consultancy.",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6">
            <Scale className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Legal Agreement</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-sm">
            Last Updated: September 2024 &bull; Sri Management Consultancy
          </p>
        </div>

        <GlassCard className="p-8 md:p-12 space-y-8 border-primary/20">
          <section className="space-y-3">
            <h2 className="text-2xl font-heading font-bold text-foreground flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" /> 1. Scope of Services
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Sri Management Consultancy provides advisory, documentation assistance, gap analysis, internal auditing, and personnel training for international management standards including, but not limited to, ISO 9001, ISO 27001, ISO 14001, ISO 45001, ISO 22000, ISO 15189, and ISO 42001. All engagements are advisory in nature and aimed at enabling organizations to meet international accreditation criteria.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-foreground">
              2. Independent Accreditation & Certification Role
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Sri Management operates as an independent consultancy and training organization. In strict accordance with international accreditation guidelines (such as ISO/IEC 17021), final certification audits are conducted by independent third-party certification bodies registered with global accreditation forums (e.g., IAF, NABCB). Sri Management prepares the client, provides audit liaison, and assists in closing out corrective actions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-foreground">
              3. Client Responsibilities
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Successful implementation and certification depend on collaborative execution. Clients agree to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1.5 pl-2">
              <li>Designate a management representative or internal audit coordinator to liaise with our lead consultants.</li>
              <li>Provide accurate operational information, records, and access necessary for realistic gap analysis and internal audits.</li>
              <li>Commit organizational staff to scheduled training sessions and management review meetings.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-foreground">
              4. Confidentiality & Intellectual Property
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              All proprietary procedures, manuals, templates, and training materials created by Sri Management for your organization become your property upon completion of the contractual terms. Both parties agree to hold all technical and commercial information strictly confidential.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-foreground">
              5. Governing Law & Dispute Resolution
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              These terms shall be governed by and interpreted in accordance with the laws of India. Any disputes arising in connection with our services shall be subject to the exclusive jurisdiction of the courts located in Hyderabad, Telangana, India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-foreground">
              6. Contact Information
            </h2>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm space-y-1">
              <p className="text-foreground font-semibold">Sri Management Consultancy</p>
              <p className="text-muted-foreground">Office: G-10, 12-12-999, Kiran Heights Apartments, Bharath Nagar, Hyderabad, India</p>
              <p className="text-muted-foreground">Contact: <a href="mailto:sri.qci@gmail.com" className="text-primary hover:underline">sri.qci@gmail.com</a> | +91 89774 02032</p>
            </div>
          </section>
        </GlassCard>
      </div>
    </div>
  );
}
