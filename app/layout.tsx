import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import "./globals.css";

const display = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const SITE_URL = "https://mindwell.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MindWell — Psychiatrist Consultation & Mental Wellness Care",
    template: "%s | MindWell",
  },
  description:
    "Connect with experienced psychiatrists for confidential online and in-person consultations. Compassionate, evidence-informed mental health care — anxiety, depression, sleep, ADHD and more.",
  keywords: [
    "psychiatrist consultation",
    "online psychiatrist",
    "mental health care",
    "anxiety treatment",
    "depression treatment",
    "mental wellness",
  ],
  authors: [{ name: "MindWell" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "MindWell",
    title: "MindWell — Your Mind Deserves Care, Understanding & Support",
    description:
      "Confidential consultations with experienced mental health professionals, online or in person.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "MindWell — Psychiatrist Consultation & Mental Wellness",
    description:
      "Confidential consultations with experienced mental health professionals, online or in person.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#F8F9F7",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body>
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
