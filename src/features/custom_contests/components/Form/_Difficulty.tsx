import React from "react";
import Stack from "@mui/material/Stack";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FormControl } from "@features/ui/component/FormControl";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { Select } from "@features/ui/component/Select";
import {
  getColorCodeFromRating,
  ratingColor,
  ratingColorInfo,
} from "@features/color/ratingColor";
import { ColoredCircle } from "@features/color/components/ColoredCircle";

type Props = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
};

export const _Difficulty: React.FC<Props> = ({ control, errors }) => {
  const lowerDifficulties = ratingColor.map(
    (color) => ratingColorInfo[color].lowerBound
  );

  const upperDifficulties = ratingColor.map(
    (color) => ratingColorInfo[color].upperBound
  );

  return (
    <Stack direction="row" gap={1}>
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
              <Select
                label="Difficulty From"
                options={lowerDifficulties.map((ld) => {
                  return {
                    value: ld,
                    label: (
                      <>
                        <ColoredCircle color={getColorCodeFromRating(ld)} />{" "}
                        {ld}
                      </>
                    ),
                  };
                })}
                onChange={(value) => {
                  field.onChange({ ...field.value, difficultyFrom: value });
                }}
                defaultValue={0}
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
              <Select
                label="Difficulty To"
                options={upperDifficulties.map((ud) => {
                  return {
                    value: ud,
                    label: (
                      <>
                        <ColoredCircle color={getColorCodeFromRating(ud)} />{" "}
                        {ud}
                      </>
                    ),
                  };
                })}
                onChange={(value) => {
                  field.onChange({ ...field.value, difficultyTo: value });
                }}
                defaultValue={5000}
              />
              <ErrorMessage
                message={errors.problemsFilter?.difficultyTo?.message}
              />
            </FormControl>
          </>
        )}
      />
    </Stack>
  );
};
