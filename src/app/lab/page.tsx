import fs from "fs";
import path from "path";
import LabClient from "./LabClient";

export default async function LabPage() {
    const jsonPath = path.join(process.cwd(), "src/content/lab/prompts.json");
    let prompts = [];
    
    if (fs.existsSync(jsonPath)) {
        prompts = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    }

    return <LabClient initialPrompts={prompts} />;
}
