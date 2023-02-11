import { z } from "zod";

// https://codeforces.com/apiHelp/methods#user.info

const statusSchema = z.union([z.literal("OK"), z.literal("FAILED")]);

const userInfoSchema = z.object({
  handle: z.string(),
  email: z.string().optional(),
  vkld: z.string().optional(),
  openId: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  organization: z.string().optional(),
  contribution: z.number(),
  rank: z.string().optional(),
  rating: z.number().optional(),
  maxRank: z.string().optional(),
  maxRating: z.number().optional(),
  lastOnlineTimeSeconds: z.number(),
  registrationTimeSeconds: z.number(),
  friendOfCount: z.number(),
  avatar: z.string(),
  titlePhoto: z.string(),
});
export type UserInfo = z.infer<typeof userInfoSchema>;

export const okUserInfoApiSchema = z.object({
  status: statusSchema,
  result: z.array(userInfoSchema),
});
export type OkUserInfoApiSchema = z.infer<typeof okUserInfoApiSchema>;
