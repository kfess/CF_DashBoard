import { z } from "zod";
import { contestSchema } from "@features/contests/contest";
import { isValidHexaColor } from "@features/color/labelColor";
import { trimFullWhiteSpace } from "@helpers/format";

export const contestLabelSchema = z.object({
  id: z.number().min(0).optional(),
  name: z
    .string()
    .transform(trimFullWhiteSpace)
    .refine((name) => name.length >= 1 && name.length <= 20, {
      message: "Name must be between 1 and 20 characters long.",
    }),
  description: z
    .string()
    .max(256, { message: "Description message is too long." })
    .optional(),
  color: z.string().refine(isValidHexaColor, {
    message: "The specified color is not valid.",
  }),
  contests: z.array(
    contestSchema.pick({
      id: true,
      name: true,
      classification: true,
    })
  ),
});
export type ContestLabel = z.infer<typeof contestLabelSchema>;

// for creating new label
export const contestLabelFormSchema = contestLabelSchema.pick({
  name: true,
  description: true,
  color: true,
});
export type ContestLabelForm = z.infer<typeof contestLabelFormSchema>;
