"use client";

import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function Disclaimer() {
    return (
        <main className="min-h-screen bg-mesh text-foreground p-8 md:p-24">
            <div className="max-w-3xl mx-auto glass-card p-8 md:p-12 rounded-3xl">
                <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent mb-8 transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    返回首页
                </Link>

                <div className="flex items-center gap-3 mb-6">
                    <AlertTriangle className="w-8 h-8 text-secondary" />
                    <h1 className="text-3xl font-bold">免责声明</h1>
                </div>

                <div className="space-y-6 text-muted leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-3">内容仅供参考</h2>
                        <p>本站（onai.help）分享的所有 AI 工具、配置教程及技术观点仅供学习与参考，不构成任何投资、法律或专业建议。AI 领域发展极快，内容可能存在时效性偏差。</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-3">使用风险</h2>
                        <p>用户在尝试运行本地模型、安装第三方软件（如 Ollama, OpenClaw 等）或在外部平台进行交易时，应自行评估风险。本站对因使用本站信息而导致的任何硬件损坏、数据丢失或经济损失不承担责任。</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-3">知识产权</h2>
                        <p>本站引用的所有工具品牌、Logo 及链接归其各自版权所有者所有。本站原创教程遵循 MIT 协议开源，欢迎在保留来源的情况下进行转载。</p>
                    </section>

                    <p className="text-sm pt-8 border-t border-border">最后更新日期：2026年3月6日</p>
                </div>
            </div>
        </main>
    );
}
