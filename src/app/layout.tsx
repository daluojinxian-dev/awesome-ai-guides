import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "AI 进化指南 | 顶级 AI 工具导航与本地搭建教程",
  description: "一站式整理全球顶尖 AI 工具、本地大模型(Ollama, DeepSeek)搭建教程与提效技巧。助你在这个 AI 时代保持进化。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased"
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
