"use client";

import { useState } from "react";
import { Search, Zap, Filter, ArrowLeft, BookMarked, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PromptBox from "@/components/PromptBox";
import Link from "next/link";

interface LabPrompt {
  id: string;
  title: string;
  desc: string;
  category: string;
  content: string;
}

export default function LabClient({ initialPrompts }: { initialPrompts: LabPrompt[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("全部");
  const [selectedPrompt, setSelectedPrompt] = useState<LabPrompt | null>(null);

  const categories = ["全部", ...Array.from(new Set(initialPrompts.map(p => p.category)))];

  const filteredPrompts = initialPrompts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === "全部" || p.category === activeCategory;
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">提示词实验室</h1>
            <p className="text-muted text-lg max-w-xl">
                预设专业级 AI 交互模版，填入变量即可获得最优结果。不再为“怎么写 Prompt”而烦恼。
            </p>
          </motion.div>
          
          <div className="md:w-72 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="搜索模版..."
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
                立即配置模板 <ArrowLeft className="w-3 h-3 rotate-180" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedPrompt && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed inset-x-0 bottom-0 z-[100] p-6 pointer-events-none"
          >
            <div className="max-w-4xl mx-auto glass-card-solid border-primary/30 shadow-2xl p-8 rounded-3xl pointer-events-auto relative overflow-hidden">
                <button 
                  onClick={() => setSelectedPrompt(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-primary/10 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 rotate-90" />
                </button>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                    正在配置：{selectedPrompt.title}
                  </h2>
                  <p className="text-muted text-sm">{selectedPrompt.desc}</p>
                </div>
                <PromptBox content={selectedPrompt.content} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredPrompts.length === 0 && (
        <div className="text-center py-24 text-muted">
          <p className="text-lg">未找到相关模版，换个词试试？</p>
        </div>
      )}
    </main>
  );
}
