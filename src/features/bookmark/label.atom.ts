import { atom } from "recoil";
import type { Problem } from "@features/problems/problem";

// type StrictOmit<T, K extends keyof T> = Omit<T, K>;
type PickedProblem = Pick<Problem, "contestId" | "index" | "points">;

type LabelState = {
  id: number;
  name: string;
  description?: string;
  color: string;
  problems: PickedProblem[];
};

export const labelsState = atom<LabelState[]>({
  key: "labelsState",
  default: [],
});
