import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

export async function generateStaticParams() {
    const contentDirectory = path.join(process.cwd(), "src/content/tutorials");
    if (!fs.existsSync(contentDirectory)) return [];

    const files = fs.readdirSync(contentDirectory);
    return files.map((filename) => ({
        slug: filename.replace(".md", ""),
    }));
}

export default async function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const filePath = path.join(process.cwd(), "src/content/tutorials", `${slug}.md`);

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

    return (
        <main className="min-h-screen bg-mesh text-foreground">
            <nav className="fixed top-0 w-full z-50 px-6 py-4 glass-card border-b border-border/50">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-all group font-medium">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        AI 进化指南
                    </Link>
                    <div className="text-xs text-muted font-mono uppercase tracking-widest hidden md:block">
                        Tutorial / Guide
                    </div>
                </div>
            </nav>

            <article className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
                {/* Header */}
                <header className="mb-12">
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

                {/* Content */}
                <div className="prose prose-invert prose-blue max-w-none 
          prose-headings:text-foreground prose-headings:font-bold prose-headings:mt-12 prose-headings:mb-6
          prose-p:text-muted prose-p:leading-relaxed prose-p:mb-6
          prose-li:text-muted prose-li:mb-2
          prose-code:bg-primary/10 prose-code:text-primary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-card prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-pre:p-6
          prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-6 prose-blockquote:italic
          prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          ">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>

                {/* Footer */}
                <footer className="mt-16 pt-8 border-t border-border/50 text-center">
                    <p className="text-muted text-sm mb-6">觉得教程有帮助？分享给更多人吧！</p>
                    <Link href="/" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-white hover:bg-primary/80 transition-all font-medium shadow-lg shadow-primary/20">
                        探索更多 AI 工具
                    </Link>
                </footer>
            </article>
        </main>
    );
}
