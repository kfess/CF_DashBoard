import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Input } from "@features/ui/component/Input";
import { FormControl } from "@features/ui/component/FormControl";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { ContestLabelForm } from "@features/bookmark/contestLabel";

type Props = {
  control: Control<ContestLabelForm>;
  errors: FieldErrors<ContestLabelForm>;
};

export const Description: React.FC<Props> = ({ control, errors }) => {
  return (
    <Controller
      name="description"
      control={control}
      render={({ field }) => (
        <FormControl>
          <label
            htmlFor="description-input"
            css={{ fontWeight: "bold", paddingBottom: "0.3rem" }}
          >
            Description
          </label>
          <Input
            {...field}
            placeholder="description (optional)"
            id="description-input"
            type="text"
          />
          <ErrorMessage message={errors.description?.message} />
        </FormControl>
      )}
    />
  );
};
