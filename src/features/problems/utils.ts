import type { Submission } from "@features/submission/submission";
import type { Problem } from "@features/problems/problem";

// オーバーロードのシグネチャ
export function getProblemKey(submission: Submission): string;
export function getProblemKey(problem: Problem): string;
export function getProblemKey(
  contestId: number | undefined,
  index: string,
  name: string
): string;

// To get the unique key of a problem
export function getProblemKey(
  args: Submission | Problem | number | undefined,
  index?: string,
  name?: string
): string {
  if (typeof args === "object" && "problem" in args) {
    // args is Submission type
    const { contestId, index, name } = args.problem;
    return `${contestId ? contestId : "contestId"}-${index}-${name.trim()}`;
  } else if (typeof args === "object") {
    // args is Problem type
    const { contestId, index, name } = args;
    return `${contestId ? contestId : "contestId"}-${index}-${name.trim()}`;
  } else if (typeof args === "number" || typeof args === "undefined") {
    // args are the individual fields
    return `${args ? args : "contestId"}-${index}-${name?.trim()}`;
  }
  throw new Error("Invalid arguments passed to getProblemKey");
}
