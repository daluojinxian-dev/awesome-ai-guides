"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function Comments() {
  const { resolvedTheme } = useTheme();

  return (
    <section className="mt-16 pt-12 border-t border-border/50">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2 h-6 bg-primary rounded-full" />
        <h2 className="text-2xl font-bold tracking-tight">社区讨论</h2>
      </div>
      
      <Giscus
        id="comments"
        repo="daluojinxian-dev/awesome-ai-guides"
        repoId="R_kgDORe9TLg"
        category="Announcements"
        categoryId="DIC_kwDORe9TLs4C4Rog"
        mapping="pathname"
        term="Welcome to AI Evolution Guide!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        lang="zh-CN"
        loading="lazy"
      />
    </section>
  );
}
