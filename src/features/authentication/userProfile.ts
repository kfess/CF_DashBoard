import { z } from "zod";

export const userProfileSchema = z.object({
  githubId: z.number(),
  githubUsername: z.string(),
  codeforcesUsername: z.string().optional(),
  isLoggedIn: z.boolean(),
  expirationTimeStamp: z.number(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
