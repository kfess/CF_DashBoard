import { z } from "zod";
import dayjs from "dayjs";
import { tagSchema } from "@features/problems/problem";
import { problemsSchema } from "@features/problems/problem";

export const apiFilterTypes = [
  "public",
  "private",
  "createdbyme",
  "joined",
] as const;
export type APIFilterType = typeof apiFilterTypes[number];

export const createdContestTypes = ["Running", "Upcoming", "Finished"] as const;
export type CreatedContestType = typeof createdContestTypes[number];

// visibility of contest
export const visibilities = ["Public", "Private"] as const;
const visibilitySchema = z
  .enum(visibilities)
  .refine((val) => visibilities.includes(val), {
    message: "Visibility must be either 'Public' or 'Private'",
  });
export type Visibility = typeof visibilities[number];

// mode of contest
export const modes = ["Normal", "Training"] as const;
const modeSchema = z.enum(modes).refine(
  (val) => {
    return modes.includes(val);
  },
  { message: "Mode must be 'Normal' or 'Training'" }
);
export type Mode = typeof modes[number];

// created custom contest
export const customContestSchema = z.object({
  contestId: z.string(),
  title: z.string().min(1),
  owner: z.string(),
  ownerId: z.string(), // github account user ID
  description: z.string(),
  penalty: z.number(),
  mode: modeSchema,
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  visibility: visibilitySchema,
  participants: z
    .array(z.string())
    .min(1, { message: "Participants required" }),
  problems: problemsSchema.min(1, {
    message: "At least one problem is required.",
  }),
});
export const customContestsSchema = z.array(customContestSchema);
export type CustomContest = z.infer<typeof customContestSchema>;

// options for custom contest problem suggestion
export const problemSuggestOptionSchema = z.object({
  count: z
    .number()
    .nonnegative({ message: "Count must be non negative value" })
    .nullable(),
  difficultyFrom: z
    .number()
    .nonnegative({ message: "Difficulty must be non negative value" })
    .refine((value) => value !== null, {
      message: "Difficulty cannot be empty",
    }),
  difficultyTo: z
    .number()
    .nonnegative({ message: "Difficulty must be non negative value" })
    .refine((value) => value !== null, {
      message: "Difficulty cannot be empty",
    }),
  includeTags: z.array(tagSchema),
  excludeTags: z.array(tagSchema),
  excludeSolved: z.boolean(),
  expectedParticipants: z.array(z.string()),
});
export type ProblemSuggestOption = z.infer<typeof problemSuggestOptionSchema>;

// to create custom contest
export const createCustomContestSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title cannot be empty" })
    .max(100, { message: "Title cannot be more than 100 characters" })
    .refine((val) => val.trim().length > 0, {
      message: "Title cannot be only whitespace",
    }),
  owner: z.string().min(1, { message: "Codeforces username have to be set." }), // codeforces account username
  ownerId: z.string().min(1, { message: "GitHub username have to be set." }), // github account username
  description: z
    .string()
    .min(1, { message: "Description cannot be empty" })
    .max(1000, { message: "Description cannot be more than 1000 characters" })
    .refine((val) => val.trim().length > 0, {
      message: "Description cannot be only whitespace",
    }),
  penalty: z
    .number()
    .nonnegative({ message: "Penalty must be non negative value" })
    .nullable()
    .refine((value) => value !== null, { message: "Penalty cannot be empty" }),
  mode: modeSchema,
  startDate: z
    .string()
    .refine((val) => dayjs(val).isValid(), { message: "Invalid start Date" }),
  endDate: z
    .string()
    .refine((val) => dayjs(val).isValid(), { message: "Invalid end Date" }),
  visibility: visibilitySchema,
  participants: z
    .array(z.string())
    .min(1, { message: "Participants required" }),
  problems: problemsSchema.min(1, {
    message: "At least one problem is required.",
  }),
  problemsFilter: problemSuggestOptionSchema,
});

export type CreateCustomContest = z.infer<typeof createCustomContestSchema>;

// my custom contests
export const myCustomContestsSchema = z.object({
  createdContests: z.array(customContestSchema),
  participatedContests: z.array(customContestSchema),
});
export type MyCustomContests = z.infer<typeof myCustomContestsSchema>;
