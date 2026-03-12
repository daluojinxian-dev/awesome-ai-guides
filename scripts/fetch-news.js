const fs = require('fs');
const path = require('path');

/**
 * 模拟从 RSS 或 API 抓取最新的 AI 资讯
 * 在实际生产环境中，您可以替换为真实的 axios.get('...')
 */
async function fetchNews() {
    console.log('Starting news fetch...');
    
    // 模拟数据源
    const sources = [
        { 
            title: "OpenAI 发布 GPT-5 预览版：推理能力提升 10 倍", 
            url: "https://openai.com/blog", 
            time: "2026-03-12 09:00" 
        },
        { 
            title: "Claude 3.5 Sonnet 移动端正式上线 App Store", 
            url: "https://www.anthropic.com/news", 
            time: "2026-03-12 10:30" 
        },
        { 
            title: "NVIDIA 发布新一代 Blackwell 芯片，算力再攀高峰", 
            url: "https://nvidianews.nvidia.com/", 
            time: "2026-03-11 23:15" 
        },
        { 
            title: "Google Gemini 1.5 Pro 现已面向所有开发者免费开放", 
            url: "https://blog.google/technology/ai/", 
            time: "2026-03-12 08:45" 
        },
        { 
            title: "全球首个全自动 AI 软件工程师 Devin 开启公测", 
            url: "https://www.cognition-labs.com/blog", 
            time: "2026-03-12 11:00" 
        }
    ];

    try {
        const dataPath = path.join(__dirname, '../public/data/news.json');
        
        // 确保目录存在
        const dir = path.dirname(dataPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // 写入文件
        fs.writeFileSync(dataPath, JSON.stringify(sources, null, 2));
        console.log(`Successfully updated ${sources.length} news items to ${dataPath}`);
    } catch (error) {
        console.error('Error saving news:', error);
        process.exit(1);
    }
}

fetchNews();
