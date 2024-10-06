import * as z from "zod";

const IdeaSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  visibility: z.string().optional(),
});

type TIdeaSchema = z.infer<typeof IdeaSchema>;

export { IdeaSchema, type TIdeaSchema };
