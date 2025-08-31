import { GoogleAnalytics } from "@next/third-parties/google";
import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Suspense } from "react";
import { ClarityProvider } from "@/components/providers/clarity-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "rizzboard.milind.app",
    template: "%s — rizzboard.milind.app",
  },
  description:
    "A slick meme soundboard powered by Shadcn UI, Zustand, and use-sound.",
  metadataBase: new URL("https://rizzboard.milind.app"),
  openGraph: {
    title: "rizzboard.milind.app",
    description: "Play trendy meme sounds with a polished, responsive UI.",
    url: "https://rizzboard.milind.app",
    siteName: "rizzboard.milind.app",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "rizzboard.milind.app",
    description: "Play trendy meme sounds with a polished, responsive UI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <GoogleAnalytics gaId="G-2X8HJDFJ72" />
            <ClarityProvider />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
