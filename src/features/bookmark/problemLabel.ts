import { z } from "zod";
import { problemSchema } from "@features/problems/problem";

// 保存に必要な情報だけを抽出したスキーマ
const partialProblemSchema = problemSchema
  .pick({
    contestId: true,
    index: true,
    name: true,
    rating: true,
  })
  .extend({ contestName: z.string() });
export type PartialProblem = z.infer<typeof partialProblemSchema>;

// for existing label
export const problemLabelSchema = z.object({
  id: z.number().min(0).optional(),
  name: z.string().trim().min(1, { message: "Name cannot be blank value." }),
  description: z
    .string()
    .max(256, { message: "Description message is too long." })
    .optional(),
  color: z.string(),
  problems: z.array(partialProblemSchema),
});
export type ProblemLabel = z.infer<typeof problemLabelSchema>;

// for creating new label
export const problemLabelFormSchema = problemLabelSchema.pick({
  name: true,
  description: true,
  color: true,
});
export type ProblemLabelForm = z.infer<typeof problemLabelFormSchema>;
