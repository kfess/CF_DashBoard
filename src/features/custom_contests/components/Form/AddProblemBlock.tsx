import React, { useMemo } from "react";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import {
  Control,
  FieldErrors,
  useWatch,
  UseFieldArrayAppend,
  UseFormSetValue,
} from "react-hook-form";
import { Difficulty } from "@features/custom_contests/components/Form/Difficulty";
import { Classification } from "@features/custom_contests/components/Form/Classification";
import { ProblemsTagForIndividualBlock } from "@features/custom_contests/components/Form/ProblemsTagForIndividualBlock";
import { Button } from "@features/ui/component/Button";
import type { Tag } from "@features/problems/problem";
import type { Problem } from "@features/problems/problem";
import { getProblemKey } from "@features/problems/utils";
import { Chip } from "@features/ui/component/Chip";
import { useToggle } from "@hooks/useToggle";

type Props = {
  data: Problem[];
  control: Control<CreateCustomContest>;
  append: UseFieldArrayAppend<CreateCustomContest, "problems">;
  errors: FieldErrors<CreateCustomContest>;
  setValue: UseFormSetValue<CreateCustomContest>;
  getValues: () => CreateCustomContest;
};

export const AddProblemBlock: React.FC<Props> = ({
  data,
  control,
  append,
  errors,
  setValue,
  getValues,
}) => {
  const [isAddBlockOpen, toggleAddBlockOpen] = useToggle(false, true);

  const alreadyAddedSet = new Set(
    getValues().problems.map((p) => getProblemKey(p))
  );

  const difficultyFrom = useWatch({
    control,
    name: "individualProblemAddFilter.difficultyFrom",
  });

  const difficultyTo = useWatch({
    control,
    name: "individualProblemAddFilter.difficultyTo",
  });

  const classification = useWatch({
    control,
    name: "individualProblemAddFilter.classifization",
  });

  const includeTags = useWatch({
    control,
    name: "individualProblemAddFilter.includeTags",
  });

  const excludeTags = useWatch({
    control,
    name: "individualProblemAddFilter.excludeTags",
  });

  const notAddedProblems = useMemo(
    () =>
      data.filter((problem) => {
        const tags = problem.tags as Tag[];
        const rating = problem.rating ?? -1;

        return (
          rating >= difficultyFrom &&
          rating <= difficultyTo &&
          (classification === "All" ||
            classification === problem.classification) &&
          includeTags.every((includeTag) => tags.includes(includeTag)) &&
          excludeTags.every((excludeTag) => !tags.includes(excludeTag)) &&
          !alreadyAddedSet.has(getProblemKey(problem))
        );
      }),
    [
      difficultyFrom,
      difficultyTo,
      classification,
      includeTags,
      excludeTags,
      isAddBlockOpen,
    ]
  );

  const hitCount = useMemo(
    () => notAddedProblems.length,
    [notAddedProblems, isAddBlockOpen]
  );

  const reset = () => {
    setValue("individualProblemAddFilter", {
      difficultyFrom: 0,
      difficultyTo: 5000,
      includeTags: [],
      excludeTags: [],
      classifization: "All",
    });
  };

  const addProblem = () => {
    const selectedProblem =
      notAddedProblems[Math.floor(Math.random() * notAddedProblems.length)];
    append(selectedProblem);
    toggleAddBlockOpen();
    reset();
  };

  return (
    <>
      <Button
        onClick={() => {
          toggleAddBlockOpen();
          if (!isAddBlockOpen) {
            reset();
          }
        }}
        startIcon={<AddIcon />}
        color="secondary"
      >
        Add problem
      </Button>
      {isAddBlockOpen && (
        <Stack
          p={2}
          my={1.5}
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: "4px",
            backgroundColor: (theme) => theme.palette.background.paper,
          }}
        >
          <Stack direction="row" justifyContent="space-between" mb={1}>
            <Typography gutterBottom fontWeight="bold" fontSize="large">
              Optionally add problem
            </Typography>
            <Chip label={`${hitCount} problems found`} />
          </Stack>
          <Stack direction="column" spacing={2}>
            <Difficulty
              control={control}
              errors={errors}
              fieldName="individualProblemAddFilter"
            />
            <Classification
              control={control}
              errors={errors}
              fieldName="individualProblemAddFilter"
            />
            <ProblemsTagForIndividualBlock control={control} errors={errors} />
          </Stack>
          <Stack direction="row" justifyContent="flex-end" spacing={1} mt={2}>
            <Button
              onClick={() => {
                toggleAddBlockOpen();
                reset();
              }}
              color="secondary"
            >
              Cancel
            </Button>
            <Button onClick={addProblem} disabled={!notAddedProblems.length}>
              Add
            </Button>
          </Stack>
        </Stack>
      )}
    </>
  );
};
