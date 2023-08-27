import type { Submission } from "@features/submission/submission";
import type { Problem } from "@features/problems/problem";

// オーバーロードのシグネチャ
export function getProblemKey(submissions: Submission): string;
export function getProblemKey(problem: Problem): string;

// 実装
// To get the unique key of a problem
export function getProblemKey(args: Problem | Submission): string {
  const { contestId, index, name } = "problem" in args ? args.problem : args;
  return `${contestId ? contestId : "contestId"}-${index}-${name.trim()}`;
}
