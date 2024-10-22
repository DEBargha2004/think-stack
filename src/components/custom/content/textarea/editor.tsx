"use client";

import { Textarea } from "@/components/ui/textarea";
import { combineRefs } from "@/functions/combine-refs";
import { cn } from "@/lib/utils";
import { EditorProps } from "@/types/content";
import React, { forwardRef, HTMLProps, useEffect, useRef } from "react";

const Editor = forwardRef<
  HTMLTextAreaElement,
  EditorProps<HTMLProps<HTMLTextAreaElement>>
>(({ value, className, onChange, ...props }, ref) => {
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextreaHeight = () => {
    if (contentRef.current) {
      const element = contentRef.current;

      element.style.height = "auto";
      element.style.height = `${element.scrollHeight + 16 + 2}px`;
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
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
      onChange={changeHandler}
      {...props}
    />
  );
});

Editor.displayName = "Editor";

export default Editor;
