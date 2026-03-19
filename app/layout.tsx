import type { Metadata } from "next";
import { Inter, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionProvider } from "@/components/motion-provider";
import { Header } from "@/components/Header";
import { RecruiterEasterEgg } from "@/components/interactive/RecruiterEasterEgg";
import { ClickEffect } from "@/components/interactive/ClickEffect";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swaminathan B — Full Stack Developer",
  description:
    "Full stack developer building SaaS and Shopify applications with React, Node.js, and workflow automation systems.",
  openGraph: {
    title: "Swaminathan B — Full Stack Developer",
    description:
      "Full stack developer building SaaS and Shopify applications with React, Node.js, and workflow automation systems.",
    url: "https://swami13.vercel.app",
    siteName: "Swaminathan B Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${inter.variable} ${geist.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#121212] text-[#EDEDED] selection:bg-[#3ecf8e]/30 selection:text-white relative`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MotionProvider>
            <Header />
            {children}
            <ClickEffect />
            <RecruiterEasterEgg />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
