import fs from "fs";
import path from "path";
import matter from "gray-matter";
import HomeClient from "./HomeClient";

export default async function HomePage() {
    const tutorialsDir = path.join(process.cwd(), "src/content/tutorials");
    let tools: any[] = [];
    let roadmaps: Record<string, { count: number, firstSlug: string, minOrder: number }> = {};

    if (fs.existsSync(tutorialsDir)) {
        const filenames = fs.readdirSync(tutorialsDir);
        tools = filenames
            .filter(filename => filename.endsWith(".md"))
            .map(filename => {
                const filePath = path.join(tutorialsDir, filename);
                const fileContent = fs.readFileSync(filePath, "utf8");
                const { data } = matter(fileContent);
                
                // 处理多语言支持
                const rawLang = data.language || "zh";
                const languages = Array.isArray(rawLang) 
                    ? rawLang 
                    : rawLang.split(",").map((l: string) => l.trim());

                const tool = {
                    id: data.toolId || filename.replace(".md", ""),
                    slug: filename.replace(".md", ""),
                    name: data.name || data.title,
                    desc: data.desc || "",
                    category: data.category || "Other",
                    tags: data.tags || [],
                    icon: data.icon || "",
                    link: data.link || "#",
                    languages: languages,
                    date: data.date || "2026-01-01 00:00",
                    roadmap: data.roadmap || null,
                    order: data.order || 0
                };

                // 统计路线图
                if (tool.roadmap) {
                    if (!roadmaps[tool.roadmap]) {
                        roadmaps[tool.roadmap] = { count: 0, firstSlug: tool.slug, minOrder: tool.order };
                    }
                    roadmaps[tool.roadmap].count++;
                    
                    // 动态寻找当前路线图中最靠前的文章 (order 最小)
                    if (tool.order < roadmaps[tool.roadmap].minOrder) {
                        roadmaps[tool.roadmap].minOrder = tool.order;
                        roadmaps[tool.roadmap].firstSlug = tool.slug;
                    }
                }

                return tool;
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    // 动态提取分类
    const getCategories = (lang: string) => {
        const cats = Array.from(new Set(
            tools.filter(t => t.languages.includes(lang)).map(t => t.category)
        ));
        return lang === "zh" ? ["全部", ...cats] : ["All", ...cats];
    };

    const categories = {
        zh: getCategories("zh"),
        en: getCategories("en")
    };

    return <HomeClient tools={tools} categoriesData={categories} roadmapData={roadmaps} />;
}
