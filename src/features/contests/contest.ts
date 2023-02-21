import { z } from "zod";
import {
  problemsSchema,
  reshapedProblemSchema,
} from "@features/problems/problem";

// reference: https://codeforces.com/apiHelp/objects#Contest

const typeSchema = z.union([
  z.literal("CF"),
  z.literal("IOI"),
  z.literal("ICPC"),
  z.literal("Other"),
]);
const contestType = ["CF", "IOI", "ICPC", "Other"] as const;
export type ContestType = typeof contestType[number];

export const classificationSchema = z.union([
  z.literal("All"),
  z.literal("Div. 1"),
  z.literal("Div. 1 + Div. 2"),
  z.literal("Div. 2"),
  z.literal("Div. 3"),
  z.literal("Div. 4"),
  z.literal("ICPC"),
  z.literal("Kotlin Heros"),
  z.literal("Global"),
  z.literal("Educational"),
  z.literal("Others"),
]);
export const classifications = [
  "All",
  "Div. 1",
  "Div. 1 + Div. 2",
  "Div. 2",
  "Div. 3",
  "Div. 4",
  "ICPC",
  "Kotlin Heros",
  "Global",
  "Educational",
  "Others",
] as const;
export type Classification = typeof classifications[number];

const phaseSchema = z.union([
  z.literal("BEFORE"),
  z.literal("CODING"),
  z.literal("PENDING_SYSTEM_TEST"),
  z.literal("SYSTEM_TEST"),
  z.literal("FINISHED"),
]);
const phase = [
  "BEFORE",
  "CODING",
  "PENDING_SYSTEM_TEST",
  "SYSTEM_TEST",
  "FINISHED",
] as const;
export type Phase = typeof phase[number];

const kindSchema = z
  .union([
    z.literal("Official ICPC Contest"),
    z.literal("Official School Contest"),
    z.literal("Opencup Contest"),
    z.literal("School/University/City/Region Championship"),
    z.literal("Training Camp Contest"),
    z.literal("Official International Personal Contest"),
    z.literal("Training Contest"),
  ])
  .optional();
const kind = [
  "Official ICPC Contest",
  "Official School Contest",
  "School/University/City/Region Championship",
  "Training Camp Contest",
  "Official International Personal Contest",
  "Training Contest",
] as const;
export type Kind = typeof kind[number];

export const contestSchema = z.object({
  contestId: z.number(),
  contestName: z.string(),
  type: typeSchema,
  phase: phaseSchema,
  frozen: z.boolean(),
  durationSeconds: z.number(),
  startTimeSeconds: z.number(),
  relativeTimeSeconds: z.number().optional(),
  preparedBy: z.string().optional(),
  websiteUrl: z.string().optional(),
  description: z.string().optional(),
  difficulty: z.number().optional(),
  kind: kindSchema.optional(),
  icpcRegion: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  season: z.number().optional(),
  problems: problemsSchema,
  classification: classificationSchema,
});
export const contestsSchema = z.array(contestSchema);
export type Contest = z.infer<typeof contestSchema>;

// need "reshape" for displaying contest table
//by groupBying problems with the same index (A, A2)
const reshapedContestSchema = z.object({
  contestId: z.number(),
  contestName: z.string(),
  type: typeSchema,
  phase: phaseSchema,
  frozen: z.boolean(),
  durationSeconds: z.number(),
  startTimeSeconds: z.number(),
  relativeTimeSeconds: z.number().optional(),
  preparedBy: z.string().optional(),
  websiteUrl: z.string().optional(),
  description: z.string().optional(),
  difficulty: z.number().optional(),
  kind: kindSchema.optional(),
  icpcRegion: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  season: z.number().optional(),
  problems: z.array(reshapedProblemSchema),
  classification: classificationSchema,
});
export const reshapedContestsSchema = z.array(reshapedContestSchema);
export type ReshapedContest = z.infer<typeof reshapedContestSchema>;
