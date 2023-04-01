import { z } from "zod";
import { typeSchema, phaseSchema, kindSchema } from "./contest";

// reference: https://codeforces.com/apiHelp/objects#Contest

export const officialContestSchema = z.object({
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
});

export const officialContestsSchema = z.array(officialContestSchema);
export type OfficialContest = z.infer<typeof officialContestSchema>;

// Codeforces API
const statusSchema = z.union([z.literal("OK"), z.literal("FAILED")]);

export const okContestsApiSchema = z.object({
  status: statusSchema,
  result: officialContestsSchema,
});
