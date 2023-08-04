import { z } from "zod";

// reference: https://codeforces.com/apiHelp/objects#RatingChange

const statusSchema = z.union([z.literal("OK"), z.literal("FAILED")]);

export const ratingChangeSchema = z.object({
  contestId: z.number(),
  contestName: z.string(),
  handle: z.string(),
  rank: z.number(),
  ratingUpdateTimeSeconds: z.number(),
  oldRating: z.number(),
  newRating: z.number(),
});
export type RatingChange = z.infer<typeof ratingChangeSchema>;

export const okRatingChangeApiSchema = z.object({
  status: statusSchema,
  result: z.array(ratingChangeSchema),
});
export type OkRatingChangeApiSchema = z.infer<typeof okRatingChangeApiSchema>;
