"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { TRANSLATIONS } from "@/lib/data";
import { useLanguage } from "./LanguageProvider";
import { 
  Compass, 
  Zap, 
  Heart, 
  LayoutGrid, 
  Settings, 
  Github,
  Menu,
  X
} from "lucide-react";
import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  return (
    <Suspense fallback={<div className="w-64 h-screen border-r border-border/50 bg-card/80" />}>
      <SidebarContent />
    </Suspense>
  );
}

function SidebarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];

  const view = searchParams.get("view");

  const navItems = [
    { name: t.navExplore, icon: LayoutGrid, href: "/", active: pathname === "/" && !view },
    { name: t.navRoadmaps, icon: Compass, href: "/?view=roadmaps", active: view === "roadmaps" },
    { name: t.navLab, icon: Zap, href: "/lab", active: pathname === "/lab" },
    { name: t.navFavorites, icon: Heart, href: "/?view=favorites", active: view === "favorites" },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-[60] p-2 rounded-xl glass-card border-border md:hidden"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Container */}
      <aside className={`
        fixed left-0 top-0 h-screen z-50 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        w-64 glass-card border-r border-border/50 bg-card/80 backdrop-blur-xl flex flex-col
      `}>
        <div className="p-8 mb-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
              <Zap className="w-6 h-6 text-white fill-white/20" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">{t.title}</h1>
              <p className="text-[10px] text-muted font-mono uppercase opacity-60">{t.navLibrary}</p>
            </div>
          </Link>
        </div>

        <nav className="flex-grow px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = item.active;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-muted hover:bg-primary/5 hover:text-primary"}
                `}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "" : "group-hover:scale-110 transition-transform"}`} />
                <span className="font-medium text-sm">{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-border/30">
          <a 
            href="https://github.com/daluojinxian-dev/awesome-ai-guides" 
            target="_blank" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted hover:bg-card hover:text-foreground transition-all"
          >
            <Github className="w-5 h-5" />
            <span className="text-xs font-medium">GitHub Repository</span>
          </a>
        </div>
      </aside>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </>
  );
}
