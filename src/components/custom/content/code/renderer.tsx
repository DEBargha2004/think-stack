"use client";

import { forwardRef, HTMLProps, useEffect } from "react";
import CodeEditorWrapper from "../../code-editor-wrapper";
import { RendererProps } from "@/types/content";
import { cn } from "@/lib/utils";
import hljs from "highlight.js/lib/core";

import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import cpp from "highlight.js/lib/languages/cpp";
import html from "highlight.js/lib/languages/xml";
import "highlight.js/styles/atom-one-dark.css";

hljs.registerLanguage("javascript", typescript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("html", html);

const Renderer = forwardRef<
  HTMLPreElement,
  RendererProps<HTMLProps<HTMLPreElement>>
>(({ value, className, ...props }, ref) => {
  const highlightedCode = hljs.highlightAuto(value ?? "").value;

  if (!window) hljs.highlightAll();

  useEffect(() => {
    hljs.highlightAll();
  }, [highlightedCode]);

  return (
    <CodeEditorWrapper
      lineCount={value?.split("\n").length}
      onCopy={() => navigator.clipboard?.writeText(value ?? "")}
    >
      <pre
        className={cn("w-full overflow-x-auto p-[10px]", className)}
        {...props}
        ref={ref}
      >
        <code
          style={{ backgroundColor: "var(--background)", padding: 0 }}
          className="leading-normal text-[12px]"
        >
          {value}
        </code>
      </pre>
    </CodeEditorWrapper>
  );
});

Renderer.displayName = "Renderer";

export default Renderer;
