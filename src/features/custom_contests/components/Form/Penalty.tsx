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

export const Penalty: React.FC<Props> = ({ control, errors }) => {
  return (
    <Controller
      name="penalty"
      control={control}
      render={({ field }) => (
        <Box>
          <Box
            component="label"
            display="block"
            htmlFor="penalty-input"
            fontWeight="bold"
            mb={0.5}
          >
            Penalty (seconds)
          </Box>
          <Input
            {...field}
            value={field.value ?? ""}
            id="penalty-input"
            type="number"
            placeholder="300"
            aria-label="Penalty (seconds)"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const val =
                event.target.value === "" ? null : event.target.valueAsNumber;
              field.onChange(val);
            }}
          />
          {errors.penalty && <ErrorMessage message={errors.penalty.message} />}
        </Box>
      )}
    />
  );
};
