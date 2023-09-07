import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FormControl } from "@features/ui/component/FormControl";
import { Input } from "@features/ui/component/Input";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { CreateCustomContest } from "@features/custom_contests/customContest";

type Props = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
};

export const ProblemsCount: React.FC<Props> = ({ control, errors }) => {
  return (
    <Controller
      name="problemsFilter"
      control={control}
      render={({ field }) => (
        <FormControl>
          <label
            htmlFor="problems-number-input"
            css={{ fontWeight: "bold", paddingBottom: "0.3rem" }}
          >
            Number of Problems
          </label>
          <Input
            id="problems-number-input"
            type="number"
            value={field.value.count}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const val = e.target.value === "" ? null : e.target.valueAsNumber;
              field.onChange({ ...field.value, count: val });
            }}
          />
          <ErrorMessage message={errors.problemsFilter?.count?.message} />
        </FormControl>
      )}
    />
  );
};
