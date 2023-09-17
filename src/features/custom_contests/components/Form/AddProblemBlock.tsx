import React from "react";
import Stack from "@mui/material/Stack";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { Control, FieldErrors } from "react-hook-form";
import { Difficulty } from "@features/custom_contests/components/Form/Difficulty";
import { ProblemsTagForIndividualBlock } from "@features/custom_contests/components/Form/ProblemsTagForIndividualBlock";
type Props = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
};

export const AddProblemBlock: React.FC<Props> = ({ control, errors }) => {
  return (
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
      <Difficulty
        control={control}
        errors={errors}
        fieldName="individualProblemAddFilter"
      />
      <ProblemsTagForIndividualBlock control={control} errors={errors} />
    </Stack>
  );
};
