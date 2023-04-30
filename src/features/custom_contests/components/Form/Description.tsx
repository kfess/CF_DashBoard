import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { TextArea } from "@features/ui/component/TextArea";
import { FormControl } from "@features/ui/component/FormControl";
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
        <FormControl>
          <label
            htmlFor="description-input"
            css={{ fontWeight: "bold", paddingBottom: "0.3rem" }}
          >
            Description
          </label>
          <TextArea {...field} placeholder="Description" />
          <ErrorMessage message={errors.description?.message} />
        </FormControl>
      )}
    />
  );
};
