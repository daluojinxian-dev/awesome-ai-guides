"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function Privacy() {
    return (
        <main className="min-h-screen bg-mesh text-foreground p-8 md:p-24">
            <div className="max-w-3xl mx-auto glass-card p-8 md:p-12 rounded-3xl">
                <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent mb-8 transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    返回首页
                </Link>

                <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                    <h1 className="text-3xl font-bold">隐私政策</h1>
                </div>

                <div className="space-y-6 text-muted leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-3">信息收集</h2>
                        <p>AI 进化指南（onai.help）作为一个静态导航网站，不主动收集任何用户的个人身份信息（如姓名、邮件等）。</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-3">Cookie 与 第三方工具</h2>
                        <p>我们可能使用 Google AdSense 展示广告，该服务可能会使用 Cookie 来根据用户访问本站或其他网站的情况向其投放广告。用户可以访问 Google 广告设置页面来停用个性化广告。</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-3">外部链接</h2>
                        <p>本网站包含许多指向第三方网站的链接。我们对这些网站的内容或隐私做法不承担任何责任，建议您在访问这些网站时阅读其隐私声明。</p>
                    </section>

                    <p className="text-sm pt-8 border-t border-border">最后更新日期：2026年3月6日</p>
                </div>
            </div>
        </main>
    );
}
