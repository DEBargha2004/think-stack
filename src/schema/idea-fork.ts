import * as z from "zod";

const IdeaForkSchema = z.object({
  title: z.string().optional(),
  visibility: z.string().optional(),
});

type TIdeaForkSchema = z.infer<typeof IdeaForkSchema>;

export { IdeaForkSchema, type TIdeaForkSchema };
