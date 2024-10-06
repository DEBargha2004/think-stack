import { HTMLProps } from "react";
import { TContent } from "@/../../schema/idea";
import { cn } from "@/lib/utils";
import IdeaContent from "./idea-content";

export function LimitedIdeaPreview({
  ideaContents,
  className,
  ...props
}: HTMLProps<HTMLDivElement> & { ideaContents: TContent[] }) {
  return (
    <div
      className={cn("h-36 relative overflow-hidden space-y-2", className)}
      {...props}
    >
      {ideaContents.map((content, index) => (
        <IdeaContent ideaContent={content} key={content._id} />
      ))}
      <div
        className={cn(
          "h-10 absolute bottom-0 left-0 w-full",
          "bg-gradient-to-t from-background to-transparent",
        )}
      ></div>
    </div>
  );
}
