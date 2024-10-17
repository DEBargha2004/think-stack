"use client";

import { HTMLProps, useEffect } from "react";
import { TContent } from "../../../schema/idea";
import { cn } from "@/lib/utils";
import CodeEditorWrapper from "./code-editor-wrapper";

import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import cpp from "highlight.js/lib/languages/cpp";
import html from "highlight.js/lib/languages/xml";
import sql from "highlight.js/lib/languages/sql";
import css from "highlight.js/lib/languages/css";

import "highlight.js/styles/atom-one-dark.css";

hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("html", html);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("css", css);

export default function IdeaContent({
  ideaContent,
  className,
  ...props
}: HTMLProps<HTMLDivElement> & { ideaContent: TContent }) {
  const highlightedCode =
    ideaContent.type === "snippet"
      ? hljs.highlightAuto(ideaContent.data).value
      : "";

  if (!window) hljs.highlightAll();

  useEffect(() => {
    hljs.highlightAll();
  }, [highlightedCode]);

  return (
    <>
      {ideaContent.type === "text" && (
        <div
          className={cn("text-foreground w-full overflow-x-auto", className)}
          {...props}
        >
          {ideaContent.data}
        </div>
      )}
      {ideaContent.type === "snippet" && (
        <CodeEditorWrapper
          lineCount={ideaContent.data.split("\n").length}
          onCopy={() => navigator.clipboard?.writeText(ideaContent.data)}
        >
          <pre className="w-full overflow-x-auto p-[10px]">
            <code
              style={{ backgroundColor: "var(--background)", padding: 0 }}
              className="leading-normal text-[12px]"
            >
              {ideaContent.data}
            </code>
          </pre>
        </CodeEditorWrapper>
      )}
      {ideaContent.type === "embed" && (
        <iframe src={ideaContent.data} className="w-full aspect-[2/1]"></iframe>
      )}
    </>
  );
}
