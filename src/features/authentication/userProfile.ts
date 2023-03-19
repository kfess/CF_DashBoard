import { z } from "zod";
import { customContestSchema } from "@features/custom_contests/customContest";

export const userProfileSchema = z.object({
  userId: z.string(),
  userName: z.string(),
  codeforcesUsername: z.string(),
  ownedCustomContests: z.array(customContestSchema),
  joinedCustomContests: z.array(customContestSchema), // custom contest UUID
});
export type UserProfile = z.infer<typeof userProfileSchema>;
