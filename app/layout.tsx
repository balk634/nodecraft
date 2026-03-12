import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono, Raleway } from "next/font/google"; // Using Raleway as body font
import "./globals.css";
import { masterConfig } from "@/config/master";
import { JsonLd } from "@/components/seo/JsonLd";
import { ConsentAwareAnalytics } from "@/components/analytics/ConsentAwareAnalytics";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { PerformanceEnhancements } from "@/components/ui/PerformanceEnhancements";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(masterConfig.metadata.baseUrl),
  title: masterConfig.metadata.title,
  description: masterConfig.metadata.description,
  alternates: {
    canonical: "/",
  },
  keywords: masterConfig.metadata.keywords,
  authors: masterConfig.metadata.authors,
  creator: masterConfig.metadata.creator,
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    shortcut: [{ url: "/favicon/favicon.ico" }],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "Nodecraft",
    statusBarStyle: "default",
  },
  openGraph: {
    ...masterConfig.metadata.openGraph,
    title: masterConfig.metadata.title,
    description: masterConfig.metadata.description,
  },
  twitter: {
    ...masterConfig.metadata.twitter,
    title: masterConfig.metadata.title,
    description: masterConfig.metadata.description,
    images: masterConfig.metadata.openGraph.images?.[0]?.url,
  },
};

export const viewport: Viewport = {
  themeColor: masterConfig.colors.background,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${raleway.variable} font-body antialiased bg-paper text-ink overflow-x-hidden w-full`}
        style={
          {
            "--pattern-opacity": String(masterConfig.ui.pattern.opacity),
            "--pattern-size": `${masterConfig.ui.pattern.sizePx}px`,
            "--pattern-drift-duration": `${masterConfig.ui.pattern.drift.durationSeconds}s`,
            "--pattern-drift-x": `${masterConfig.ui.pattern.drift.shiftXPx}px`,
            "--pattern-drift-y": `${masterConfig.ui.pattern.drift.shiftYPx}px`,
            "--truststrip-duration": `${masterConfig.ui.motion.trustStrip.durationSeconds}s`,
            "--mi-easing": masterConfig.ui.microInteractions.easing,
            "--mi-duration-fast": `${masterConfig.ui.microInteractions.durationFastMs}ms`,
            "--mi-duration-base": `${masterConfig.ui.microInteractions.durationBaseMs}ms`,
            "--mi-duration-slow": `${masterConfig.ui.microInteractions.durationSlowMs}ms`,
            "--mi-card-hover-lift": `${masterConfig.ui.microInteractions.cardHoverLiftPx}px`,
            "--mi-button-lift": `${masterConfig.ui.microInteractions.buttonLiftPx}px`,
            "--mi-button-press-scale": String(masterConfig.ui.microInteractions.buttonPressScale),
            "--mi-link-slide": `${masterConfig.ui.microInteractions.linkSlidePx}px`,
            "--mi-faq-slide": `${masterConfig.ui.microInteractions.faqSlidePx}px`,
            "--mi-list-slide": `${masterConfig.ui.microInteractions.listSlidePx}px`,
            "--mi-card-icon-scale": String(masterConfig.ui.microInteractions.cardIconScale),
            "--process-connector-dot-color": masterConfig.ui.processConnector.dotColor,
            "--process-connector-dot-size": `${masterConfig.ui.processConnector.dotSizePx}px`,
            "--process-connector-dot-opacity-min": String(masterConfig.ui.processConnector.dotOpacityMin),
            "--process-connector-dot-opacity-max": String(masterConfig.ui.processConnector.dotOpacityMax),
            "--process-connector-duration": `${masterConfig.ui.processConnector.durationMs}ms`,
            "--process-connector-delay-2": `${masterConfig.ui.processConnector.staggerMs}ms`,
            "--process-connector-delay-3": `${masterConfig.ui.processConnector.staggerMs * 2}ms`,
            "--color-paper": masterConfig.colors.background,
            "--color-primary": masterConfig.colors.primary,
            "--color-grid": masterConfig.colors.grid,
            "--color-ink": masterConfig.colors.secondary,
            "--color-ink-muted": masterConfig.colors.muted,
            "--cursor-hover": `url("data:image/svg+xml,${encodeURIComponent(
              `<svg xmlns='http://www.w3.org/2000/svg' width='${masterConfig.ui.cursor.size}' height='${masterConfig.ui.cursor.size}' viewBox='0 0 ${masterConfig.ui.cursor.size} ${masterConfig.ui.cursor.size}'><circle cx='${masterConfig.ui.cursor.size / 2}' cy='${masterConfig.ui.cursor.size / 2}' r='${masterConfig.ui.cursor.radius}' fill='none' stroke='${masterConfig.ui.cursor.color}' stroke-width='${masterConfig.ui.cursor.strokeWidth}'/></svg>`
            )}") ${masterConfig.ui.cursor.size / 2} ${masterConfig.ui.cursor.size / 2}, pointer`,
          } as React.CSSProperties
        }
      >
        <JsonLd />
        <ConsentAwareAnalytics measurementId={masterConfig.analytics?.googleAnalyticsId} />
        <PerformanceEnhancements
          enableSmoothScroll={masterConfig.ui.motion.smoothScroll}
          enableMicroInteractions={masterConfig.ui.microInteractions.enabled}
          enableScrollProgress={masterConfig.ui.motion.scrollProgress}
        />
        {masterConfig.ui.pattern.enabled ? (
          <div
            aria-hidden
            className={masterConfig.ui.pattern.drift.enabled ? "pattern-overlay pattern-overlay--animated" : "pattern-overlay"}
          />
        ) : null}
        <div className="min-h-screen min-h-[100svh] flex flex-col relative z-10 w-full overflow-x-hidden">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
