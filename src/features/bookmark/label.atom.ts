import { atom, AtomEffect, DefaultValue } from "recoil";
import { z } from "zod";
import { problemSchema } from "@features/problems/problem";

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

// automatically added to localStorage when label is added
const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const labelsState = atom<LabelState[]>({
  key: "labelsState",
  default: [],
  effects: [localStorageEffect<LabelState[]>("labels")],
});
