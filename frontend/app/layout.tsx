import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.srimanagement.in'),
  title: "AI-Powered ISO Compliance Platform | SRI Management",
  description: "Transform Your Organization with AI-Powered ISO Compliance",
  openGraph: {
    title: "AI-Powered ISO Compliance Platform | SRI Management",
    description: "Transform Your Organization with AI-Powered ISO Compliance",
    url: "https://www.srimanagement.in",
    siteName: "SRI Management",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased text-foreground min-h-screen flex flex-col`}>
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
