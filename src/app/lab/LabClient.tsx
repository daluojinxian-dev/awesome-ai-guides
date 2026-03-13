"use client";

import { useState } from "react";
import { Search, Zap, Filter, ArrowLeft, BookMarked, Sparkles, X } from "lucide-react";
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
          <div className="fixed inset-0 z-[100] flex justify-end">
            {/* 更加科技感的遮罩：背景模糊 + 主题色柔化 */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPrompt(null)}
              className="absolute inset-0 bg-background/40 backdrop-blur-xl transition-all"
            />
            
            {/* 侧边抽屉面板 */}
            <motion.div 
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.5 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-2xl bg-card border-l border-border shadow-[-20px_0_50px_rgba(0,0,0,0.1)] relative z-10 flex flex-col h-full"
            >
                {/* 面板头部 */}
                <div className="p-6 md:p-8 border-b border-border/50 flex items-start justify-between bg-card/80 backdrop-blur-md sticky top-0 z-20">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-2">
                      {selectedPrompt.category}
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold mb-1 flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-primary" />
                      {selectedPrompt.title}
                    </h2>
                    <p className="text-muted text-xs md:text-sm">{selectedPrompt.desc}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedPrompt(null)}
                    className="p-2 hover:bg-primary/10 rounded-full transition-all hover:rotate-90"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* 配置区域 - 自带滚动且不限制高度 */}
                <div className="flex-grow overflow-y-auto p-6 md:p-8 custom-scrollbar bg-background/30">
                  <PromptBox content={selectedPrompt.content} />
                </div>

                {/* 面板底部装饰（可选） */}
                <div className="p-4 border-t border-border/30 bg-card/50 text-[10px] text-muted text-center font-mono opacity-50 uppercase tracking-[0.2em]">
                  Prompt Laboratory / Template Configuration
                </div>
            </motion.div>
          </div>
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
