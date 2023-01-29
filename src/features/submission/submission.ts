import { z } from "zod";
import { problemSchema } from "@features/problems/problem";

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
  contestId: z.number(),
  members: memberSchema,
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
const verdict = [
  "FAILED",
  "OK",
  "PARTIAL",
  "COMPILATION_ERROR",
  "RUNTIME_ERROR",
  "WRONG_ANSWER",
  "PRESENTATION_ERROR",
  "TIME_LIMIT_EXCEEDED",
  "MEMORY_LIMIT_EXCEEDED",
  "IDLENESS_LIMIT_EXCEEDED",
  "SECURITY_VIOLATED",
  "CRASHED",
  "INPUT_PREPARATION_CRASHED",
  "CHALLENGED",
  "SKIPPED",
  "TESTING",
  "REJECTED",
] as const;
type Verdict = typeof verdict[number];

// testset
const testsetSchema = z.union([
  z.literal("SAMPLES"),
  z.literal("PRETESTS"),
  z.literal("TESTS"),
  z.literal("CHALLENGES"),
  z.literal("TEST1"),
  z.literal("TEST2"),
  z.literal("TEST3"),
  z.literal("TEST4"),
  z.literal("TEST5"),
  z.literal("TEST6"),
  z.literal("TEST7"),
  z.literal("TEST8"),
  z.literal("TEST9"),
  z.literal("TEST10"),
]);
const testset = [
  "SAMPLES",
  "PRETESTS",
  "TESTS",
  "TEST1",
  "TEST2",
  "TEST3",
  "TEST4",
  "TEST5",
  "TEST6",
  "TEST7",
  "TEST8",
  "TEST9",
  "TEST10",
] as const;
type Testset = typeof testset[number];

// submission
const submissionSchema = z.object({
  submissionId: z.number(),
  contestId: z.number().optional(),
  creationTimeSeconds: z.number(),
  relativeTimeSeconds: z.number(),
  problem: problemSchema,
  author: partySchema,
  programmingLanuguage: z.string(),
  verdict: verdictSchema,
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
