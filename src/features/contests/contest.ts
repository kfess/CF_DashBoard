import { z } from "zod";
import { problemSchema } from "@features/problems/problem";

// reference: https://codeforces.com/apiHelp/objects#Contest

const typeSchema = z.union([
  z.literal("CF"),
  z.literal("IOI"),
  z.literal("ICPC"),
  z.literal("Other"),
]);
type ContestType = z.infer<typeof typeSchema>;

const phaseSchema = z.union([
  z.literal("BEFORE"),
  z.literal("CODING"),
  z.literal("PENDING_SYSTEM_TEST"),
  z.literal("SYSTEM_TEST"),
  z.literal("FINISHED"),
]);
type Phase = z.infer<typeof phaseSchema>;

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
type Kind = z.infer<typeof kindSchema>;

const contestSchema = z.object({
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
export type Contest = z.infer<typeof contestSchema>;
