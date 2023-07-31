import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Input } from "@features/ui/component/Input";
import { FormControl } from "@features/ui/component/FormControl";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { ProblemLabelForm } from "../problemLabel";

type Props = {
  control: Control<ProblemLabelForm>;
  errors: FieldErrors<ProblemLabelForm>;
};

export const Name: React.FC<Props> = ({ control, errors }) => {
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
            placeholder="Label name"
            id="name-input"
            type="text"
          />
          <ErrorMessage message={errors.name?.message} />
        </FormControl>
      )}
    />
  );
};
