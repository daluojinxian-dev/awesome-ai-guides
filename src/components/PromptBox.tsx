"use client";

import { useState, useEffect, useRef } from "react";
import { Clipboard, Check, Zap, Edit3 } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { TRANSLATIONS } from "@/lib/data";

export default function PromptBox({ content }: { content: string }) {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  const [copied, setCopied] = useState(false);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [placeholders, setPlaceholders] = useState<string[]>([]);

  // 提取 {{变量}} 占位符
  useEffect(() => {
    const regex = /{{(.*?)}}/g;
    const found = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      found.push(match[1]);
    }
    const uniquePlaceholders = Array.from(new Set(found));
    setPlaceholders(uniquePlaceholders);
    
    // 初始化变量对象
    const initialVars: Record<string, string> = {};
    uniquePlaceholders.forEach(p => initialVars[p] = "");
    setVariables(initialVars);
  }, [content]);

  // 生成最终文本
  const getFinalContent = () => {
    let final = content;
    Object.keys(variables).forEach(key => {
      const value = variables[key] || `[${key}]`;
      // 全局替换
      final = final.split(`{{${key}}}`).join(value);
    });
    return final;
  };

  const copy = () => {
    navigator.clipboard.writeText(getFinalContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (key: string, val: string) => {
    setVariables(prev => ({ ...prev, [key]: val }));
  };

  if (placeholders.length === 0) {
    return (
      <div className="group relative my-8 overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-6 transition-all hover:border-primary/40">
        <div className="absolute top-0 right-0 p-4">
          <button onClick={copy} className="flex items-center gap-2 rounded-lg bg-card px-3 py-1.5 text-xs font-medium text-primary shadow-sm border border-border">
            {copied ? <Check className="w-3.5 h-3.5" /> : <Clipboard className="w-3.5 h-3.5" />}
            {copied ? t.promptCopied : t.promptCopy}
          </button>
        </div>
        <div className="mb-4 flex items-center gap-2 text-primary">
          <Zap className="w-5 h-5 fill-primary" />
          <span className="text-xs font-bold font-mono">PROMPT LAB</span>
        </div>
        <div className="font-mono text-sm text-foreground/90 whitespace-pre-wrap">{content}</div>
      </div>
    );
  }

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-primary/30 bg-card shadow-2xl">
      <div className="bg-primary/5 px-6 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Zap className="w-5 h-5 fill-primary" />
          <span className="text-xs font-bold tracking-widest uppercase">{t.promptConfigTitle}</span>
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
        >
          {copied ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
          {copied ? t.promptCopied : t.promptConfigFinal}
        </button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 gap-6 mb-6">
          {placeholders.map(key => (
            <div key={key} className="space-y-2">
              <label className="text-[10px] font-bold text-muted uppercase flex items-center gap-1.5">
                <Edit3 className="w-3 h-3" />
                {t.promptSetVar}{key}
              </label>
              <textarea
                placeholder={`${lang === "zh" ? "请输入" : "Please enter "}${key}${t.promptInputPlaceholder}`}
                rows={3}
                className="w-full bg-primary/5 border border-border rounded-lg px-3 py-3 text-sm font-mono outline-none focus:border-primary/50 transition-colors resize-y min-h-[80px]"
                value={variables[key]}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="text-[10px] font-bold text-muted uppercase mb-2">{t.promptPreviewTitle}</div>
          <div className="p-4 rounded-xl bg-mesh border border-dashed border-border/50 font-mono text-xs text-muted/80 whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto">
            {getFinalContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
