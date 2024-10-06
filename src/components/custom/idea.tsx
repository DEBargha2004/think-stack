import { forwardRef, HTMLProps, useState } from "react";
import { IIdea } from "@/../../schema/idea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn, isActionError } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  GitFork,
  Loader2,
  MoreVertical,
  Trash2,
  UserRound,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useGlobalAppStore } from "@/store/global-app-store";
import { useToast } from "@/hooks/use-toast";
import { deleteIdeaFromDB } from "@/actions/idea";
import { LimitedIdeaPreview } from "./limited-idea-preview";

const Idea = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> & { idea: IIdea }
>(({ className, idea, ...props }, ref) => {
  const { deleteIdea } = useGlobalAppStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState({
    delete: false,
  });

  const handleDeleteIdea = async () => {
    setLoading({
      ...loading,
      delete: true,
    });
    try {
      const resp = await deleteIdeaFromDB(idea._id);
      if (isActionError(resp)) {
        toast({
          title: "Oops!",
          description: resp.error,
          variant: "destructive",
        });
        return;
      }
      if (resp) {
        deleteIdea(idea._id);
        toast({
          title: "Deleted",
          description: resp.message,
        });
      }
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Failed to delete idea",
        variant: "destructive",
      });
    }

    setLoading({
      ...loading,
      delete: false,
    });
  };
  return (
    <Card ref={ref} className={cn("", className)} {...props}>
      <CardHeader className="flex-row justify-between space-y-0 items-center">
        <div className="flex justify-start items-center gap-2">
          <Link href={`/ideas/${idea._id}`}>
            <CardTitle className="line-clamp-1 hover:underline">
              {idea.title || "Untitled"}
            </CardTitle>
          </Link>
          {idea.isForked && <GitFork className="h-4 w-4" />}
          {idea.visibility === "public" ? (
            <UsersRound className="h-4 w-4" />
          ) : (
            <UserRound className="h-4 w-4" />
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              className={cn(
                "p-0 w-8 h-8 rounded-full grid place-content-center",
                "hover:bg-muted transition-all",
              )}
            >
              <MoreVertical className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  className="focus:bg-destructive/60"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  Deleting an idea is permanent and cannot be undone.
                </DialogDescription>
                <DialogFooter>
                  <DialogClose className="sm:mt-0 mt-2">
                    <Button variant={"secondary"} className="w-full">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button variant={"destructive"} onClick={handleDeleteIdea}>
                    <Loader2
                      className={cn(
                        "w-4 h-4 mr-2 animate-spin",
                        !loading.delete && "hidden",
                      )}
                    />
                    <span>Delete</span>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <LimitedIdeaPreview ideaContents={idea.content} />
      </CardContent>
    </Card>
  );
});

Idea.displayName = "Idea";

export default Idea;
