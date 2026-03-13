"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Lang = "zh" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("zh"); // 默认 zh，稍后引导至系统语言

  useEffect(() => {
    // 1. 尝试从 localStorage 读取
    const saved = localStorage.getItem("preferred-lang") as Lang;
    if (saved && (saved === "zh" || saved === "en")) {
      setLangState(saved);
    } else {
      // 2. 初始自动适配系统语言
      const systemLang = navigator.language.toLowerCase();
      if (systemLang.startsWith("zh")) {
        setLangState("zh");
      } else {
        setLangState("en");
      }
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("preferred-lang", newLang);
  };

  const toggleLang = () => {
    const nextLang = lang === "zh" ? "en" : "zh";
    setLang(nextLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
