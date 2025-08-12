import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Providers } from "./providers";
import { PerformanceMonitor } from "@/components/ui/performance-monitor";
import { LoadingBar } from "@/components/ui/loading-bar";
import { PageTransition } from "@/components/ui/page-transition";
import { initializePerformanceOptimizations } from "@/lib/utils/performance";

// Initialize the fonts with optimized loading
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize performance optimizations
  if (typeof window !== 'undefined') {
    initializePerformanceOptimizations();
  }
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload critical routes for faster navigation */}
        <link rel="prefetch" href="/features" />
        <link rel="prefetch" href="/about" />
        <link rel="prefetch" href="/dashboard" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased`}
      >
        <Providers>
          <LoadingBar />
          <PageTransition />
          <Header />
          <main className="font-plus-jakarta">{children}</main>
          <Footer />
          <PerformanceMonitor />
        </Providers>
      </body>
    </html>
  );
}
