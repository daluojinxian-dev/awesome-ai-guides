"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { TRANSLATIONS } from "@/lib/data";

export default function Privacy() {
    const { lang } = useLanguage();
    const t = TRANSLATIONS[lang];
    const content = t.privacyContent;

    return (
        <main className="min-h-screen bg-mesh text-foreground p-8 md:p-24">
            <div className="max-w-3xl mx-auto glass-card p-8 md:p-12 rounded-3xl">
                <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent mb-8 transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    {t.backHome}
                </Link>

                <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                    <h1 className="text-3xl font-bold">{content.title}</h1>
                </div>

                <div className="space-y-6 text-muted leading-relaxed">
                    {content.sections.map((section, idx) => (
                        <section key={idx}>
                            <h2 className="text-xl font-semibold text-foreground mb-3">{section.h2}</h2>
                            <p>{section.p}</p>
                        </section>
                    ))}

                    <p className="text-sm pt-8 border-t border-border">{t.lastUpdated}2026年3月6日</p>
                </div>
            </div>
        </main>
    );
}
