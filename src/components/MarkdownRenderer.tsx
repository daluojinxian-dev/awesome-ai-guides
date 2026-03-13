"use client";

import ReactMarkdown from "react-markdown";
import PromptBox from "./PromptBox";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-prompt/.exec(className || "");
          return !inline && match ? (
            <PromptBox content={String(children).replace(/\n$/, "")} />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
