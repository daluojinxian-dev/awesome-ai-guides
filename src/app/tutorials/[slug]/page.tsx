import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag, ArrowRight, Compass } from "lucide-react";
import Comments from "@/components/Comments";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export async function generateStaticParams() {
    const contentDirectory = path.join(process.cwd(), "src/content/tutorials");
    if (!fs.existsSync(contentDirectory)) return [];

    const files = fs.readdirSync(contentDirectory);
    return files.map((filename) => ({
        slug: filename.replace(".md", ""),
    }));
}

import TutorialHeader from "@/components/TutorialHeader";

export default async function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const contentDirectory = path.join(process.cwd(), "src/content/tutorials");
    const filePath = path.join(contentDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">404</h1>
                    <p className="text-muted mb-8">教程文章消失在次元裂缝中了...</p>
                    <Link href="/" className="text-primary hover:underline">返回首页</Link>
                </div>
            </div>
        );
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    // 路线图导航逻辑
    let nextTutorial = null;
    if (data.roadmap) {
        const files = fs.readdirSync(contentDirectory);
        const siblings = files
            .map(f => {
                const c = fs.readFileSync(path.join(contentDirectory, f), "utf8");
                const { data: d } = matter(c);
                return { slug: f.replace(".md", ""), roadmap: d.roadmap, order: d.order, title: d.title || d.name };
            })
            .filter(f => f.roadmap === data.roadmap)
            .sort((a, b) => (a.order || 0) - (b.order || 0));

        const currentIndex = siblings.findIndex(s => s.slug === slug);
        if (currentIndex !== -1 && currentIndex < siblings.length - 1) {
            nextTutorial = siblings[currentIndex + 1];
        }
    }

    return (
        <div className="min-h-screen text-foreground">
            <TutorialHeader />

            <article className="pt-28 pb-24 px-6 max-w-4xl mx-auto">
                <header className="mb-12">
                    {data.roadmap && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                            <Compass className="w-3 h-3" />
                            {data.roadmap} · STEP {data.order}
                        </div>
                    )}
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        {data.title}
                    </h1>

                    <div className="flex flex-wrap gap-6 text-sm text-muted border-y border-border/30 py-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {data.date}
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {data.author}
                        </div>
                        {data.category && (
                            <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                {data.category}
                            </div>
                        )}
                    </div>
                </header>

                <div className="prose prose-invert prose-blue max-w-none 
          prose-headings:text-foreground prose-headings:font-bold prose-headings:mt-12 prose-headings:mb-6
          prose-p:text-muted prose-p:leading-relaxed prose-p:mb-6
          prose-li:text-muted prose-li:mb-2
          prose-code:bg-primary/10 prose-code:text-primary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-card prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-pre:p-6
          prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-6 prose-blockquote:italic
          prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          ">
                    <MarkdownRenderer content={content} />
                </div>

                <footer className="mt-16 pt-12 border-t border-border/50">
                    {nextTutorial ? (
                        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 border border-primary/10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-3">恭喜通关！下一站：</p>
                            <h3 className="text-2xl font-bold mb-6">{nextTutorial.title}</h3>
                            <Link 
                                href={`/tutorials/${nextTutorial.slug}`} 
                                className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-2xl font-bold shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all group"
                            >
                                开启后续课程
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-muted text-sm mb-6">觉得教程有帮助？分享给更多人吧！</p>
                            <Link href="/" className="px-8 py-3 rounded-full bg-primary text-white hover:bg-primary/80 transition-all font-medium shadow-lg shadow-primary/20">
                                探索其他 AI 进化路径
                            </Link>
                        </div>
                    )}
                </footer>

                <Comments />
            </article>
        </div>
    );
}
