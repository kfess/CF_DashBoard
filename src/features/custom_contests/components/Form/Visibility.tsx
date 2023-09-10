import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Checkbox } from "@features/ui/component/Checkbox";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { CreateCustomContest } from "@features/custom_contests/customContest";

type Props = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
};

export const Visibility: React.FC<Props> = ({ control, errors }) => {
  return (
    <Controller
      name="visibility"
      control={control}
      render={({ field }) => (
        <>
          <Checkbox
            title="Contest Visibility"
            label="Make the contest Private"
            toggle={() => {
              field.onChange(field.value === "Private" ? "Public" : "Private");
            }}
            description="Private Contest is invisible to everyone except you."
          />

          <ErrorMessage message={errors.visibility?.message} />
        </>
      )}
    />
  );
};
