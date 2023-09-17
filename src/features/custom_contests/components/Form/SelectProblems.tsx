import React, { useCallback } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import { Control, FieldErrors, useFieldArray } from "react-hook-form";
import type { CreateCustomContest } from "@features/custom_contests/customContest";
import type { Problem } from "@features/problems/problem";
import type { Tag } from "@features/problems/problem";
import { Button } from "@features/ui/component/Button";
import { SelectedProblemsTable } from "@features/custom_contests/components/Form/SelectedProblemsTable";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { useSolvedStatus } from "@features/submission/hooks/useSolvedStatus";
import { getProblemKey } from "@features/problems/utils";
import { AddProblemBlock } from "@features/custom_contests/components/Form/AddProblemBlock";
import { useToggle } from "@hooks/useToggle";

type Props = {
  data?: Problem[];
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
  getValues: () => CreateCustomContest;
};

export const SelectProblems: React.FC<Props> = ({
  data,
  control,
  errors,
  getValues,
}) => {
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

  const [isAddBlockOpen, toggleAddBlockOpen] = useToggle(false, true);

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
      <SelectedProblemsTable
        isEdit={true}
        fields={fields}
        remove={remove}
        append={append}
      />
      {fields.length > 0 && (
        <Box mt={1.5} mx={1}>
          <Button
            onClick={() => {
              toggleAddBlockOpen();
            }}
            startIcon={<AddIcon />}
            color="secondary"
          >
            Add problem
          </Button>
          {isAddBlockOpen && <AddProblemBlock />}
        </Box>
      )}
      {errors.problems && <ErrorMessage message={errors.problems.message} />}
    </>
  );
};

// append({
//   contestId: 1111111111,
//   contestName: "Contest Name",
//   classification: "Others",
//   name: "Problem Name",
//   type: "PROGRAMMING",
//   rating: Math.round(Math.random() * 5000),
//   index: "A",
//   tags: [],
// });
