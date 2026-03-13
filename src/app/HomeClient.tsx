"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { TRANSLATIONS } from "@/lib/data";
import { useLanguage } from "@/components/LanguageProvider";
import { Search, ExternalLink, BookOpen, Brain, Download, Code2, Image as ImageIcon, Languages, Sun, Moon, Monitor, Heart, Compass, ArrowRight } from "lucide-react";
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
  roadmap?: string;
  order?: number;
}

export default function HomeClient(props: any) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeClientContent {...props} />
    </Suspense>
  );
}

function HomeClientContent({ 
    tools, 
    categoriesData,
    roadmapData
}: { 
    tools: ToolData[], 
    categoriesData: { zh: string[], en: string[] },
    roadmapData: Record<string, { count: number, firstSlug: string }>
}) {
  const { lang, toggleLang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const t = TRANSLATIONS[lang];
  const favLabel = lang === "zh" ? "我的收藏" : "Favorites";
  const roadmapLabel = lang === "zh" ? "进化路线图" : "Roadmaps";
  const currentCategories = [roadmapLabel, favLabel, ...categoriesData[lang]];

  const activeCategory = (() => {
    const view = searchParams.get("view");
    const catParam = searchParams.get("category");

    if (view === "favorites") return favLabel;
    if (view === "roadmaps") return roadmapLabel;
    if (catParam) {
      const decodedCat = decodeURIComponent(catParam);
      if (currentCategories.includes(decodedCat)) return decodedCat;
    }
    return t.all;
  })();


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

  const handleCategoryClick = (cat: string) => {
    if (cat === favLabel) {
      router.push("/?view=favorites");
    } else if (cat === roadmapLabel) {
      router.push("/?view=roadmaps");
    } else if (cat === t.all) {
      router.push("/");
    } else {
      router.push(`/?category=${encodeURIComponent(cat)}`);
    }
  };

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
    // 过滤掉当前语言不支持的工具
    if (tool.languages && !tool.languages.includes(lang)) return false;

    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.desc.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeCategory === favLabel) {
      return matchesSearch && favorites.includes(tool.id);
    }
    
    if (activeCategory === roadmapLabel) {
      return matchesSearch && tool.roadmap !== undefined && tool.roadmap !== null;
    }

    const matchesCategory = activeCategory === t.all || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
      <section className="relative pt-24 pb-16 px-6 text-center">
        <div className="absolute top-4 right-6 flex gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-card hover:bg-primary/5 transition-all text-xs font-medium border-border"
          >
            <Languages className="w-4 h-4 text-primary" />
            {t.lang}
          </button>
          <button
            onClick={cycleTheme}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-card hover:bg-primary/5 transition-all text-xs font-medium border-border"
          >
            {getThemeIcon()}
          </button>
        </div>
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
            onClick={() => handleCategoryClick(cat)}
            className={`px-6 py-2 rounded-full border transition-all duration-300 transform active:scale-95 ${activeCategory === cat
              ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
              : "border-border bg-card/30 text-muted hover:border-primary/40 hover:text-primary hover:bg-card/50"
              } ${cat === favLabel && favorites.length > 0 ? "relative" : ""} ${cat === roadmapLabel ? "flex items-center gap-2" : ""}`}
          >
            {cat === roadmapLabel && <Compass className="w-4 h-4" />}
            {cat}
            {cat === favLabel && favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-[10px] flex items-center justify-center rounded-full text-white">
                {favorites.length}
              </span>
            )}
          </button>
        ))}
      </div>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        {/* 如果是路线图视角，先展示路线图聚合卡片 */}
        {activeCategory === roadmapLabel && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {Object.entries(roadmapData).map(([name, data]) => (
                <motion.div
                    key={name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Compass className="w-32 h-32 text-primary" />
                    </div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                            Series Roadmap
                        </div>
                        <h3 className="text-3xl font-bold mb-4">{name}</h3>
                        <p className="text-muted mb-8 max-w-sm">{lang === "zh" ? "包含 " : "Contains "}{data.count}{t.roadmapDesc}</p>
                        <Link href={`/tutorials/${data.firstSlug}`} className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/80 transition-all shadow-xl shadow-primary/20 group/link">
                            {t.roadmapStart}
                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            ))}
          </div>
        )}

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
                    <div className="flex flex-col items-end gap-1">
                        {tool.roadmap && (
                            <span className="text-[9px] text-primary/60 font-medium">#{tool.roadmap} Step {tool.order}</span>
                        )}
                        <Link href={`/tutorials/${tool.slug}`} className="flex items-center gap-2 text-sm text-primary hover:text-secondary transition-colors font-medium group/btn">
                            <BookOpen className="w-4 h-4" />
                            {t.viewTutorial}
                        </Link>
                    </div>
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
              {activeCategory === favLabel ? t.favEmpty : t.noResults}
              {activeCategory === roadmapLabel && t.roadmapEmpty}
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
            {t.adSpace}
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
