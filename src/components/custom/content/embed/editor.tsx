"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EditorProps } from "@/types/content";
import { forwardRef, HTMLProps } from "react";

const Editor = forwardRef<
  HTMLInputElement,
  EditorProps<HTMLProps<HTMLInputElement>>
>(({ className, value, onChange, ...props }, ref) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };
  return (
    <div className={cn("group space-y-4", className)}>
      <Input
        className={cn("", className)}
        value={value}
        ref={ref}
        onChange={changeHandler}
        {...props}
      />
      <iframe className="w-full aspect-[2/1]" src={value?.toString()} />
    </div>
  );
});

Editor.displayName = "Editor";

export default Editor;
