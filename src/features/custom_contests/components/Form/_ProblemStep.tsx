import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { Control, FieldErrors } from "react-hook-form";
import { Button } from "@features/ui/component/Button";
import { SelectProblems } from "./SelectProblems";

type Props = {
  setActiveStep(step: number): void;
  setValue: (name: keyof CreateCustomContest, value: any) => void;
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
};

export const _ProblemStep: React.FC<Props> = ({
  setActiveStep,
  setValue,
  control,
  errors,
}) => {
  return (
    <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }}>
      <Box
        sx={{
          px: { xs: 2, md: 4 },
          py: 3,
          backgroundColor: (theme) => theme.palette.background.paper,
          border: (theme) => `0.5px solid ${theme.palette.divider}`,
          borderRadius: 3,
        }}
      >
        <SelectProblems control={control} setValue={setValue} errors={errors} />
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
          Previous
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
