import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LenisProvider from "@/components/providers/LenisProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "I-Net Secure Labs | Enterprise Cybersecurity & Intelligence",
  description:
    "I-Net Secure Labs delivers enterprise-grade cybersecurity solutions, threat intelligence, and digital transformation services for global organizations.",
  keywords: [
    "cybersecurity",
    "enterprise security",
    "threat intelligence",
    "I-Net Secure Labs",
    "digital transformation",
  ],
  authors: [{ name: "I-Net Secure Labs" }],
  openGraph: {
    title: "I-Net Secure Labs | Enterprise Cybersecurity & Intelligence",
    description:
      "Enterprise-grade cybersecurity solutions and digital transformation services.",
    type: "website",
    locale: "en_US",
    siteName: "I-Net Secure Labs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <Header />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
