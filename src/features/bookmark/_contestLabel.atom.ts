import { atom, selector, selectorFamily } from "recoil";
import { z } from "zod";
import { RecoilAtomKeys, RecoilSelectorKeys } from "@recoil/RecoilKeys";
import { contestSchema } from "@features/contests/contest";

export const contestLabelStateSchema = z.object({
  id: z.number().min(0),
  name: z.string().trim().min(1, { message: "Name cannot be blank value." }),
  description: z
    .string()
    .max(256, { message: "Description message is too long." })
    .optional(),
  color: z.string(),
  contests: z.array(
    contestSchema.pick({
      id: true,
      name: true,
      classification: true,
    })
  ),
});
export type ContestLabelState = z.infer<typeof contestLabelStateSchema>;

export const contestLabelsState = atom<ContestLabelState[]>({
  key: RecoilAtomKeys.CONTEST_LABELS_STATE,
  default: [],
});

// // Read all labels
// export const labelsSelector = selector<LabelState[]>({
//   key: RecoilSelectorKeys.LABELS,
//   get: ({ get }) => get(labelsState),
// });

// // Read label specified by "label name"
// export const labelSelector = selectorFamily<LabelState | undefined, string>({
//   key: RecoilSelectorKeys.LABEL,
//   get:
//     (name) =>
//     ({ get }) => {
//       const labels = get(labelsState);
//       return labels.find((label) => label.name === name);
//     },
// });
