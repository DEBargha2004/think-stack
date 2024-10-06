"use client";

import { Loader2, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { createIdeaIntoDB } from "@/actions/idea";
import { cn, isActionError } from "@/lib/utils";
import { useGlobalAppStore } from "@/store/global-app-store";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { IdeaSchema, TIdeaSchema } from "@/schema/idea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { visibility } from "@/../../schema/idea";

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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateIdea)}
            className="space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visibility</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          {visibility.map((v) => (
                            <SelectItem key={v.value} value={v.value}>
                              {v.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={6} placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full">
              <Loader2
                className={cn(
                  "h-4 w-4 mr-2 animate-spin",
                  !form.formState.isLoading && "hidden",
                )}
              />
              <span>Create</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
