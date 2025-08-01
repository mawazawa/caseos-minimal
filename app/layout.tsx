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
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
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
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
