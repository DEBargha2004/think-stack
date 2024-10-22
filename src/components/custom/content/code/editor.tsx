"use client";

import { cn } from "@/lib/utils";
import { forwardRef, HTMLProps } from "react";
import Editor from "react-simple-code-editor";
import CodeEditorWrapper from "../../code-editor-wrapper";
import { EditorProps } from "@/types/content";
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

const IdeaContentCodeEditor = forwardRef<
  HTMLDivElement,
  EditorProps<HTMLProps<HTMLDivElement>>
>(({ value, className, onChange, ...props }, ref) => {
  const changeHandler = (value: string) => {
    onChange?.(value);
  };
  return (
    <CodeEditorWrapper
      isEditor={true}
      lineCount={value?.split("\n").length}
      onCopy={() => navigator.clipboard?.writeText(value ?? "")}
    >
      <div
        ref={ref}
        className={cn(
          "border-x w-full text-muted dark:text-muted-foreground",
          className,
        )}
        {...props}
      >
        <Editor
          value={value ?? ""}
          onValueChange={changeHandler}
          highlight={(code) => hljs.highlightAuto(code).value}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: "12px",
            width: "100%",
            lineHeight: "1.5",
          }}
        />
      </div>
    </CodeEditorWrapper>
  );
});

IdeaContentCodeEditor.displayName = "IdeaContentCodeEditor";

export default IdeaContentCodeEditor;
