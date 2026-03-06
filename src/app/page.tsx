"use client";

import { useState } from "react";
import { AI_TOOLS, CATEGORIES } from "@/lib/data";
import { Search, ExternalLink, BookOpen, Brain, Download, Code2, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const iconMap: Record<string, any> = {
  Brain: Brain,
  Download: Download,
  Code2: Code2,
  Image: ImageIcon,
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("全部");

  const filteredTools = AI_TOOLS.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "全部" || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-mesh text-foreground selection:bg-primary/30">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent mb-6 leading-tight">
            AI 进化指南
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            一站式整理全球顶尖 AI 工具、本地搭建教程与提效技巧。助你在这个 AI 时代保持进化。
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative flex items-center bg-card/50 border border-border rounded-2xl px-6 py-4 focus-within:border-primary/50 transition-colors shadow-2xl">
            <Search className="w-5 h-5 text-slate-500 mr-4" />
            <input
              type="text"
              placeholder="搜索 AI 工具、教程..."
              className="bg-transparent border-none outline-none w-full text-lg placeholder:text-slate-600 appearance-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-wrap gap-3 justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full border transition-all duration-300 transform active:scale-95 ${activeCategory === cat
                ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                : "border-border bg-card/30 text-slate-400 hover:border-slate-600 hover:bg-card/50"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => {
              const Icon = iconMap[tool.icon] || Brain;
              return (
                <motion.div
                  key={tool.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 rounded-2xl flex flex-col h-full group transition-all duration-300 hover:border-primary/30"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={tool.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    {tool.name}
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-border text-slate-500 font-normal">
                      {tool.category}
                    </span>
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <div className="flex gap-1 flex-wrap">
                      {tool.tags.map(tag => (
                        <span key={tag} className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded">#{tag}</span>
                      ))}
                    </div>
                    {tool.tutorial ? (
                      <button className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors font-medium">
                        <BookOpen className="w-4 h-4" />
                        查看教程
                      </button>
                    ) : (
                      <span className="text-[10px] text-slate-600">教程筹备中</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredTools.length === 0 && (
          <div className="text-center py-24 text-slate-500 flex flex-col items-center gap-4">
            <div className="p-6 rounded-full bg-card/50 border border-border">
              <Search className="w-12 h-12 text-slate-700" />
            </div>
            <p className="text-lg">未找到相关工具，换个关键词试试？</p>
          </div>
        )}
      </section>

      {/* Footer / Ad Placeholder */}
      <footer className="border-t border-border mt-12 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="text-slate-500 text-sm max-w-xs">
            © 2026 AI 进化指南. 基于 Next.js 与 GitHub Pages 托管.
            <p className="mt-1">发现 AI 的力量，提升人类的可能。</p>
          </div>
          {/* 这里预留 AdSense 占位 */}
          <div className="bg-border/30 px-8 py-3 rounded-lg text-[10px] text-slate-600 uppercase tracking-widest border border-dashed border-border flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
            Advertisement Space
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-primary transition-colors text-sm">隐私政策</a>
            <a href="#" className="text-slate-500 hover:text-primary transition-colors text-sm">免责声明</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
