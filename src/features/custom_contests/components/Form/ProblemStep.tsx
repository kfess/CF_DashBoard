import React, { Suspense } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import { Button } from "@features/ui/component/Button";
import { NumberOfProblems } from "@features/custom_contests/components/Form/NumberOfProblems";
import { ProblemsTag } from "@features/custom_contests/components/Form/ProblemsTag";
import { ExcludeSolved } from "@features/custom_contests/components/Form/ExcludeSolved";
import { Difficulty } from "@features/custom_contests/components/Form/Difficulty";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { CircularProgress } from "@features/ui/component/CircularProgress";
import { SelectProblems } from "./SelectProblems";

type Props = {
  setActiveStep(step: number): void;
  control: Control<CreateCustomContest>;
  setValue: UseFormSetValue<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
  getValues: () => CreateCustomContest;
};

export const ProblemStep: React.FC<Props> = ({
  setActiveStep,
  control,
  setValue,
  errors,
  getValues,
}) => {
  return (
    <Box pb={{ xs: 2, md: 4 }}>
      <Box sx={{ px: { xs: 1, md: 4 }, py: 3 }}>
        <Stack direction="column" spacing={2}>
          <NumberOfProblems control={control} errors={errors} />
          <Difficulty control={control} errors={errors} />
          <ProblemsTag control={control} errors={errors} />
          <ExcludeSolved
            control={control}
            errors={errors}
            getValues={getValues}
          />
        </Stack>
        <Suspense fallback={<CircularProgress />}>
          <SelectProblems
            control={control}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          />
        </Suspense>
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
