import { z } from "zod";
import { problemSchema } from "@features/problems/problem";

// reference: https://codeforces.com/apiHelp/objects#Contest

const typeSchema = z.union([
  z.literal("CF"),
  z.literal("IOI"),
  z.literal("ICPC"),
  z.literal("Other"),
]);
export const contestType = ["CF", "IOI", "ICPC", "Other"] as const;
export type ContestType = typeof contestType[number];

const phaseSchema = z.union([
  z.literal("BEFORE"),
  z.literal("CODING"),
  z.literal("PENDING_SYSTEM_TEST"),
  z.literal("SYSTEM_TEST"),
  z.literal("FINISHED"),
]);
export const phase = [
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
export const kind = [
  "Official ICPC Contest",
  "Official School Contest",
  "School/University/City/Region Championship",
  "Training Camp Contest",
  "Official International Personal Contest",
  "Training Contest",
] as const;
export type Kind = typeof kind[number];

export const contestSchema = z.object({
  id: z.number(),
  name: z.string(),
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
  problems: z.array(problemSchema),
});
export const contestsSchema = z.array(contestSchema);
export type Contest = z.infer<typeof contestSchema>;
