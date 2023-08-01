import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Input } from "@features/ui/component/Input";
import { FormControl } from "@features/ui/component/FormControl";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { ContestLabelForm } from "@features/bookmark/contestLabel";

type Props = {
  control: Control<ContestLabelForm>;
  errors: FieldErrors<ContestLabelForm>;
  customError: string | null;
  resetCustomError: () => void;
};

export const Name: React.FC<Props> = ({
  control,
  errors,
  customError,
  resetCustomError,
}) => {
  return (
    <Controller
      name="name"
      control={control}
      render={({ field }) => (
        <FormControl>
          <label
            htmlFor="name-input"
            css={{ fontWeight: "bold", paddingBottom: "0.3rem" }}
          >
            Name
          </label>
          <Input
            {...field}
            onChange={(e) => {
              resetCustomError();
              field.onChange(e);
            }}
            placeholder="Label name"
            id="name-input"
            type="text"
          />
          <ErrorMessage message={errors.name?.message || customError} />
        </FormControl>
      )}
    />
  );
};
