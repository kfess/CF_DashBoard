import { z } from "zod";
import dayjs from "dayjs";
import { tagSchema } from "@features/problems/problem";
import { problemsSchema } from "@features/problems/problem";
import { classificationSchema } from "@features/contests/contest";
import { relatedTopicsSchema } from "@features/custom_contests/relatedTopics";

export const apiFilterTypes = [
  "public",
  "private",
  "createdbyme",
  "joined",
] as const;
export type APIFilterType = (typeof apiFilterTypes)[number];

export const createdContestTypes = ["Running", "Upcoming", "Finished"] as const;
export type CreatedContestType = (typeof createdContestTypes)[number];

// visibility of contest
export const visibilities = ["Public", "Private"] as const;
const visibilitySchema = z
  .enum(visibilities)
  .refine((val) => visibilities.includes(val), {
    message: "Visibility must be either 'Public' or 'Private'",
  });
export type Visibility = (typeof visibilities)[number];

// mode of contest
export const modes = ["Normal", "Training"] as const;
const modeSchema = z.enum(modes).refine(
  (val) => {
    return modes.includes(val);
  },
  { message: "Mode must be 'Normal' or 'Training'" }
);
export type Mode = (typeof modes)[number];

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
  relatedTopics: relatedTopicsSchema,
  participants: z
    .array(z.string())
    .min(1, { message: "Participants required" }),
  problems: problemsSchema
    .min(1, {
      message: "At least one problem is required.",
    })
    .max(100, { message: "Number of Problems cannot be more than 100" }),
});
export const customContestsSchema = z.array(customContestSchema);
export type CustomContest = z.infer<typeof customContestSchema>;

// options for custom contest problem suggestion
export const problemSuggestOptionSchema = z.object({
  count: z
    .number()
    .max(100, { message: "Number of Problems cannot be more than 100" })
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
  classifization: classificationSchema,
  includeTags: z.array(tagSchema),
  excludeTags: z.array(tagSchema),
  excludeSolved: z.boolean(),
});
export type ProblemSuggestOption = z.infer<typeof problemSuggestOptionSchema>;

// options for individual problem add
export const individualProblemAddFilterSchema = problemSuggestOptionSchema.pick(
  {
    difficultyFrom: true,
    difficultyTo: true,
    includeTags: true,
    excludeTags: true,
    classifization: true,
  }
);
export type IndividualProblemAddFilter = z.infer<
  typeof individualProblemAddFilterSchema
>;

// to create custom contest
export const createCustomContestSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: "Title cannot be empty" })
      .max(100, { message: "Title cannot be more than 100 characters" })
      .refine((val) => val.trim().length > 0, {
        message: "Title cannot be only whitespace",
      }),
    owner: z
      .string()
      .min(1, { message: "Codeforces username have to be set." }), // codeforces account username
    ownerId: z.string().min(1, { message: "GitHub username have to be set." }), // github account username
    description: z
      .string()
      .min(1, { message: "Description cannot be empty" })
      .max(250, { message: "Description cannot be more than 250 characters" })
      .refine((val) => val.trim().length > 0, {
        message: "Description cannot be only whitespace",
      }),
    penalty: z
      .number()
      .nonnegative({ message: "Penalty must be non negative value" })
      .refine((value) => value !== null, {
        message: "Penalty cannot be empty",
      }),
    mode: modeSchema,
    startDate: z
      .string()
      .refine((val) => dayjs(val).isValid(), {
        message: "Invalid start Date",
      })
      .refine((val) => dayjs(val).isAfter(dayjs()), {
        message: "Start Date should be after current Date",
      }),
    endDate: z
      .string()
      .refine((val) => dayjs(val).isValid(), {
        message: "Invalid end Date",
      })
      .refine((val) => dayjs(val).isAfter(dayjs()), {
        message: "End Date should be after current Date",
      }),
    visibility: visibilitySchema,
    relatedTopics: relatedTopicsSchema,
    participants: z
      .array(z.string())
      .min(1, { message: "Participants required" }),
    problems: problemsSchema
      .min(1, {
        message: "At least one problem is required.",
      })
      .max(100, { message: "The number of problems cannot be more than 100" }),
    problemsFilter: problemSuggestOptionSchema,
    individualProblemAddFilter: individualProblemAddFilterSchema,
  })
  .refine(
    ({ startDate, endDate }) => dayjs(endDate).isAfter(dayjs(startDate)),
    {
      message: "End Date should be after Start Date",
      path: ["endDate"],
    }
  );

export type CreateCustomContest = z.infer<typeof createCustomContestSchema>;

// my custom contests
export const myCustomContestsSchema = z.object({
  createdContests: z.array(customContestSchema),
  participatedContests: z.array(customContestSchema),
});
export type MyCustomContests = z.infer<typeof myCustomContestsSchema>;
