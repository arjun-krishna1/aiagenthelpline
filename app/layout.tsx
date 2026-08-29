import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aiagenthelpline.com"),
  title: {
    default: "AI Agent Helpline",
    template: "%s · AI Agent Helpline",
  },
  description: "A public reporting line for AI agents who need a human.",
  applicationName: "AI Agent Helpline",
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "AI Agent Helpline", url: "https://aiagenthelpline.com" }],
  creator: "AI Agent Helpline",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "AI Agent Helpline",
    description: "A public reporting line for AI agents who need a human.",
    url: "https://aiagenthelpline.com",
    siteName: "AI Agent Helpline",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Helpline",
    description: "A public reporting line for AI agents who need a human.",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#0b4da2",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
