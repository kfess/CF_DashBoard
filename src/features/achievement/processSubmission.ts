import { NormalizedLanguage } from "./../language/language";
import dayjs from "dayjs";
import { groupBy } from "@helpers/arr-utils";
import type { Submission } from "@features/submission/submission";
import { getRatingColorInfo } from "@features/color/ratingColor";
import { normalizeLanguage } from "@features/language/language";
import { Tag } from "@features/problems/problem";

export const isACSubmission = (submission: Submission): boolean =>
  submission.verdict === "OK";

export const isGymSubmission = (submission: Submission | undefined): boolean =>
  submission?.contestId ? submission.contestId >= 100001 : false;

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

export const groupByLanguage = (
  submissions: Submission[]
): [NormalizedLanguage, Submission[]][] => {
  const gSubmissions = groupBy(submissions, (s) =>
    normalizeLanguage(s.programmingLanguage)
  );
  return gSubmissions;
};

export const getACProblemSet = (submissions: Submission[]): Set<string> => {
  const ACSubmissions = submissions.filter(isACSubmission);
  const uniqueACSubmissions = filterUniqueSubmissions(ACSubmissions);
  const ACProblemSet = uniqueACSubmissions.reduce((set, submission) => {
    set.add(
      submission.contestId + submission.problem.index + submission.problem.name
    );
    return set;
  }, new Set<string>());
  return ACProblemSet;
};

export const getNonACProblemSet = (submissions: Submission[]): Set<string> => {
  const uniqueSubmissions = filterUniqueSubmissions(submissions);
  const attmptedProblemSet = uniqueSubmissions.reduce((set, submission) => {
    set.add(
      submission.contestId + submission.problem.index + submission.problem.name
    );
    return set;
  }, new Set<string>());

  const ACProblemSet = getACProblemSet(submissions);
  return new Set([...attmptedProblemSet].filter((p) => !ACProblemSet.has(p)));
};

export const getACTagMap = (submissions: Submission[]): Map<Tag, number> => {
  const ACSubmissions = submissions.filter(isACSubmission);
  const uniqueACSubmissions = filterUniqueSubmissions(ACSubmissions);

  const tagMap = uniqueACSubmissions.reduce((map, submission) => {
    submission.problem.tags.forEach((tag) =>
      map.has(tag)
        ? map.set(tag, (map.get(tag) as number) + 1)
        : map.set(tag, 1)
    );
    return map;
  }, new Map<Tag, number>());
  return tagMap;
};
