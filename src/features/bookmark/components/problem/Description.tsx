import React from "react";
import Box from "@mui/material/Box";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Input } from "@features/ui/component/Input";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { ProblemLabelForm } from "@features/bookmark/problemLabel";

type Props = {
  control: Control<ProblemLabelForm>;
  errors: FieldErrors<ProblemLabelForm>;
};

export const Description: React.FC<Props> = ({ control, errors }) => {
  return (
    <Controller
      name="description"
      control={control}
      render={({ field }) => (
        <Box>
          <Box
            component="label"
            display="block"
            htmlFor="description-input"
            fontWeight="bold"
            mb={0.5}
          >
            Description
          </Box>
          <Input
            {...field}
            placeholder="Description (optional)"
            id="description-input"
            type="text"
          />
          <ErrorMessage message={errors.description?.message} />
        </Box>
      )}
    />
  );
};
