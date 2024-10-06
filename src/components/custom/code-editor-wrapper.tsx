import { cn } from "@/lib/utils";
import { HTMLProps } from "react";

export default function CodeEditorWrapper({
  children,
  className,
  lineCount = 0,
  isEditor = false,
  ...props
}: HTMLProps<HTMLDivElement> & {
  lineCount?: number;
  isEditor?: boolean;
}) {
  return (
    <div
      className={cn(
        "border rounded-lg bg-gray-800 divide-y divide-gray-700",
        className,
      )}
      {...props}
    >
      <div className="h-8 px-2 flex justify-start items-center gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-2.5 aspect-square rounded-full bg-gray-600 shrink-0"
          ></div>
        ))}
      </div>
      <div className="flex justify-start items-start ">
        <div
          className={cn(
            "self-stretch flex flex-col p-4 space-y-1",
            isEditor && "p-[10px]",
          )}
        >
          {Array.from({ length: lineCount }).map((d, i) => (
            <span
              key={i}
              className={cn(
                "grid place-content-center",
                "text-sm text-muted dark:text-muted-foreground inline-block h-5 opacity-50 font-extralight",
                isEditor && "text-xs h-3.5",
              )}
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
