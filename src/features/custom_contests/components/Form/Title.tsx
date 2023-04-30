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

export const Title: React.FC<Props> = ({ control, errors }) => {
  return (
    <Controller
      name="title"
      control={control}
      render={({ field }) => (
        <FormControl>
          <label
            htmlFor="title-input"
            css={{ fontWeight: "bold", paddingBottom: "0.3rem" }}
          >
            Title
          </label>
          <Input
            {...field}
            placeholder="Contest Title"
            id="title-input"
            type="text"
          />
          <ErrorMessage message={errors.title?.message} />
        </FormControl>
      )}
    />
  );
};
