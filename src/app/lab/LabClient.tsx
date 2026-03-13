"use client";

import { useState } from "react";
import { Search, Zap, Filter, ArrowLeft, BookMarked, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PromptBox from "@/components/PromptBox";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { TRANSLATIONS } from "@/lib/data";

interface LabPrompt {
  id: string;
  title: string;
  desc: string;
  category: string;
  content: string;
}

export default function LabClient({ initialPrompts }: { initialPrompts: LabPrompt[] }) {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(t.labAll);
  const [selectedPrompt, setSelectedPrompt] = useState<LabPrompt | null>(null);

  const categories = [t.labAll, ...Array.from(new Set(initialPrompts.map(p => p.category)))];

  const filteredPrompts = initialPrompts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === t.labAll || p.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <main className="min-h-screen pt-24 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
      <header className="mb-12 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3 h-3" />
              AI Prompt Laboratory
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{t.labTitle}</h1>
            <p className="text-muted text-lg max-w-xl">
                {t.labSubtitle}
            </p>
          </motion.div>
          
          <div className="md:w-72 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder={t.labSearchPlaceholder}
              className="w-full bg-card/50 border border-border rounded-xl pl-11 pr-4 py-3 outline-none focus:border-primary/50 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 justify-center md:justify-start">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeCategory === cat 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : "bg-card border border-border text-muted hover:border-primary/30 hover:text-primary"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredPrompts.map((prompt) => (
            <motion.div
              layout
              key={prompt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setSelectedPrompt(prompt)}
              className={`
                group cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex flex-col h-full
                ${selectedPrompt?.id === prompt.id 
                  ? "bg-primary/5 border-primary shadow-2xl" 
                  : "bg-card border-border hover:border-primary/30 shadow-xl hover:shadow-primary/5"}
              `}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                  {prompt.category}
                </div>
                <Zap className={`w-4 h-4 transition-colors ${selectedPrompt?.id === prompt.id ? "text-primary fill-primary" : "text-muted group-hover:text-primary"}`} />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{prompt.title}</h3>
              <p className="text-sm text-muted mb-6 flex-grow">{prompt.desc}</p>
              <div className="flex items-center gap-2 text-xs font-bold text-primary group-hover:underline">
                {t.labConfigure} <ArrowLeft className="w-3 h-3 rotate-180" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedPrompt && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            {/* 灵感遮罩：通透的磨砂质感，让焦点完全集中 */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPrompt(null)}
              className="absolute inset-0 bg-background/70 backdrop-blur-2xl"
            />
            
            {/* 居中悬浮实验室卡片 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="w-full max-w-4xl bg-card border border-primary/20 shadow-[0_32px_128px_-10px_rgba(0,0,0,0.3)] rounded-[2.5rem] relative z-10 flex flex-col h-full max-h-[85vh] overflow-hidden"
            >
                {/* 顶部标题栏：带有特殊的渐变背景以增加层次感 */}
                <div className="p-6 md:p-10 border-b border-border/50 flex items-center justify-between bg-card/50 backdrop-blur-md relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.1em] mb-3">
                      {selectedPrompt.category}
                    </div>
                    <h2 className="text-xl md:text-3xl font-bold mb-1 flex items-center gap-3">
                      <Sparkles className="w-6 h-6 text-primary" />
                      {t.labCurrentConfig}{selectedPrompt.title}
                    </h2>
                    <p className="text-muted text-sm md:text-base opacity-80">{selectedPrompt.desc}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedPrompt(null)}
                    className="p-3 hover:bg-primary/10 rounded-2xl transition-all hover:scale-110 active:scale-90 border border-transparent hover:border-primary/20"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* 内容配置区：深色衬托提升专注度 */}
                <div className="flex-grow overflow-y-auto p-6 md:px-10 md:py-8 custom-scrollbar bg-background/20">
                  <PromptBox content={selectedPrompt.content} />
                </div>

                {/* 底部装饰 */}
                <div className="px-10 py-4 bg-muted/30 text-[10px] text-muted text-center font-mono opacity-40 uppercase tracking-[0.3em]">
                  Focused Interaction / AI Evolution Lab
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {filteredPrompts.length === 0 && (
        <div className="text-center py-24 text-muted">
          <p className="text-lg">{t.labEmpty}</p>
        </div>
      )}
    </main>
  );
}
