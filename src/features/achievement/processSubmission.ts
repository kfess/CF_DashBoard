import * as dayjs from "dayjs";
import { groupBy } from "@helpers/index";
import type { Submission } from "@features/submission/submission";
import { getRatingColorInfo } from "@features/color/ratingColor";

export const isACSubmission = (submission: Submission): boolean =>
  submission.verdict === "OK";

export const filterUniqueSubmissions = (
  submissions: Submission[]
): Submission[] =>
  Array.from(
    new Map(
      submissions.map((s) => [
        s.contestId + s.problem.index + s.problem.name,
        s,
      ])
    ).values()
  );

export const sumSubmissionsRating = (submissions: Submission[]): number =>
  submissions.reduce((sum, s) => sum + (s.problem.rating ?? 0), 0);

export const uniqueDateSet = (submissions: Submission[]): Set<string> =>
  submissions.reduce((set, s) => {
    set.add(dayjs.unix(s.creationTimeSeconds).format("YYYY/MM/DD"));
    return set;
  }, new Set<string>());

export const groupbyDate = (submissions: Submission[]) => {
  const gSubmissions = groupBy(submissions, (s) =>
    dayjs.unix(s.creationTimeSeconds).format("YYYY/MM/DD")
  );
  return gSubmissions;
};

export const groupbyRatingColor = (submissions: Submission[]) => {
  const gSubmissions = groupBy(
    submissions,
    (s) => getRatingColorInfo(s.problem.rating).name
  );
  return gSubmissions;
};
