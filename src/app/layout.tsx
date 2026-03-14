import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "AI 进化指南 | 顶级 AI 工具导航与本地搭建教程",
  description: "一站式整理全球顶尖 AI 工具、本地大模型(Ollama, DeepSeek)搭建教程与提效技巧。助你在这个 AI 时代保持进化。",
};

import Sidebar from "@/components/Sidebar";
import { LanguageProvider } from "@/components/LanguageProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2080736717923199"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased flex min-h-screen bg-mesh">
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Sidebar />
            <div className="flex-grow md:pl-64 transition-all duration-300">
              {children}
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
