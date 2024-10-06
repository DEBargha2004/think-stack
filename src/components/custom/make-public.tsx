"use client";

import { IIdea } from "@/../../schema/idea";
import { Button } from "../ui/button";
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
import { Loader2, UserRound, UsersRound } from "lucide-react";
import { updateIdeaVisibilityIntoDB } from "@/actions/idea";
import { cn, isActionError } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useIdeaPlaygroundContext } from "@/providers/idea-playground";

export function MakePublicButton({ id }: { id: string }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [dialogState, setDialogState] = useState({
    visibility: false,
  });
  const { ideaState, setIdea } = useIdeaPlaygroundContext();
  const handleConvertToPublic = async () => {
    try {
      setLoading(true);
      const resp = await updateIdeaVisibilityIntoDB(
        id,
        ideaState.visibility === "public" ? "private" : "public",
      );
      if (isActionError(resp)) {
        toast({
          title: "Oops!",
          description: resp.error,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (resp) {
        toast({
          title: "Yuppey!",
          description: resp.message,
        });
        setIdea((prev) => {
          prev.visibility =
            ideaState.visibility === "public" ? "private" : "public";
        });
        setDialogState((prev) => ({ ...prev, visibility: false }));
      }
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Failed to make idea public",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <Dialog
      open={dialogState.visibility}
      onOpenChange={(e) =>
        setDialogState((prev) => ({ ...prev, visibility: e }))
      }
    >
      <DialogTrigger asChild>
        <Button variant={"outline"} className="px-2">
          {ideaState.visibility === "public" ? (
            <UsersRound className="h-4 w-4" />
          ) : (
            <UserRound className="h-4 w-4" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Make {ideaState.visibility === "public" ? "Private" : "Public"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          This idea will be{" "}
          {ideaState.visibility === "public" ? "invisible" : "visible"}
          &nbsp;to everyone.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild className="sm:mt-0 mt-2">
            <Button variant={"secondary"}>Cancel</Button>
          </DialogClose>
          <Button variant={"destructive"} onClick={handleConvertToPublic}>
            <Loader2
              className={cn("h-4 w-4 mr-2 animate-spin", !loading && "hidden")}
            />
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
