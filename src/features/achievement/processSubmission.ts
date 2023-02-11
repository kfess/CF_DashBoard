import * as dayjs from "dayjs";
import type { Submission } from "@features/submission/submission";

export const isACSubmission = (submission: Submission) =>
  submission.verdict === "OK";

export const filterUniqueSubmissions = (submissions: Submission[]) =>
  Array.from(
    new Map(
      submissions.map((s) => [
        s.contestId + s.problem.index + s.problem.name,
        s,
      ])
    ).values()
  );

export const sumSubmissionsRating = (submissions: Submission[]) =>
  submissions.reduce((sum, s) => sum + (s.problem.rating ?? 0), 0);

export const uniqueDateSet = (submissions: Submission[]) =>
  submissions.reduce((set, s) => {
    set.add(dayjs.unix(s.creationTimeSeconds).format("YYYY/MM/DD"));
    return set;
  }, new Set<string>());
