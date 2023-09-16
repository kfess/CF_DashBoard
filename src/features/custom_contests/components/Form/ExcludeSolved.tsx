import React from "react";
import { Control, FieldErrors, Controller } from "react-hook-form";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { Checkbox } from "@features/ui/component/Checkbox";
import { Chip } from "@features/ui/component/Chip";

type Props = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
  getValues: () => CreateCustomContest;
};

export const ExcludeSolved: React.FC<Props> = ({
  control,
  errors,
  getValues,
}) => {
  const owner = getValues().owner ?? "you";

  return (
    <Controller
      control={control}
      name="problemsFilter.excludeSolved"
      render={({ field }) => (
        <>
          <Checkbox
            title="Restriction"
            label={
              <>
                Do not suggest problems already solved by{" "}
                <Chip label={owner || "you"} />
              </>
            }
            toggle={() => {
              field.onChange(!field.value);
            }}
            description={`When you check this, problems already solved by ${owner} will not be suggested.`}
          />
          {errors.problemsFilter?.excludeSolved && (
            <ErrorMessage
              message={errors.problemsFilter.excludeSolved.message}
            />
          )}
        </>
      )}
    />
  );
};
