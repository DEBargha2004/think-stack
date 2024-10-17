"use client";

import { cn } from "@/lib/utils";
import { HTMLProps, useState } from "react";
import { Button } from "../ui/button";
import { Clipboard, ClipboardCheck } from "lucide-react";

export default function CodeEditorWrapper({
  children,
  className,
  lineCount = 0,
  isEditor = false,
  onCopy,
  ...props
}: HTMLProps<HTMLDivElement> & {
  lineCount?: number;
  isEditor?: boolean;
  onCopy?: () => void;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    onCopy?.();
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };
  return (
    <div
      className={cn(
        "border rounded-lg bg-gray-800 divide-y divide-gray-700",
        className,
      )}
      {...props}
    >
      <div className="h-8 pl-2 flex justify-start items-center gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-2.5 aspect-square rounded-full bg-gray-600 shrink-0"
          />
        ))}
        {onCopy ? (
          <Button
            className="px-2 [&>svg]:h-4 [&>svg]:w-4 h-8 ml-auto hover:bg-background/20"
            variant={"ghost"}
            onClick={handleCopy}
          >
            {isCopied ? <ClipboardCheck /> : <Clipboard />}
          </Button>
        ) : null}
      </div>
      <div className="flex justify-start items-start ">
        <div
          className={cn(
            "self-stretch flex flex-col p-[10px] leading-normal",
            isEditor && "p-[10px]",
          )}
        >
          {Array.from({ length: lineCount }).map((d, i) => (
            <span
              key={i}
              className={cn(
                "text-[12px] text-muted dark:text-muted-foreground inline-block opacity-50 font-extralight",
              )}
              style={{ fontFamily: '"Fira code", "Fira Mono", monospace' }}
            >
              {i + 1}
            </span>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}
