"use client";

import { cn, isActionError } from "@/lib/utils";
import { IdeaForkSchema, TIdeaForkSchema } from "@/schema/idea-fork";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IIdea, visibility } from "@/../../schema/idea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { forkIdeaIntoDB } from "@/actions/idea";
import { useRouter } from "next/navigation";

export default function IdeaForkForm({
  className,
  idea,
}: {
  className?: string;
  idea: IIdea;
}) {
  const form = useForm<TIdeaForkSchema>({
    resolver: zodResolver(IdeaForkSchema),
    defaultValues: {
      title: idea.title,
      visibility: idea.visibility,
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (data: TIdeaForkSchema) => {
    try {
      const resp = await forkIdeaIntoDB(idea._id, data);

      if (isActionError(resp)) {
        toast({
          title: "Oops!",
          description: resp.error,
          variant: "destructive",
        });
        return;
      }

      if (resp)
        toast({
          title: "Idea forked successfully",
        });
      setTimeout(() => {
        window.location.href = `/ideas/${idea._id}`;
      }, 1000);
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Failed to fork idea",
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className={"space-y-4 p-4 border rounded"}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {form.formState.isLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          <span>Fork</span>
        </Button>
      </form>
    </Form>
  );
}
