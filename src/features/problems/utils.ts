// To get the unique key of a problem
// Edge case: some submission's problem name has a trailing space
export const getProblemKey = (
  contestId: number | undefined,
  index: string,
  name: string
) => `${contestId ? contestId : "contestId"}-${index}-${name.trim()}`;
