import fs from "fs";
import path from "path";
import matter from "gray-matter";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const tutorialsDir = path.join(process.cwd(), "src/content/tutorials");
  let tutorials: any[] = [];

  if (fs.existsSync(tutorialsDir)) {
    const filenames = fs.readdirSync(tutorialsDir);
    tutorials = filenames
      .filter(filename => filename.endsWith(".md"))
      .map(filename => {
        const filePath = path.join(tutorialsDir, filename);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContent);
        return {
          slug: filename.replace(".md", ""),
          toolId: data.toolId || "",
          language: data.language || "zh"
        };
      });
  }

  return <HomeClient tutorials={tutorials} />;
}
