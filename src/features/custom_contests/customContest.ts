import { z } from "zod";
import { problemsSchema } from "@features/problems/problem";

export const createdContestTypes = ["Running", "Upcoming", "Finished"] as const;
export type CreatedContestType = typeof createdContestTypes[number];

const visibilitySchema = z.union([z.literal("Public"), z.literal("Private")]);
const visibilities = ["Public", "Private"] as const;
type Visibility = typeof visibilities[number];

export const customContestSchema = z.object({
  title: z.string(),
  owner: z.string(),
  description: z.string(),
  penalty: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  visibility: visibilitySchema,
  problems: problemsSchema,
  participants: z.array(z.string()).min(1),
});
export const customContestsSchema = z.array(customContestSchema);
export type CustomContest = z.infer<typeof customContestSchema>;
