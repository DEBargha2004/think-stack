"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { createIdeaIntoDB } from "@/actions/idea";
import { isActionError } from "@/lib/utils";
import { useGlobalAppStore } from "@/store/global-app-store";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { IdeaSchema, TIdeaSchema } from "@/schema/idea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { visibility } from "@/../../schema/idea";
import IdeaCreateForm from "@/components/custom/forms/idea-create-form";

export default function CreateIdeaButton() {
  const { addIdea } = useGlobalAppStore();
  const { toast } = useToast();
  const [dialogState, setDialogState] = useState({
    createIdea: false,
  });
  const form = useForm<TIdeaSchema>({
    resolver: zodResolver(IdeaSchema),
    defaultValues: {
      visibility: visibility[0].value,
    },
  });
  const router = useRouter();

  const handleCreateIdea = async (data: TIdeaSchema) => {
    try {
      const idea = await createIdeaIntoDB(data);

      console.log(idea);

      if (isActionError(idea)) {
        toast({
          title: "Oops!",
          description: idea.error,
          variant: "destructive",
        });

        return;
      }
      if (idea) addIdea(idea?.idea);
      form.reset();

      setDialogState((prev) => ({ ...prev, createIdea: false }));
      toast({
        title: "Yuppey!",
        description: "Idea created successfully",
      });

      setTimeout(() => {
        router.push(`/ideas/${idea?.idea._id}`);
      }, 1000);
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Failed to create idea",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog
      open={dialogState.createIdea}
      onOpenChange={(e) =>
        setDialogState((prev) => ({ ...prev, createIdea: e }))
      }
    >
      <DialogTrigger asChild>
        <Button title="Create Idea" className="px-2">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <IdeaCreateForm form={form} handleSubmit={handleCreateIdea} />
      </DialogContent>
    </Dialog>
  );
}
