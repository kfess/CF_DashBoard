import React, { useState, useCallback, useEffect } from "react";
import Stack from "@mui/material/Stack";
import {
  Control,
  Controller,
  FieldErrors,
  set,
  useWatch,
} from "react-hook-form";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { useFetchProblems } from "@features/problems/hooks/useFetchProblem";
import { Problem, Tag } from "@features/problems/problem";
import { SelectedProblemsTable } from "./SelectedProblemsTable";
import { ProblemsCount } from "@features/custom_contests/components/Form/ProblemsCount";
import { ProblemsTag } from "@features/custom_contests/components/Form/ProblemsTag";
import { ExpectedParticipants } from "@features/custom_contests/components/Form/ExpectedParticipants";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { Button } from "@features/ui/component/Button";
import { _Difficulty } from "./_Difficulty";
import { useFetchExpectedParticipantsSolvedProblems } from "@features/custom_contests/hooks/useFetchSubmissions";

type Props = {
  control: Control<CreateCustomContest>;
  setValue: (name: keyof CreateCustomContest, value: any) => void;
  errors: FieldErrors<CreateCustomContest>;
};

export const SelectProblems: React.FC<Props> = ({
  control,
  setValue,
  errors,
}) => {
  const { data } = useFetchProblems();

  const count = useWatch({ control, name: "problemsFilter.count" });

  const difficultyFrom = useWatch({
    control,
    name: "problemsFilter.difficultyFrom",
  });

  const difficultyTo = useWatch({
    control,
    name: "problemsFilter.difficultyTo",
  });

  const includeTags = useWatch({
    control,
    name: "problemsFilter.includeTags",
  });

  const excludeTags = useWatch({
    control,
    name: "problemsFilter.excludeTags",
  });

  const excludeSolved = useWatch({
    control,
    name: "problemsFilter.excludeSolved",
  });

  const expectedParticipants = useWatch({
    control,
    name: "problemsFilter.expectedParticipants",
  }).map((obj) => obj.name);

  // const [shouldFetch, setShouldFetch] = useState(false);
  // const { solvedSet } = useFetchExpectedParticipantsSolvedProblems(
  //   expectedParticipants,
  //   shouldFetch
  // );
  // useEffect(() => {
  //   setShouldFetch(false);
  // }, [solvedSet]);

  const selectProblems = useCallback(
    (problems: Problem[]) => {
      return problems
        .filter(
          (problem) =>
            (problem.rating ?? 0) >= (difficultyFrom ?? 0) &&
            (problem.rating ?? 0) <= (difficultyTo ?? 0) &&
            includeTags.every((includeTag) =>
              (problem.tags as Tag[]).includes(includeTag)
            ) &&
            excludeTags.every(
              (excludeTag) => !(problem.tags as Tag[]).includes(excludeTag)
            )
        )
        .sort(() => Math.random() - 0.5)
        .slice(0, count ?? 0)
        .sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0));
    },
    [difficultyFrom, difficultyTo, includeTags, excludeTags, count]
  );

  return (
    <>
      <Stack direction="column">
        <ProblemsCount control={control} errors={errors} />
        <_Difficulty control={control} errors={errors} />
        <ProblemsTag control={control} errors={errors} />
        <ExpectedParticipants
          control={control}
          errors={errors}
          excludeSolved={excludeSolved}
        />
      </Stack>
      <Stack direction="row" justifyContent="flex-end" sx={{ my: 2 }}>
        <Button
          onClick={() => {
            // setShouldFetch(true);
            data && setValue("problems", selectProblems(data));
          }}
          disabled={!data}
        >
          Generate Problems
        </Button>
      </Stack>
      <Controller
        name="problems"
        control={control}
        render={({ field }) => <SelectedProblemsTable field={field} />}
      />
      <ErrorMessage message={errors.problems?.message} />
    </>
  );
};
