"use client";

import { useState } from "react";
import { Clipboard, Check, Zap } from "lucide-react";

export default function PromptBox({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-8 overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-6 transition-all hover:border-primary/40 hover:bg-primary/10">
      <div className="absolute top-0 right-0 p-4">
        <button
          onClick={copy}
          className="flex items-center gap-2 rounded-lg bg-card px-3 py-1.5 text-xs font-medium text-primary shadow-sm transition-all hover:scale-105 active:scale-95 border border-border"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              已复制
            </>
          ) : (
            <>
              <Clipboard className="w-3.5 h-3.5" />
              复制提示词
            </>
          )}
        </button>
      </div>
      
      <div className="mb-4 flex items-center gap-2 text-primary">
        <Zap className="w-5 h-5 fill-primary" />
        <span className="text-xs font-bold uppercase tracking-widest">Prompt Laboratory</span>
      </div>

      <div className="font-mono text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
        {content}
      </div>

      <div className="mt-4 flex gap-2">
        <div className="h-1.5 w-8 rounded-full bg-primary/20" />
        <div className="h-1.5 w-4 rounded-full bg-primary/10" />
        <div className="h-1.5 w-4 rounded-full bg-primary/10" />
      </div>
    </div>
  );
}
