"use client";

import { HTMLProps, useEffect } from "react";
import { TContent } from "../../../schema/idea";
import { cn } from "@/lib/utils";

import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import cpp from "highlight.js/lib/languages/cpp";
import html from "highlight.js/lib/languages/xml";
import "highlight.js/styles/atom-one-dark.css";
import CodeEditorWrapper from "./code-editor-wrapper";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("html", html);

export default function IdeaContent({
  ideaContent,
  className,
  ...props
}: HTMLProps<HTMLDivElement> & { ideaContent: TContent }) {
  const highlightedCode =
    ideaContent.type === "snippet"
      ? hljs.highlightAuto(ideaContent.data).value
      : "";

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
        <CodeEditorWrapper lineCount={ideaContent.data.split("\n").length}>
          <pre className="w-full overflow-x-auto">
            <code style={{ backgroundColor: "var(--background)" }}>
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
