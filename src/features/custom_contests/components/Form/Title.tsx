import React from "react";
import Box from "@mui/material/Box";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Input } from "@features/ui/component/Input";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { CreateCustomContest } from "@features/custom_contests/customContest";

type Props = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
};

export const Title: React.FC<Props> = ({ control, errors }) => {
  return (
    <Controller
      name="title"
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
            Title
          </Box>
          <Input
            {...field}
            id="title-input"
            type="text"
            placeholder="Contest Title"
            aria-label="Custom Contest Title"
          />
          {errors.title && <ErrorMessage message={errors.title.message} />}
        </Box>
      )}
    />
  );
};
