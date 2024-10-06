import React, { HTMLProps } from "react";
import { IIdea } from "@/../../schema/idea";
import { cn } from "@/lib/utils";
import IdeaContent from "./idea-content";
import { Separator } from "../ui/separator";
import IdeaControls from "./idea-controls";

function IdeaPreview({
  idea,
  className,
  previewOnly = true,
  userId,
  ...props
}: HTMLProps<HTMLDivElement> & {
  idea: IIdea;
  userId: string;
  previewOnly?: boolean;
}) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div className="flex justify-center items-start gap-2">
        <h1 className="text-3xl w-full">{idea.title}</h1>
        {!previewOnly && (
          <div className="flex gap-2">
            <IdeaControls
              id={idea._id}
              controls={{
                edit: true,
                visibility: true,
                fork: idea.visibility === "public" && userId !== idea.userId,
              }}
            />
          </div>
        )}
      </div>
      <Separator />
      <div className="space-y-4">
        {idea.content.map((content, index) => (
          <React.Fragment key={content._id}>
            <IdeaContent ideaContent={content} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export { IdeaPreview };
