"use client";

import { useIdeaPlaygroundContext } from "@/providers/idea-playground";
import { Textarea } from "../ui/textarea";
import { useRef, useState } from "react";
import { Separator } from "../ui/separator";
import { Loader2 } from "lucide-react";
import { cn, isActionError } from "@/lib/utils";
import { Button } from "../ui/button";
import { updateIdeaIntoDB } from "@/actions/idea";
import { useToast } from "@/hooks/use-toast";
import { IIdea, TContent } from "@/../../schema/idea";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { IdeaPreview } from "./idea-preview";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IdeaContentEditor } from "./idea-content-editor";
import { nanoid } from "nanoid";
import IdeaControls from "./idea-controls";
import { useUser } from "@clerk/nextjs";

export default function IdeaCreateEditor({}: { disabled?: boolean }) {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const { ideaState, setIdea } = useIdeaPlaygroundContext();
  const { toast } = useToast();
  const [loading, setLoading] = useState({ save: false });
  const { user } = useUser();

  const adjustTextreaHeight = () => {
    if (titleRef.current) {
      const element = titleRef.current;

      element.style.height = "auto";
      element.style.height = `${element.scrollHeight}px`;
    }
  };

  const saveContent = async (idea: IIdea) => {
    return await updateIdeaIntoDB(idea);
  };

  const handleSaveIdea = async () => {
    setLoading((prev) => ({ ...prev, save: true }));

    try {
      const resp = await saveContent(ideaState);
      if (isActionError(resp)) {
        toast({
          title: "Oops!",
          description: resp.error,
          variant: "destructive",
        });

        return;
      }

      if (resp) {
        toast({
          title: "Yuppey!",
          description: resp.message,
        });
      }
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Failed to save idea",
        variant: "destructive",
      });
    }

    setLoading((prev) => ({ ...prev, save: false }));
  };

  const handleAddIdea = (type: TContent["type"]) => (e: React.MouseEvent) => {
    setIdea((idea) => {
      let newContent: TContent;
      switch (type) {
        case "snippet":
          newContent = {
            type: "snippet",
            data: "",
            _id: nanoid(),
            language: "javascript",
          };
          break;
        case "text":
          newContent = {
            type: "text",
            data: "",
            _id: nanoid(),
          };
          break;
        case "embed":
          newContent = {
            type: "embed",
            data: "",
            _id: nanoid(),
          };
          break;
        default:
          throw new Error(`Invalid type: ${type}`);
      }
      idea.content.push(newContent);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-2">
        <Textarea
          ref={titleRef}
          value={ideaState.title}
          onChange={(e) => {
            setIdea((idea) => {
              idea.title = e.target.value;
            });

            adjustTextreaHeight();
          }}
          className="text-2xl border-none focus-visible:ring-0 resize-none leading-7 p-0 w-full"
        />
        <div className="flex gap-2">
          <IdeaControls
            id={ideaState._id}
            controls={{ visibility: true, share: true }}
          />
        </div>
      </div>
      <Separator />

      {ideaState.content.map((content, index) => (
        <IdeaContentEditor
          key={content._id}
          index={index}
          value={content.data}
        />
      ))}

      <div className="flex justify-between pt-20">
        <div className="flex gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" variant={"outline"}>
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent
              className={cn(
                "max-w-full overflow-hidden md:max-w-[700px] lg:max-w-[900px] h-[calc(100svh-4em)]",
                "overflow-y-auto block",
              )}
            >
              <IdeaPreview idea={ideaState} userId={user?.id ?? ""} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant={"secondary"}>
                Add
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleAddIdea("text")}>
                Textarea
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleAddIdea("snippet")}>
                Code
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleAddIdea("embed")}>
                Embed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleSaveIdea}>
            <Loader2
              className={cn(
                "h-4 w-4 mr-2 animate-spin",
                !loading.save && "hidden",
              )}
            />
            <span>Save</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
