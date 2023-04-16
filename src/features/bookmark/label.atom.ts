import { atom, selector, selectorFamily } from "recoil";
import { z } from "zod";
import { localStorageEffect } from "@recoil/localStorageEffect";
import { problemSchema } from "@features/problems/problem";
import { RecoilAtomKeys, RecoilSelectorKeys } from "@recoil/RecoilKeys";

export const labelStateSchema = z.object({
  id: z.number().min(0),
  name: z.string().trim().min(1, { message: "Name cannot be blank value." }),
  description: z
    .string()
    .max(256, { message: "Description message is too long." })
    .optional(),
  color: z.string(),
  problems: z.array(
    problemSchema
      .pick({ contestId: true, index: true, name: true })
      .extend({ contestName: z.string() })
  ),
});

export type LabelState = z.infer<typeof labelStateSchema>;

export const labelsState = atom<LabelState[]>({
  key: RecoilAtomKeys.LABELS_STATE,
  default: [],
  effects: [localStorageEffect<LabelState[]>("labels")],
});

// Read all labels
export const labelsSelector = selector<LabelState[]>({
  key: RecoilSelectorKeys.LABELS,
  get: ({ get }) => get(labelsState),
});

// Read label specified by "label name"
export const labelSelector = selectorFamily<LabelState | undefined, string>({
  key: RecoilSelectorKeys.LABEL,
  get:
    (name) =>
    ({ get }) => {
      const labels = get(labelsState);
      return labels.find((label) => label.name === name);
    },
});
