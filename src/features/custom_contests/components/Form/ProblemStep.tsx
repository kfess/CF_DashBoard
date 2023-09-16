import React, { useState, useEffect, useCallback, Suspense } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { Button } from "@features/ui/component/Button";
import { Problem, Tag } from "@features/problems/problem";
import { useFetchProblems } from "@features/problems/hooks/useFetchProblem";
import { NumberOfProblems } from "@features/custom_contests/components/Form/NumberOfProblems";
import { ProblemsTag } from "@features/custom_contests/components/Form/ProblemsTag";
import { ExpectedParticipants } from "@features/custom_contests/components/Form/ExpectedParticipants";
import { Difficulty } from "@features/custom_contests/components/Form/Difficulty";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { SelectedProblemsTable } from "./SelectedProblemsTable";
import { useFetchExpectedParticipantsSolvedProblems } from "@features/custom_contests/hooks/useFetchSubmissions";
import { getProblemKey } from "@features/problems/utils";
import { CircularProgress } from "@features/ui/component/CircularProgress";

type Props = {
  setActiveStep(step: number): void;
  setValue: (name: keyof CreateCustomContest, value: any) => void;
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
  getValues: () => CreateCustomContest;
};

export const ProblemStep: React.FC<Props> = ({
  setActiveStep,
  setValue,
  control,
  errors,
  getValues,
}) => {
  const { data } = useFetchProblems();

  // const expectedParticipants =
  //   getValues().problemsFilter.expectedParticipants.map((v) => v.name);
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
            )
        )
        .sort(() => Math.random() - 0.5)
        .slice(0, values.problemsFilter.count ?? 0)
        .sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0));
    },
    [getValues]
  );

  return (
    <Box pb={{ xs: 2, md: 4 }}>
      <Box sx={{ px: { xs: 1, md: 4 }, py: 3 }}>
        <Stack direction="column" spacing={2}>
          <NumberOfProblems control={control} errors={errors} />
          <Difficulty control={control} errors={errors} />
          <ProblemsTag control={control} errors={errors} />
          <ExpectedParticipants control={control} errors={errors} />
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
        <Suspense fallback={<CircularProgress />}>
          <Controller
            name="problems"
            control={control}
            render={({ field }) => (
              <SelectedProblemsTable isEdit={true} field={field} />
            )}
          />
        </Suspense>
        {errors.problems && <ErrorMessage message={errors.problems.message} />}
      </Box>
      <Stack
        direction="row"
        mt={2}
        mr={2}
        spacing={1}
        justifyContent="flex-end"
      >
        <Button
          onClick={() => setActiveStep(0)}
          color="secondary"
          startIcon={<KeyboardDoubleArrowLeftIcon />}
        >
          Back
        </Button>
        <Button
          onClick={() => setActiveStep(2)}
          color="secondary"
          endIcon={<KeyboardDoubleArrowRightIcon />}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
};
