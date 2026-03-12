"use client";

import { useEffect, useState } from "react";
import { Zap, ChevronRight, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsItem {
    id: number;
    title: string;
    url: string;
    time: string;
}

export default function NewsFlash() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch("/data/news.json")
            .then(res => {
                if (!res.ok) throw new Error("File not found");
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) setNews(data);
            })
            .catch(err => {
                console.warn("Failed to fetch news, using fallback local data", err);
                // 默认占位数据，防止界面完全空白
                setNews([{ id: 0, title: "正在连接 AI 资讯中心...", url: "#", time: "Now" }]);
            });
    }, []);

    useEffect(() => {
        if (news.length === 0) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % news.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [news]);

    if (news.length === 0) return null;

    return (
        <div className="max-w-4xl mx-auto px-6 mb-12">
            <div className="glass-card rounded-2xl p-4 flex items-center gap-4 border-primary/20 bg-primary/5">
                <div className="flex items-center gap-2 text-primary font-bold shrink-0">
                    <Zap className="w-5 h-5 fill-primary" />
                    <span className="hidden sm:inline uppercase tracking-widest text-xs">AI Flash</span>
                </div>

                <div className="h-6 w-[1px] bg-border/50 shrink-0" />

                <div className="flex-grow overflow-hidden relative h-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 flex items-center"
                        >
                            <a
                                href={news[currentIndex].url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm md:text-base font-medium text-foreground hover:text-primary transition-colors truncate"
                            >
                                {news[currentIndex].title}
                            </a>
                            <span className="ml-3 text-[10px] text-muted shrink-0 hidden md:block">
                                {news[currentIndex].time}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <button
                    onClick={() => setCurrentIndex((prev) => (prev + 1) % news.length)}
                    className="p-1 hover:bg-primary/10 rounded-lg transition-colors group"
                >
                    <ChevronRight className="w-4 h-4 text-muted group-hover:text-primary" />
                </button>
            </div>
        </div>
    );
}
