import React from "react";
import Box from "@mui/material/Box";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Select } from "@features/ui/component/Select";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { classifications } from "@features/contests/contest";
import { getColorCodeFromClassification } from "@features/color/ratingColor";
import { ColoredCircle } from "@features/color/components/ColoredCircle";

type Props = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
  fieldName?: "problemsFilter" | "individualProblemAddFilter";
};

export const Classification: React.FC<Props> = ({
  control,
  errors,
  fieldName = "problemsFilter",
}) => {
  return (
    <>
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <Box width="50%">
            <Box
              component="label"
              display="block"
              htmlFor="classification-input"
              fontWeight="bold"
              mb={0.5}
            >
              Classification
            </Box>
            <Select
              label="Classification"
              options={classifications.map((classification) => {
                const [startColor, endColor] =
                  getColorCodeFromClassification(classification);

                return {
                  value: classification,
                  label: (
                    <>
                      <ColoredCircle color={startColor} />-
                      <ColoredCircle color={endColor} /> {classification}
                    </>
                  ),
                };
              })}
              onChange={(value) => {
                field.onChange({ ...field.value, classifization: value });
              }}
              value={field.value.classifization}
              defaultValue="All"
            />
            {errors.problemsFilter?.classifization && (
              <ErrorMessage
                message={errors.problemsFilter?.classifization?.message}
              />
            )}
          </Box>
        )}
      />
    </>
  );
};
