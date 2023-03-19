import { z } from "zod";

export const userProfileSchema = z.object({
  userId: z.string(),
  userName: z.string(),
  codeforcesUsername: z.string(),
  // 作成した custom contest (public, private)
  // 参加中の custom contest
});
export type UserProfile = z.infer<typeof userProfileSchema>;
