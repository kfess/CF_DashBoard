// To get the unique key of a problem
export const getProblemKey = (
  contestId: number | undefined,
  index: string,
  name: string
) => `${contestId ? contestId : "contestId"}-${index}-${name}`;
