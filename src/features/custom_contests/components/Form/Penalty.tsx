import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Input } from "@features/ui/component/Input";
import { FormControl } from "@features/ui/component/FormControl";
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
        <div>
          <FormControl>
            <label
              htmlFor="penalty-input"
              css={{ fontWeight: "bold", paddingBottom: "0.3rem" }}
            >
              Penalty (seconds)
            </label>
            <Input
              {...field}
              value={field.value}
              id="penalty-input"
              placeholder="300"
              type="number"
              onChange={(e) => {
                const val =
                  e.target.value === "" ? null : e.target.valueAsNumber;
                field.onChange(val);
              }}
            />
            <ErrorMessage message={errors.penalty?.message} />
          </FormControl>
        </div>
      )}
    />
  );
};
