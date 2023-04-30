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

export const ProblemsDifficulty: React.FC<Props> = ({ control, errors }) => {
  return (
    <>
      <Controller
        name="problemsFilter"
        control={control}
        render={({ field }) => (
          <>
            <FormControl>
              <label
                htmlFor="difficulty-from-input"
                css={{ fontWeight: "bold", paddingBottom: "0.3rem" }}
              >
                Difficulty From
              </label>
              <Input
                id="difficulty-from-input"
                type="number"
                defaultValue={0}
                value={field.value.difficultyFrom}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const val =
                    e.target.value === "" ? 0 : e.target.valueAsNumber;
                  field.onChange({ ...field.value, difficultyFrom: val });
                }}
              />
              <ErrorMessage
                message={errors.problemsFilter?.difficultyFrom?.message}
              />
            </FormControl>
          </>
        )}
      />

      <Controller
        name="problemsFilter"
        control={control}
        render={({ field }) => (
          <>
            <FormControl>
              <label
                htmlFor="difficulty-to-input"
                css={{ fontWeight: "bold", paddingBottom: "0.3rem" }}
              >
                Difficulty To
              </label>
              <Input
                id="difficulty-to-input"
                type="number"
                defaultValue={5000}
                value={field.value.difficultyTo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const val =
                    e.target.value === "" ? 0 : e.target.valueAsNumber;
                  field.onChange({ ...field.value, difficultyTo: val });
                }}
              />
              <ErrorMessage
                message={errors.problemsFilter?.difficultyTo?.message}
              />
            </FormControl>
          </>
        )}
      />
    </>
  );
};
