import { atom, selector, selectorFamily } from "recoil";
import { z } from "zod";
import { problemSchema } from "@features/problems/problem";
import { RecoilAtomKeys, RecoilSelectorKeys } from "@recoil/RecoilKeys";

// 保存に必要な情報だけを抽出したスキーマ
const partialProblemSchema = problemSchema
  .pick({
    contestId: true,
    index: true,
    name: true,
    rating: true,
  })
  .extend({ contestName: z.string() });
export type PartialProblem = z.infer<typeof partialProblemSchema>;

// for existing label
export const problemLabelStateSchema = z.object({
  id: z.number().min(0).optional(),
  name: z.string().trim().min(1, { message: "Name cannot be blank value." }),
  description: z
    .string()
    .max(256, { message: "Description message is too long." })
    .optional(),
  color: z.string(),
  problems: z.array(partialProblemSchema),
});
export type ProblemLabelState = z.infer<typeof problemLabelStateSchema>;

// export const problemLabelsState = atom<ProblemLabelState[]>({
//   key: RecoilAtomKeys.PROBLEM_LABELS_STATE,
//   default: [],
// });

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
