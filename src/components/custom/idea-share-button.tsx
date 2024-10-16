"use client";

import { Button } from "../ui/button";
import { Clipboard, ClipboardCheck, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";

export default function IdeaShareButton({ id }: { id: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyIdeaUrl = async () => {
    const link = `${window.location.origin}/ideas/${id}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(link);
    }

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="px-2">
          <Share2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Idea</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Copy the link below to share your idea with others.
        </DialogDescription>
        <div className="mt-2 flex justify-between items-center">
          <p className="text-sm opacity-90">
            {window.location.origin}/ideas/{id}
          </p>
          <Button
            className="px-2 [&>svg]:h-4 [&>svg]:w-4"
            variant={"outline"}
            onClick={handleCopyIdeaUrl}
          >
            {isCopied ? <ClipboardCheck /> : <Clipboard />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
