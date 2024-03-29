import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Control, Controller, FieldErrors } from "react-hook-form";
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
  fieldName?: "problemsFilter" | "individualProblemAddFilter";
};

export const Difficulty: React.FC<Props> = ({
  control,
  errors,
  fieldName = "problemsFilter",
}) => {
  const lowerDifficulties = ratingColor.map(
    (color) => ratingColorInfo[color].lowerBound
  );

  const upperDifficulties = ratingColor.map(
    (color) => ratingColorInfo[color].upperBound
  );

  return (
    <Stack direction="row" gap={1}>
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <Box width="50%">
            <Box
              component="label"
              display="block"
              htmlFor="difficulty-from-input"
              fontWeight="bold"
              mb={0.5}
            >
              Difficulty From
            </Box>
            <Select
              label="Difficulty From"
              options={lowerDifficulties.map((ld) => {
                return {
                  value: ld,
                  label: (
                    <>
                      <ColoredCircle color={getColorCodeFromRating(ld)} />{" "}
                      {ld !== -1 ? ld : "No Category Available"}
                    </>
                  ),
                };
              })}
              onChange={(value) => {
                field.onChange({ ...field.value, difficultyFrom: value });
              }}
              value={field.value.difficultyFrom}
              defaultValue={0}
            />
            {errors.problemsFilter?.difficultyFrom && (
              <ErrorMessage
                message={errors.problemsFilter?.difficultyFrom?.message}
              />
            )}
          </Box>
        )}
      />
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <Box width="50%">
            <Box
              component="label"
              display="block"
              htmlFor="difficulty-to-input"
              fontWeight="bold"
              mb={0.5}
            >
              Difficulty To
            </Box>
            <Select
              label="Difficulty To"
              options={upperDifficulties.map((ud) => {
                return {
                  value: ud,
                  label: (
                    <>
                      <ColoredCircle color={getColorCodeFromRating(ud)} />{" "}
                      {ud !== -1 ? ud : "No Category Available"}
                    </>
                  ),
                };
              })}
              onChange={(value) => {
                field.onChange({ ...field.value, difficultyTo: value });
              }}
              value={field.value.difficultyTo}
              defaultValue={5000}
            />
            {errors.problemsFilter?.difficultyTo && (
              <ErrorMessage
                message={errors.problemsFilter?.difficultyTo?.message}
              />
            )}
          </Box>
        )}
      />
    </Stack>
  );
};
