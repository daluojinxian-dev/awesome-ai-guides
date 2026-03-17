"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { TRANSLATIONS } from "@/lib/data";

export default function NotFound() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-8">
            <Sparkles className="w-4 h-4" />
            404 Error - Page Not Found
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground/20">
            404
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {lang === "zh" ? "哎呀，页面迷路了" : "Oops! Page not found"}
          </h2>
          
          <p className="text-muted text-lg mb-12 max-w-md mx-auto">
            {lang === "zh" 
              ? "您访问的页面可能已被移动、删除，或者正在进行 AI 进化中。" 
              : "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/"
              className="px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
            >
              <Home className="w-5 h-5" />
              {lang === "zh" ? "回到首页" : "Back to Home"}
            </Link>
            
            <Link 
              href="/lab"
              className="px-8 py-4 bg-card border border-border rounded-2xl font-bold flex items-center gap-2 hover:bg-muted transition-all"
            >
              <Search className="w-5 h-5" />
              {lang === "zh" ? "探索提示词" : "Explore Prompts"}
            </Link>
          </div>

          <div className="mt-20 pt-8 border-t border-border/50">
            <p className="text-sm text-muted">
              {lang === "zh" 
                ? "在这个 AI 时代，我们都在不断进化 | onai.help" 
                : "Evolving constantly in this AI era | onai.help"}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
