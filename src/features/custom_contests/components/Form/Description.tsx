import React from "react";
import Box from "@mui/material/Box";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { TextArea } from "@features/ui/component/TextArea";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { CreateCustomContest } from "@features/custom_contests/customContest";

type Props = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
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
            htmlFor="title-input"
            fontWeight="bold"
            mb={0.5}
          >
            Description
          </Box>
          <TextArea
            {...field}
            type="text"
            placeholder="Description"
            aria-label="Custom Contest Description"
          />
          {errors.description && (
            <ErrorMessage message={errors.description.message} />
          )}
        </Box>
      )}
    />
  );
};
