import dayjs from "dayjs";
import { groupBy } from "@helpers/arr-utils";
import type { Submission } from "@features/submission/submission";
import { getRatingColorInfo } from "@features/color/ratingColor";
import { normalizeLanguage } from "@features/language/language";
import { Tag } from "@features/problems/problem";
import { getProblemKey } from "@features/problems/utils";

export const isACSubmission = (submission: Submission): boolean =>
  submission.verdict === "OK";

export const isGymSubmission = (submission: Submission | undefined): boolean =>
  submission?.contestId ? submission.contestId >= 100001 : false;

export const filterUniqueSubmissions = (
  submissions: Submission[]
): Submission[] => {
  const uniqueMap = submissions.reduce((acc, submission) => {
    const key = getProblemKey(submission);
    acc[key] = submission;
    return acc;
  }, {} as Record<string, Submission>);

  return Object.values(uniqueMap);
};

export const sumSubmissionsRating = (submissions: Submission[]): number =>
  submissions.reduce((sum, s) => sum + (s.problem.rating ?? 0), 0);

export const uniqueDateSet = (submissions: Submission[]): Set<string> =>
  submissions.reduce((set, s) => {
    set.add(dayjs.unix(s.creationTimeSeconds).format("YYYY/MM/DD"));
    return set;
  }, new Set<string>());

export const groupbyDate = (submissions: Submission[]) =>
  groupBy(submissions, (s) =>
    dayjs.unix(s.creationTimeSeconds).format("YYYY/MM/DD")
  );

export const groupbyRatingColor = (submissions: Submission[]) =>
  groupBy(submissions, (s) => getRatingColorInfo(s.problem.rating).name);

export const groupbyLanguage = (submissions: Submission[]) =>
  groupBy(submissions, (s) => normalizeLanguage(s.programmingLanguage));

export const groupByProblem = (submissions: Submission[]) =>
  groupBy(submissions, (s) => getProblemKey(s));

export const getACProblemSet = (submissions: Submission[]): Set<string> => {
  const ACSubmissions = submissions.filter(isACSubmission);
  const ACProblemSet = ACSubmissions.reduce((set, submission) => {
    set.add(getProblemKey(submission));
    return set;
  }, new Set<string>());
  return ACProblemSet;
};

export const getNonACProblemSet = (submissions: Submission[]): Set<string> => {
  const uniqueSubmissions = filterUniqueSubmissions(submissions);
  const attmptedProblemSet = uniqueSubmissions.reduce((set, submission) => {
    set.add(getProblemKey(submission));
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
