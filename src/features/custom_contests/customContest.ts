import { z } from "zod";
import { problemsSchema } from "@features/problems/problem";

export const createdContestTypes = ["Running", "Upcoming", "Finished"] as const;
export type CreatedContestType = typeof createdContestTypes[number];

const visibilitySchema = z.union([z.literal("Public"), z.literal("Private")]);
export const visibilities = ["Public", "Private"] as const;
export type Visibility = typeof visibilities[number];

export const customContestSchema = z.object({
  contestId: z.string(),
  title: z.string(),
  owner: z.string(),
  description: z.string(),
  penalty: z.number(),
  startDate: z.string(),
  length: z.number(), // minutes
  visibility: visibilitySchema,
  participants: z.array(z.object({ userId: z.string() })).min(1),
  problems: problemsSchema,
});
export const customContestsSchema = z.array(customContestSchema);
export type CustomContest = z.infer<typeof customContestSchema>;
