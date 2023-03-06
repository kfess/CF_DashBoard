import { z } from "zod";
import { tagSchema } from "@features/problems/problem";
import { problemsSchema } from "@features/problems/problem";

export const createdContestTypes = ["Running", "Upcoming", "Finished"] as const;
export type CreatedContestType = typeof createdContestTypes[number];

const visibilitySchema = z.union([z.literal("Public"), z.literal("Private")]);
export const visibilities = ["Public", "Private"] as const;
export type Visibility = typeof visibilities[number];

const modeSchema = z.union([
  z.literal("Normal"),
  z.literal("Lockout"),
  z.literal("Training"),
]);
export const modes = ["Normal", "Lockout", "Training"] as const;
export type Mode = typeof modes[number];

export const customContestSchema = z.object({
  contestId: z.string(),
  title: z.string().min(1),
  owner: z.string(),
  description: z.string(),
  penalty: z.number(),
  mode: modeSchema,
  startDate: z.string(),
  endDate: z.string(),
  visibility: visibilitySchema,
  participants: z.array(z.object({ userId: z.string() })).min(1),
  problems: problemsSchema,
});
export const customContestsSchema = z.array(customContestSchema);
export type CustomContest = z.infer<typeof customContestSchema>;

export const problemSuggestOptionSchema = z.object({
  count: z.number(),
  difficultyFrom: z.number(),
  difficultyTo: z.number(),
  includeTags: z.array(tagSchema),
  excludeTags: z.array(tagSchema),
  randomizeOrder: z.boolean(),
  excludeSolvedProblems: z.boolean(),
});
export type ProblemSuggestOption = z.infer<typeof problemSuggestOptionSchema>;
