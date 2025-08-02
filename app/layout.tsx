/*
 * ██████╗  ██████╗  ██████╗ ████████╗    ██╗      █████╗ ██╗   ██╗ ██████╗ ██╗   ██╗████████╗
 * ██╔══██╗██╔═══██╗██╔═══██╗╚══██╔══╝    ██║     ██╔══██╗╚██╗ ██╔╝██╔═══██╗██║   ██║╚══██╔══╝
 * ██████╔╝██║   ██║██║   ██║   ██║       ██║     ███████║ ╚████╔╝ ██║   ██║██║   ██║   ██║
 * ██╔══██╗██║   ██║██║   ██║   ██║       ██║     ██╔══██║  ╚██╔╝  ██║   ██║██║   ██║   ██║
 * ██║  ██║╚██████╔╝╚██████╔╝   ██║       ███████╗██║  ██║   ██║   ╚██████╔╝╚██████╔╝   ██║
 * ╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝       ╚══════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝  ╚═════╝    ╚═╝
 * Root Layout - CaseOS Linear-inspired Design System
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Providers } from "./providers";
import { CommandPalette } from "./components/motion";
import { THEME_SCRIPT } from "./components/theme";

// Enhanced Inter Variable Font Configuration for Premium Typography
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  // Optimize font loading with preload
  preload: true,
  // Fallback fonts for optimal loading
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "system-ui",
    "sans-serif"
  ],
  // Use variable weight for optimal performance
  weight: "variable",
  // Enable advanced font features
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "CaseOS™ - Legal AI for Self-Represented Litigants",
  description: "Revolutionary access to justice platform empowering the 75% of litigants navigating the legal system alone. AI-powered case management, document generation, and legal guidance.",
  keywords: ["legal AI", "self-represented litigants", "legal tech", "case management", "access to justice"],
  authors: [{ name: "CaseOS Team" }],
  openGraph: {
    title: "CaseOS™ - Legal AI for Self-Represented Litigants",
    description: "Revolutionary access to justice platform empowering legal self-representation.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#5E6AD2" },
    { media: "(prefers-color-scheme: dark)", color: "#7C3AED" }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Theme script to prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body
        className="font-sans antialiased"
        style={{
          transition: 'var(--theme-transition, none)',
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-text-primary)'
        }}
      >
        <Providers>
          {children}
          {/* Global Command Palette (⌘K) */}
          <CommandPalette />
          {/* Vercel Analytics */}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
