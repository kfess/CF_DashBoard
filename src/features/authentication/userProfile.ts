import { z } from "zod";
import { customContestSchema } from "@features/custom_contests/customContest";

export const userProfileSchema = z.object({
  githubId: z.number(),
  githubUsername: z.string(),
  codeforcesUsername: z.string().optional(),
});

export const userCustomContestSchema = z.object({
  ownedCustomContests: z.array(customContestSchema),
  joinedCustomContests: z.array(customContestSchema),
});

export const userProfileWithCustomContestSchema = userProfileSchema.merge(
  userCustomContestSchema
);

export type UserProfile = z.infer<typeof userProfileSchema>;
export type UserProfileWithCustomContestSchema = z.infer<
  typeof userProfileWithCustomContestSchema
>;
