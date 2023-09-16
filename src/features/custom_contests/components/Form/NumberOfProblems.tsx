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

export const NumberOfProblems: React.FC<Props> = React.memo(
  ({ control, errors }) => {
    return (
      <Controller
        name="problemsFilter"
        control={control}
        render={({ field }) => (
          <Box>
            <Box
              component="label"
              display="block"
              htmlFor="problems-number-input"
              fontWeight="bold"
              mb={0.5}
            >
              Number of Problems
            </Box>
            <Input
              id="problems-number-input"
              type="number"
              value={field.value.count}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const val =
                  e.target.value === "" ? null : e.target.valueAsNumber;
                field.onChange({ ...field.value, count: val });
              }}
            />
            {errors.problemsFilter?.count && (
              <ErrorMessage message={errors.problemsFilter.count.message} />
            )}
          </Box>
        )}
      />
    );
  }
);
