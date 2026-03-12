import fs from "fs";
import path from "path";
import matter from "gray-matter";
import HomeClient from "./HomeClient";

export default async function HomePage() {
    const tutorialsDir = path.join(process.cwd(), "src/content/tutorials");
    let tools: any[] = [];

    if (fs.existsSync(tutorialsDir)) {
        const filenames = fs.readdirSync(tutorialsDir);
        tools = filenames
            .filter(filename => filename.endsWith(".md"))
            .map(filename => {
                const filePath = path.join(tutorialsDir, filename);
                const fileContent = fs.readFileSync(filePath, "utf8");
                const { data } = matter(fileContent);
                return {
                    id: data.toolId || filename.replace(".md", ""),
                    slug: filename.replace(".md", ""),
                    name: data.name || data.title,
                    desc: data.desc || "",
                    category: data.category || "Other",
                    tags: data.tags || [],
                    icon: data.icon || "",
                    link: data.link || "#",
                    language: data.language || "zh",
                    date: data.date || "2026-01-01 00:00"
                };
            })
            // 按照时间精确排序 (倒序)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    // 动态提取全部分类 (根据语言)
    const getCategories = (lang: string) => {
        const cats = Array.from(new Set(tools.filter(t => t.language === lang).map(t => t.category)));
        return lang === "zh" ? ["全部", ...cats] : ["All", ...cats];
    };

    const categories = {
        zh: getCategories("zh"),
        en: getCategories("en")
    };

    return <HomeClient tools={tools} categoriesData={categories} />;
}
