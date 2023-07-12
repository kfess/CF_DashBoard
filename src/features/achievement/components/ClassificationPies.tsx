import React from "react";
import Grid from "@mui/material/Grid";
import type { Submission } from "@features/submission/submission";
import { useFetchProblems } from "@features/problems/hooks/useFetchProblem";
import { useContestIdNameMap } from "@features/contests/hooks/useFetchContest";
import type { Classification } from "@features/contests/contest";
import { classifications } from "@features/contests/contest";
import { getClassification } from "@features/contests/utils/getClassification";
import { ClassificationPie } from "@features/achievement/components/ClassificationPie";
import {
  isACSubmission,
  isGymSubmission,
  filterUniqueSubmissions,
} from "../processSubmission";

type Props = {
  submissions: Submission[];
};

type ClassificationCount = { [C in Classification]: number };

export const ClassificationPies: React.FC<Props> = ({ submissions }) => {
  const { data, isError, error, isLoading } = useFetchProblems(); // all problems

  const { contestIdNameMap, isLoading: mapIsLoading } = useContestIdNameMap();

  const classificationSubmissions = filterUniqueSubmissions(
    submissions.filter((submission) => {
      return (
        isACSubmission(submission) &&
        !isGymSubmission(submission) &&
        submission.problem.contestId !== undefined
      );
    })
  ).reduce((obj, submission) => {
    const classification = getClassification(
      contestIdNameMap[submission.contestId as number] ?? ""
    );
    return {
      ...obj,
      [classification]: [...(obj[classification] ?? []), submission],
    };
  }, {} as { [C in Classification]: Submission[] });

  const classificationProblems: ClassificationCount | undefined = data?.reduce(
    (obj, d) => {
      return {
        ...obj,
        [d.classification ?? "Others"]:
          (obj[d.classification ?? "Others"] ?? 0) + 1,
      };
    },
    {} as ClassificationCount
  );

  console.log(classificationSubmissions);

  return (
    <>
      {classificationProblems && (
        <Grid container spacing={2}>
          {classifications.map((classification) => (
            <Grid item xs={12} sm={6} md={4} key={classification}>
              <ClassificationPie
                problemsCount={classificationProblems[classification]}
                submissions={classificationSubmissions[classification] ?? []}
                classification={classification}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};
