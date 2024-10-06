import { combineRefs } from "@/functions/combine-refs";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { forwardRef, HTMLProps, useEffect, useRef } from "react";
import { useIdeaPlaygroundContext } from "@/providers/idea-playground";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import hljs from "highlight.js/lib/core";
import Editor from "react-simple-code-editor";
import { Input } from "../ui/input";
import { useGlobalAppStore } from "@/store/global-app-store";

import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import cpp from "highlight.js/lib/languages/cpp";
import html from "highlight.js/lib/languages/xml";
import CodeEditorWrapper from "./code-editor-wrapper";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("html", html);

function IdeaContentEditor({ value, index }: { value: string; index: number }) {
  const { setIdea, ideaState } = useIdeaPlaygroundContext();

  return (
    <div className="relative group">
      <div className="flex justify-end mb-2">
        <Button
          className={cn(
            "h-8 px-0 aspect-square",
            "bg-destructive/80 hover:bg-destructive",
            "md:hidden invisible group-focus-within:visible md:group-focus-within:invisible",
          )}
          onClick={() => {
            setIdea((idea) => {
              idea.content.splice(index, 1);
            });
          }}
        >
          <Trash2 className="text-destructive-foreground h-4 w-4" />
        </Button>
      </div>
      {ideaState.content[index].type === "text" && (
        <IdeaContentTextareaEditor value={value} index={index} />
      )}
      {ideaState.content[index].type === "snippet" && (
        <IdeaContentCodeEditor value={value} index={index} />
      )}
      {ideaState.content[index].type === "embed" && (
        <IdeaContentEmbedEditor value={value} index={index} />
      )}
      <Button
        className={cn(
          "h-8 px-0 aspect-square absolute -right-10 top-2",
          "hidden md:group-focus-within:inline-flex bg-destructive/80 hover:bg-destructive",
          "",
        )}
        onClick={() => {
          setIdea((idea) => {
            idea.content.splice(index, 1);
          });
        }}
      >
        <Trash2 className="text-destructive-foreground h-4 w-4" />
      </Button>
    </div>
  );
}

const IdeaContentTextareaEditor = forwardRef<
  HTMLTextAreaElement,
  HTMLProps<HTMLTextAreaElement> & { index: number }
>(({ value, className, index, ...props }, ref) => {
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const { setIdea } = useIdeaPlaygroundContext();

  const adjustTextreaHeight = () => {
    if (contentRef.current) {
      const element = contentRef.current;

      element.style.height = "auto";
      element.style.height = `${element.scrollHeight + 16 + 2}px`;
    }
  };

  useEffect(() => {
    adjustTextreaHeight();
  }, []);

  return (
    <Textarea
      value={value}
      ref={combineRefs(ref, contentRef)}
      className={cn(
        "p-2 focus-visible:ring-0 resize-none",
        "leading-7 peer",
        className,
      )}
      onChange={(e) => {
        setIdea((idea) => {
          idea.content[index].data = e.target.value;
        });

        adjustTextreaHeight();
      }}
    />
  );
});

const IdeaContentCodeEditor = forwardRef<
  HTMLDivElement,
  Omit<HTMLProps<HTMLDivElement>, "value"> & { index: number; value: string }
>(({ value, className, index, ...props }, ref) => {
  const { setIdea } = useIdeaPlaygroundContext();
  return (
    <CodeEditorWrapper isEditor={true} lineCount={value.split("\n").length}>
      <div
        ref={ref}
        className={cn(
          "border w-full text-muted dark:text-muted-foreground",
          className,
        )}
        {...props}
      >
        <Editor
          value={value}
          onValueChange={(e) =>
            setIdea((idea) => {
              idea.content[index].data = e;
            })
          }
          highlight={(code) => hljs.highlightAuto(code).value}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: "12px",
            width: "100%",
          }}
        />
      </div>
    </CodeEditorWrapper>
  );
});

const IdeaContentEmbedEditor = forwardRef<
  HTMLDivElement,
  Omit<HTMLProps<HTMLDivElement>, "value"> & { index: number; value: string }
>(({ className, index, value, ...props }, ref) => {
  const { setIdea } = useIdeaPlaygroundContext();
  return (
    <div ref={ref} className={cn("group space-y-4", className)} {...props}>
      <Input
        className={cn("", className)}
        value={value}
        onChange={(e) =>
          setIdea((ideas) => {
            ideas.content[index].data = e.target.value;
          })
        }
      />
      <iframe className="w-full aspect-[2/1]" src={value} />
    </div>
  );
});

IdeaContentTextareaEditor.displayName = "IdeaContentTextareaEditor";
IdeaContentCodeEditor.displayName = "IdeaContentCodeEditor";
IdeaContentEmbedEditor.displayName = "IdeaContentEmbedEditor";

export {
  IdeaContentEditor,
  IdeaContentTextareaEditor,
  IdeaContentCodeEditor,
  IdeaContentEmbedEditor,
};
