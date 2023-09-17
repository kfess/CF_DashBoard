import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { RadioButton } from "@features/ui/component/RadioButton";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { modes } from "@features/custom_contests/customContest";

type Props = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
};

export const Mode: React.FC<Props> = ({ control, errors }) => {
  return (
    <Controller
      name="mode"
      control={control}
      render={({ field }) => (
        <>
          <RadioButton
            title="Mode"
            items={modes}
            selectedItem={field.value}
            setSelectedItem={(selectedMode) => {
              field.onChange(selectedMode);
            }}
          />
          {errors.mode && <ErrorMessage message={errors.mode.message} />}
        </>
      )}
    />
  );
};
