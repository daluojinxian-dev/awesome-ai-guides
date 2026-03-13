"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function TutorialHeader() {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    // 检查是否有历史记录，如果有则回退（保留状态），否则跳转首页
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <nav className="fixed top-0 left-0 md:left-64 right-0 z-50 px-6 py-4 glass-card-solid border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-primary hover:text-accent transition-all group font-medium -ml-4 px-4 py-2 rounded-lg hover:bg-primary/5"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">AI 进化指南</span>
        </button>
        <div className="text-[10px] text-muted font-mono uppercase tracking-[0.2em] hidden md:block opacity-50">
          Advanced AI Guide / Learning Path
        </div>
      </div>
    </nav>
  );
}
