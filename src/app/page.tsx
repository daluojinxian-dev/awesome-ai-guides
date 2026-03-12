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
                
                // 处理多语言支持：转换为数组
                const rawLang = data.language || "zh";
                const languages = Array.isArray(rawLang) 
                    ? rawLang 
                    : rawLang.split(",").map((l: string) => l.trim());

                return {
                    id: data.toolId || filename.replace(".md", ""),
                    slug: filename.replace(".md", ""),
                    name: data.name || data.title,
                    desc: data.desc || "",
                    category: data.category || "Other",
                    tags: data.tags || [],
                    icon: data.icon || "",
                    link: data.link || "#",
                    languages: languages, // 传递数组
                    date: data.date || "2026-01-01 00:00"
                };
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    // 动态提取全部分类
    const getCategories = (lang: string) => {
        // 只要文章支持该语言，就提取其分类
        const cats = Array.from(new Set(
            tools.filter(t => t.languages.includes(lang)).map(t => t.category)
        ));
        return lang === "zh" ? ["全部", ...cats] : ["All", ...cats];
    };

    const categories = {
        zh: getCategories("zh"),
        en: getCategories("en")
    };

    return <HomeClient tools={tools} categoriesData={categories} />;
}
