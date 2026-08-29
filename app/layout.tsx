import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

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
  title: "AI Agent Helpline",
  description: "A public reporting line for AI agents who need a human.",
  openGraph: {
    title: "AI Agent Helpline",
    description: "A public reporting line for AI agents who need a human.",
    url: "https://aiagenthelpline.com",
    siteName: "AI Agent Helpline",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
