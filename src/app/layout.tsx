import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";

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
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
