"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TRANSLATIONS } from "@/lib/data";
import { Search, ExternalLink, BookOpen, Brain, Download, Code2, Image as ImageIcon, Languages, Sun, Moon, Monitor, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import NewsFlash from "@/components/NewsFlash";

const iconMap: Record<string, any> = {
  Brain: Brain,
  Download: Download,
  Code2: Code2,
  Image: ImageIcon,
};

interface ToolData {
  id: string;
  slug: string;
  name: string;
  desc: string;
  category: string;
  tags: string[];
  icon: string;
  link: string;
  languages: string[];
  date: string;
}

export default function HomeClient({ 
    tools, 
    categoriesData 
}: { 
    tools: ToolData[], 
    categoriesData: { zh: string[], en: string[] } 
}) {
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 防止水合不匹配
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("favorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  const t = TRANSLATIONS[lang];
  // 注入“我的收藏”分类
  const favLabel = lang === "zh" ? "我的收藏" : "Favorites";
  const currentCategories = [favLabel, ...categoriesData[lang]];

  const [activeCategory, setActiveCategory] = useState(t.all);

  // 语言切换时重置分类
  useEffect(() => {
    setActiveCategory(TRANSLATIONS[lang].all);
  }, [lang]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavs = favorites.includes(id) 
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem("favorites", JSON.stringify(newFavs));
  };

  const filteredTools = tools.filter((tool) => {
    if (!tool.languages.includes(lang)) return false;

    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.desc.toLowerCase().includes(searchQuery.toLowerCase());

    // 处理特殊分类：我的收藏
    if (activeCategory === favLabel) {
      return matchesSearch && favorites.includes(tool.id);
    }

    const matchesCategory = activeCategory === t.all || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleLang = () => {
    setLang(lang === "zh" ? "en" : "zh");
  };

  const cycleTheme = () => {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  };

  const getThemeIcon = () => {
    if (!mounted) return <Monitor className="w-4 h-4" />;
    if (theme === "system") return <Monitor className="w-4 h-4" />;
    if (theme === "light") return <Sun className="w-4 h-4" />;
    return <Moon className="w-4 h-4" />;
  };

  const getThemeLabel = () => {
    if (!mounted) return t.themeSystem;
    if (theme === "system") return t.themeSystem;
    if (theme === "light") return t.themeLight;
    return t.themeDark;
  };

  return (
    <main className="min-h-screen bg-mesh text-foreground selection:bg-primary/30 transition-colors duration-300">
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-end gap-3">
        <button
          onClick={toggleLang}
          className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-primary/5 transition-all text-sm font-medium border-border"
        >
          <Languages className="w-4 h-4 text-primary" />
          {t.lang}
        </button>
        <button
          onClick={cycleTheme}
          className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-primary/5 transition-all text-sm font-medium border-border"
        >
          {getThemeIcon()}
          {getThemeLabel()}
        </button>
      </nav>

      <section className="relative pt-32 pb-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent mb-6 leading-tight">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative flex items-center bg-card/50 border border-border rounded-2xl px-6 py-4 focus-within:border-primary/50 transition-colors shadow-2xl">
            <Search className="w-5 h-5 text-muted mr-4" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className="bg-transparent border-none outline-none w-full text-lg placeholder:text-muted/50 appearance-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <NewsFlash />

      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-wrap gap-3 justify-center">
        {currentCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full border transition-all duration-300 transform active:scale-95 ${activeCategory === cat
              ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
              : "border-border bg-card/30 text-muted hover:border-primary/40 hover:text-primary hover:bg-card/50"
              } ${cat === favLabel && favorites.length > 0 ? "relative" : ""}`}
          >
            {cat}
            {cat === favLabel && favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-[10px] flex items-center justify-center rounded-full text-white animate-bounce-subtle">
                {favorites.length}
              </span>
            )}
          </button>
        ))}
      </div>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredTools.map((tool) => {
              const Icon = iconMap[tool.icon] || Brain;
              const isFav = favorites.includes(tool.id);
              
              return (
                <motion.div
                  key={tool.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 rounded-2xl flex flex-col h-full group transition-all duration-300 hover:border-primary/30 shadow-xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors border border-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => toggleFavorite(tool.id, e)}
                        className={`p-2 rounded-lg border transition-all ${isFav 
                          ? "bg-accent/10 border-accent/20 text-accent" 
                          : "border-transparent text-muted hover:text-accent hover:border-accent/20 hover:bg-accent/5"}`}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
                      </button>
                      <a
                        href={tool.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-primary/5 rounded-lg text-muted hover:text-primary transition-colors border border-transparent hover:border-border"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    {tool.name}
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-border text-muted font-normal">
                      {tool.category}
                    </span>
                  </h3>
                  <p className="text-muted text-sm mb-6 flex-grow leading-relaxed">
                    {tool.desc}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <div className="flex gap-1 flex-wrap">
                      {tool.tags.map(tag => (
                        <span key={tag} className="text-[10px] text-muted bg-primary/5 px-2 py-0.5 rounded border border-border/30">#{tag}</span>
                      ))}
                    </div>
                    <Link href={`/tutorials/${tool.slug}`} className="flex items-center gap-2 text-sm text-primary hover:text-secondary transition-colors font-medium group/btn">
                      <BookOpen className="w-4 h-4" />
                      {t.viewTutorial}
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-24 text-muted flex flex-col items-center gap-4">
            <div className="p-6 rounded-full bg-card/50 border border-border animate-pulse">
              <Search className="w-12 h-12 text-muted/30" />
            </div>
            <p className="text-lg">
              {activeCategory === favLabel ? "您还没有收藏任何工具哦，快去点个小爱心吧！" : t.noResults}
            </p>
          </div>
        )}
      </section>

      <footer className="border-t border-border mt-12 py-12 px-6 bg-card/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="text-muted text-sm max-w-xs">
            © 2026 {t.title}. Based on Next.js & GitHub Pages.
            <p className="mt-1 text-muted/60">{t.footerCaption}</p>
          </div>
          <div className="bg-border/30 px-8 py-3 rounded-lg text-[10px] text-muted uppercase tracking-widest border border-dashed border-border flex items-center gap-2 group hover:border-primary/30 transition-colors">
            <span className="w-2 h-2 rounded-full bg-primary/40 animate-pulse group-hover:bg-primary/60" />
            Advertisement Space
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-muted hover:text-primary transition-colors text-sm underline-offset-4 hover:underline">{t.privacy}</Link>
            <Link href="/disclaimer" className="text-muted hover:text-primary transition-colors text-sm underline-offset-4 hover:underline">{t.disclaimer}</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
