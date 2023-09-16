import React, { useCallback } from "react";
import Stack from "@mui/material/Stack";
import { Controller, Control, FieldErrors } from "react-hook-form";
import type { CreateCustomContest } from "@features/custom_contests/customContest";
import type { Problem } from "@features/problems/problem";
import type { Tag } from "@features/problems/problem";
import { Button } from "@features/ui/component/Button";
import { SelectedProblemsTable } from "@features/custom_contests/components/Form/SelectedProblemsTable";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { useSolvedStatus } from "@features/submission/hooks/useSolvedStatus";
import { getProblemKey } from "@features/problems/utils";

type Props = {
  data?: Problem[];
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
  getValues: () => CreateCustomContest;
  setValue: (name: keyof CreateCustomContest, value: any) => void;
};

export const SelectProblems: React.FC<Props> = ({
  data,
  control,
  errors,
  getValues,
  setValue,
}) => {
  const owner = getValues().owner;
  const { solvedSet } = useSolvedStatus(() => true, owner);

  const selectProblems = useCallback(
    (problems: Problem[]) => {
      const values = getValues();
      return problems
        .filter(
          (problem) =>
            (problem.rating ?? 0) >=
              (values.problemsFilter.difficultyFrom ?? 0) &&
            (problem.rating ?? 0) <=
              (values.problemsFilter.difficultyTo ?? 0) &&
            values.problemsFilter.includeTags.every((includeTag) =>
              (problem.tags as Tag[]).includes(includeTag)
            ) &&
            values.problemsFilter.excludeTags.every(
              (excludeTag) => !(problem.tags as Tag[]).includes(excludeTag)
            ) &&
            (!values.problemsFilter.excludeSolved ||
              !solvedSet.has(getProblemKey(problem)))
        )
        .sort(() => Math.random() - 0.5)
        .slice(0, values.problemsFilter.count ?? 0)
        .sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0));
    },
    [getValues]
  );

  return (
    <>
      <Stack direction="row" justifyContent="flex-end" sx={{ my: 2 }}>
        <Button
          onClick={() => {
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
        render={({ field }) => (
          <SelectedProblemsTable isEdit={true} field={field} />
        )}
      />
      {errors.problems && <ErrorMessage message={errors.problems.message} />}
    </>
  );
};
