export const TRANSLATIONS = {
    zh: {
        title: "AI 进化指南",
        subtitle: "一站式整理全球顶尖 AI 工具、本地搭建教程与提效技巧。助你在这个 AI 时代保持进化。",
        searchPlaceholder: "搜索 AI 工具、教程...",
        all: "全部",
        noResults: "未找到相关工具，换个关键词试试？",
        viewTutorial: "查看教程",
        preparing: "教程筹备中",
        footerCaption: "发现 AI 的力量，提升人类的可能。",
        privacy: "隐私政策",
        disclaimer: "免责声明",
        lang: "English",
        themeSystem: "跟随系统",
        themeLight: "明亮模式",
        themeDark: "暗黑模式",
    },
    en: {
        title: "AI Evolution Guide",
        subtitle: "A curated collection of top AI tools, local setup guides, and productivity tips. Stay ahead in the AI era.",
        searchPlaceholder: "Search AI tools, tutorials...",
        all: "All",
        noResults: "No results found, try another keyword?",
        viewTutorial: "View Tutorial",
        preparing: "Tutorial Coming Soon",
        footerCaption: "Discover the power of AI, enhance human possibilities.",
        privacy: "Privacy Policy",
        disclaimer: "Disclaimer",
        lang: "中文",
        themeSystem: "System",
        themeLight: "Light",
        themeDark: "Dark",
    }
};

export const AI_TOOLS = [
    {
        id: "deepseek",
        name: "DeepSeek",
        desc: {
            zh: "国产之光，性能卓越的闭源/开源平衡大模型。",
            en: "The pride of domestic AI, a high-performance balance between closed and open source models."
        },
        category: {
            zh: "大模型",
            en: "LLM"
        },
        tags: ["国产", "对话", "开源"],
        icon: "Brain",
        link: "https://www.deepseek.com"
    },
    {
        id: "openclaw",
        name: "OpenClaw",
        desc: {
            zh: "强大的私有化 AI 智能体网关，连接各种社交平台并执行自动化任务。",
            en: "Powerful private AI agent gateway, connecting social platforms and executing automated tasks."
        },
        category: {
            zh: "安装工具",
            en: "Setup Tools"
        },
        tags: ["Agent", "开源", "自动化"],
        icon: "Download",
        link: "https://openclaw.ai"
    },
    {
        id: "ollama",
        name: "Ollama",
        desc: {
            zh: "最简单的本地运行大模型工具，支持一键安装。",
            en: "The easiest tool to run LLMs locally with one-click installation."
        },
        category: {
            zh: "安装工具",
            en: "Setup Tools"
        },
        tags: ["本地化", "简单", "开源"],
        icon: "Download",
        link: "https://ollama.com"
    },
    {
        id: "cursor",
        name: "Cursor",
        desc: {
            zh: "AI 时代的代码编辑器，内置强大 AI 辅助功能。",
            en: "The AI-native code editor with powerful built-in AI assistance."
        },
        category: {
            zh: "代码助理",
            en: "Coding AI"
        },
        tags: ["编程", "提效"],
        icon: "Code2",
        link: "https://cursor.sh",
    },
    {
        id: "flux",
        name: "FLUX.1",
        desc: {
            zh: "目前最顶级的开源 AI 绘画模型，画质惊人。",
            en: "The top-tier open-source AI image generation model with stunning quality."
        },
        category: {
            zh: "AI 绘画",
            en: "AI Art"
        },
        tags: ["绘图", "开源"],
        icon: "Image",
        link: "https://blackforestlabs.ai",
    }
];

export const CATEGORIES = {
    zh: ["全部", "大模型", "AI 绘画", "代码助理", "安装工具"],
    en: ["All", "LLM", "AI Art", "Coding AI", "Setup Tools"]
};
