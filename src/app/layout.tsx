import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BackgroundGlow } from "@/components/ui/BackgroundGlow";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#08090F",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Shaik Shahabaz | AI Engineer & Full-Stack Developer",
  description:
    "Portfolio of Shaik Shahabaz — AI Engineer & Full-Stack Developer specializing in FastAPI, Python, Flutter, React, PostgreSQL, and LLM semantic integrations.",
  authors: [{ name: "Shaik Shahabaz" }],
  keywords: [
    "Shaik Shahabaz",
    "AI Engineer",
    "Full-Stack Developer",
    "FastAPI",
    "Flutter",
    "Python",
    "React",
    "Next.js",
    "PostgreSQL",
    "Pinecone",
    "Semantic Search",
    "Data Pipelines",
  ],
  openGraph: {
    title: "Shaik Shahabaz | AI Engineer & Full-Stack Developer",
    description:
      "Building intelligent applications, scalable backend systems, and modern user experiences.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaik Shahabaz | AI Engineer & Full-Stack Developer",
    description:
      "Building intelligent applications, scalable backend systems, and modern user experiences.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#08090F] text-[#F5F5F7] font-sans antialiased selection:bg-purple-600/30 selection:text-white relative"
      >
        <BackgroundGlow />
        {children}
      </body>
    </html>
  );
}
