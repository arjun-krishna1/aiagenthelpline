import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";

import "./globals.css";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
