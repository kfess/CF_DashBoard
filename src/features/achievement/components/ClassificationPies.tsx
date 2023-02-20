import React from "react";
import type { Submission } from "@features/submission/submission";
import { useFetchProblems } from "@features/problems/useFetchProblem";
import type { Classification } from "@features/contests/contest";
import { classifications } from "@features/contests/contest";

import { ClassificationPie } from "@features/achievement/components/ClassificationPie";

type Props = {
  submissions: Submission[];
};

type ClassificationCount = { [C in Classification]: number };

export const ClassificationPies: React.FC<Props> = (props: Props) => {
  const { submissions } = props;
  const { data, isError, error, isLoading } = useFetchProblems(); // all problems

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

  return (
    <>
      {classificationProblems &&
        classifications.map((classification) => (
          <>
            <div>{classification}</div>
            <ClassificationPie
              key={classification}
              problemsCount={classificationProblems[classification]}
              submissions={submissions.filter(
                (submission) =>
                  submission.problem.classification === classification
              )}
            />
          </>
        ))}
    </>
  );
};
