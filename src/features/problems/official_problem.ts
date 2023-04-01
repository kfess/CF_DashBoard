import { z } from "zod";
import { typeSchema } from "@features/problems/problem";
import { tagSchema } from "./problem";
import { Tag } from "./problem";

export const officialProblemSchema = z.object({
  contestId: z.number(),
  problemsetName: z.string().optional(),
  index: z.string(),
  name: z.string(),
  type: typeSchema,
  points: z.number().optional(),
  rating: z.number().optional(),
  tags: z
    .array(tagSchema)
    .or(z.array(z.string())) // "tags" is sometimes empty array [], how can this situation be handled more elegantly?
    .transform((val) =>
      val.length > 0 ? (val as Tag[]) : (["no tags"] as const)
    ),
});
export const officialProblemsSchema = z.array(officialProblemSchema);
export type OfficialProblem = z.infer<typeof officialProblemSchema>;

// Problem Statistics
export const officialProblemStatisticsSchema = z.object({
  contestId: z.number().optional(),
  index: z.string().optional(),
  solvedCount: z.number().optional(),
});
export const officialProblemStatisticssSchema = z.array(
  officialProblemStatisticsSchema
);
export type OfficialProblemStatistics = z.infer<
  typeof officialProblemStatisticsSchema
>;

// Codeforces API
const statusSchema = z.union([z.literal("OK"), z.literal("FAILED")]);

export const okProblemsApiSchema = z.object({
  status: statusSchema,
  result: z.object({
    problems: officialProblemsSchema,
    problemStatistics: officialProblemStatisticssSchema,
  }),
});
