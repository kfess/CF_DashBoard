import { z } from "zod";
import { problemSchema } from "@features/problems/problem";
import { normalizedLanguage, normalizeLanguage,type NormalizedLanguage } from "@features/language/language";

// https://codeforces.com/apiHelp/objects#Member
// https://codeforces.com/apiHelp/objects#Party
// https://codeforces.com/apiHelp/objects#Submission

// member
const memberSchema = z.object({
  handle: z.string(),
  name: z.string().optional(),
});

// participantType
const participantTypeSchema = z.union([
  z.literal("CONTESTANT"),
  z.literal("PRACTICE"),
  z.literal("VIRTUAL"),
  z.literal("MANAGER"),
  z.literal("OUT_OF_COMPETITION"),
]);
const participantType = [
  "CONTESTANT",
  "PRACTICE",
  "VIRTUAL",
  "MANAGER",
  "OUT_OF_COMPETITION",
] as const;
type ParticipantType = typeof participantType[number];

// party
const partySchema = z.object({
  contestId: z.number().optional(),
  members: z.array(memberSchema),
  participantType: participantTypeSchema,
  teamId: z.number().optional(),
  teamName: z.string().optional(),
  ghost: z.boolean(),
  room: z.number().optional(),
  startTimeSeconds: z.number().optional(),
});

// verdict
const verdictSchema = z.union([
  z.literal("FAILED"),
  z.literal("OK"),
  z.literal("PARTIAL"),
  z.literal("COMPILATION_ERROR"),
  z.literal("RUNTIME_ERROR"),
  z.literal("WRONG_ANSWER"),
  z.literal("PRESENTATION_ERROR"),
  z.literal("TIME_LIMIT_EXCEEDED"),
  z.literal("MEMORY_LIMIT_EXCEEDED"),
  z.literal("IDLENESS_LIMIT_EXCEEDED"),
  z.literal("SECURITY_VIOLATED"),
  z.literal("CRASHED"),
  z.literal("INPUT_PREPARATION_CRASHED"),
  z.literal("CHALLENGED"),
  z.literal("SKIPPED"),
  z.literal("TESTING"),
  z.literal("REJECTED"),
]);

export const verdicts = {
  OK: "AC",
  FAILED: "FAILED",
  PARTIAL: "PARTIAL",
  COMPILATION_ERROR: "CE",
  RUNTIME_ERROR: "RE",
  WRONG_ANSWER: "WA",
  PRESENTATION_ERROR: "PE",
  TIME_LIMIT_EXCEEDED: "TESTING",
  IDLENESS_LIMIT_EXCEEDED: "ILE",
  SECURITY_VIOLATED: "SV",
  CRASHED: "CRASHED",
  INPUT_PREPARATION_CRASHED: "IPC",
  CHALLENGED: "CHALLENGED",
  SKIPPED: "SKIPPED",
  TESTING: "TESTING",
  REJECTED: "REJECTED",
  MEMORY_LIMIT_EXCEEDED: "MLE",
  UNKNOWN: "UNKNOWN",
} as const;

export type Verdict = keyof typeof verdicts;
export type VerdictAbbr = typeof verdicts[Verdict];

export const verdictAbbrFilter = [...Object.values(verdicts), "All"] as const;
export type VerdictFilter = typeof verdictAbbrFilter[number];

// testset
const testsetSchema = z.union([
  z.literal("SAMPLES"),
  z.literal("PRETESTS"),
  z.literal("TESTS"),
  z.literal("CHALLENGES"),
  z.literal("TESTS1"),
  z.literal("TESTS2"),
  z.literal("TESTS3"),
  z.literal("TESTS4"),
  z.literal("TESTS5"),
  z.literal("TESTS6"),
  z.literal("TESTS7"),
  z.literal("TESTS8"),
  z.literal("TESTS9"),
  z.literal("TESTS10"),
]);
const testset = [
  "SAMPLES",
  "PRETESTS",
  "TESTS",
  "TESTS1",
  "TESTS2",
  "TESTS3",
  "TESTS4",
  "TESTS5",
  "TESTS6",
  "TESTS7",
  "TESTS8",
  "TESTS9",
  "TESTS10",
] as const;
type Testset = typeof testset[number];

// normalize language from string to NormalizedLanguage
const normalizedLanguageSchema = z.string().transform(normalizeLanguage).refine(
  (val: string) => normalizedLanguage.includes(val as NormalizedLanguage),   // I don't want to use "as" assertion...
  { message: "Invalid language" }
);

// submission
const submissionSchema = z.object({
  id: z.number(),
  contestId: z.number().optional(),
  creationTimeSeconds: z.number(),
  relativeTimeSeconds: z.number(),
  problem: problemSchema,
  author: partySchema,
  programmingLanguage: normalizedLanguageSchema,
  verdict: z.optional(verdictSchema),
  testset: testsetSchema,
  passedTestCount: z.number().optional(),
  timeConsumedMillis: z.number(),
  memoryConsumedBytes: z.number(),
  points: z.number().optional(),
});
export type Submission = z.infer<typeof submissionSchema>;

// Codeforces Submission API
const statusSchema = z.union([z.literal("OK"), z.literal("FAILED")]);

export const submissionApiSchema = z.object({
  status: statusSchema,
  result: z.optional(z.array(submissionSchema)),
  comment: z.optional(z.string()),
});
export type SubmissionAPI = z.infer<typeof submissionApiSchema>;

export const okSubmissionApiSchema = z.object({
  status: statusSchema,
  result: z.array(submissionSchema),
});
export type OkSubmissionAPI = z.infer<typeof okSubmissionApiSchema>;
