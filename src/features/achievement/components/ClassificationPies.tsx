import React from "react";
import Grid from "@mui/material/Grid";
import type { Submission } from "@features/submission/submission";
import { useFetchProblems } from "@features/problems/hooks/useFetchProblem";
import type { Classification } from "@features/contests/contest";
import { classifications } from "@features/contests/contest";
import { ClassificationPie } from "@features/achievement/components/ClassificationPie";

type Props = {
  submissions: Submission[];
};

type ClassificationCount = { [C in Classification]: number };

export const ClassificationPies: React.FC<Props> = ({ submissions }) => {
  const { data, isError, error, isLoading } = useFetchProblems(); // all problems

  const classificationProblems: ClassificationCount | undefined = data?.reduce(
    (obj, d) => {
      return {
        ...obj,
        [d.classification ?? "Others"]:
          (obj[d.classification ?? "Others"] ?? 0) + 1,
      };
    },
    { All: data.length } as ClassificationCount
  );

  return (
    <>
      {classificationProblems && (
        <Grid container spacing={2}>
          {classifications.map((classification) => (
            <Grid item xs={12} sm={6} md={4} key={classification}>
              <ClassificationPie
                problemsCount={classificationProblems[classification]}
                classification={classification}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};
