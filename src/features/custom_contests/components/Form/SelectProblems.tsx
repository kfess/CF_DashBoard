import React, { useCallback } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormSetValue,
} from "react-hook-form";
import type { CreateCustomContest } from "@features/custom_contests/customContest";
import type { Problem } from "@features/problems/problem";
import type { Tag } from "@features/problems/problem";
import { Button } from "@features/ui/component/Button";
import { SelectedProblemsTable } from "@features/custom_contests/components/Form/SelectedProblemsTable";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { useSolvedStatus } from "@features/submission/hooks/useSolvedStatus";
import { getProblemKey } from "@features/problems/utils";
import { AddProblemBlock } from "@features/custom_contests/components/Form/AddProblemBlock";
import { useFetchProblems } from "@features/problems/hooks/useFetchProblem";

type Props = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
  setValue: UseFormSetValue<CreateCustomContest>;
  getValues: () => CreateCustomContest;
};

export const SelectProblems: React.FC<Props> = ({
  control,
  errors,
  setValue,
  getValues,
}) => {
  const { data } = useFetchProblems();
  const { solvedSet } = useSolvedStatus(() => true, getValues().owner);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "problems",
  });

  const selectProblems = useCallback(
    async (problems: Problem[]) => {
      const values = getValues();
      const {
        difficultyFrom,
        difficultyTo,
        includeTags,
        excludeTags,
        excludeSolved,
        count,
      } = values.problemsFilter;

      const filteredProblems = problems.filter((problem) => {
        const tags = problem.tags as Tag[];
        const rating = problem.rating ?? 0;

        return (
          rating >= (difficultyFrom ?? 0) &&
          rating <= (difficultyTo ?? 0) &&
          includeTags.every((includeTag) => tags.includes(includeTag)) &&
          excludeTags.every((excludeTag) => !tags.includes(excludeTag)) &&
          (!excludeSolved || !solvedSet.has(getProblemKey(problem)))
        );
      });

      const selectedProblems = filteredProblems
        .sort(() => Math.random() - 0.5)
        .slice(0, count ?? 0)
        .sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0));

      const update = async () => {
        await remove();
        await append(selectedProblems);
      };
      update();
    },
    [getValues, solvedSet, append, remove]
  );

  return (
    <>
      <Stack direction="row" justifyContent="flex-end" sx={{ my: 2 }}>
        <Button
          onClick={() => {
            selectProblems(data ?? []);
          }}
          disabled={!data}
        >
          Generate Problems
        </Button>
      </Stack>
      <SelectedProblemsTable isEdit={true} fields={fields} remove={remove} />
      {fields.length > 0 && (
        <Box mt={1.5}>
          <AddProblemBlock
            data={data ?? []}
            control={control}
            append={append}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          />
        </Box>
      )}
      {errors.problems && <ErrorMessage message={errors.problems.message} />}
    </>
  );
};
