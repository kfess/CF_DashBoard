import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToggle } from "@hooks/index";
import { useIndexedDBForProblemLabel } from "@features/bookmark/hooks/useIndexedDBForProblemLabel";
import {
  generateRandomHexaColor,
  isValidHexaColor,
} from "@features/color/labelColor";
import {
  ProblemLabelForm,
  problemLabelFormSchema,
} from "@features/bookmark/problemLabel";
import { _Button } from "@features/ui/component/Button";
import { LabelNameChip } from "@features/bookmark/components/problem/LabelNameChip";
import { Name } from "@features/bookmark/components/problem/Name";
import { Description } from "@features/bookmark/components/problem/Description";
import { Color } from "@features/bookmark/components/problem/Color";
import { trimFullWhiteSpace } from "@helpers/format";

const getDefaultValues = (): ProblemLabelForm => ({
  name: "",
  description: "",
  color: generateRandomHexaColor(),
});

export const Creator: React.FC = () => {
  const { createLabel, allLabelNames } = useIndexedDBForProblemLabel();
  const [showBlock, toggleShowBlock] = useToggle(false, true);

  const {
    control,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<ProblemLabelForm>({
    resolver: zodResolver(problemLabelFormSchema),
    defaultValues: getDefaultValues(),
  });
  const watchedName = watch("name");
  const watchedColor = watch("color");

  // for name unique validation
  const [customError, setCustomError] = useState<string | null>(null);
  const resetCustomError = () => setCustomError(null);
  const isUniqueName =
    allLabelNames && !allLabelNames.includes(watchedName.trim());

  const onCancel = () => {
    reset();
    resetCustomError();
    toggleShowBlock();
  };

  const onSubmit = async () => {
    resetCustomError();
    if (!isUniqueName) {
      setCustomError("This name is already used.");
      return;
    }

    await createLabel({
      name: getValues("name"),
      color: watchedColor,
      description: getValues("description"),
      problems: [],
    });
    reset();
    toggleShowBlock();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ py: 1, display: "flex", justifyContent: "flex-end" }}>
          <_Button onClick={toggleShowBlock} color="#1E883E">
            New Label
          </_Button>
        </Box>
        {showBlock && (
          <Stack
            padding={2}
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: "4px",
              backgroundColor: "white",
              mb: 1,
            }}
          >
            <LabelNameChip
              name={trimFullWhiteSpace(watchedName)}
              color={isValidHexaColor(watchedColor) ? watchedColor : "#000000"}
              mode="Preview"
            />
            <Stack
              direction={{
                xs: "column",
                md: "row",
              }}
              sx={{ justifyContent: "space-between" }}
              spacing={1}
            >
              <Stack
                direction={{
                  xs: "column",
                  md: "row",
                }}
                spacing={2}
              >
                <div>
                  <Name
                    control={control}
                    errors={errors}
                    customError={customError}
                    resetCustomError={resetCustomError}
                  />
                </div>
                <div>
                  <Description control={control} errors={errors} />
                </div>
                <div>
                  <Color control={control} errors={errors} />
                </div>
              </Stack>
              <Stack direction="column" spacing={1}>
                <Box sx={{ height: { xs: "0px", md: "1.8rem" } }} />
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <div>
                    <_Button onClick={onCancel}>Cancel</_Button>
                  </div>
                  <div>
                    <_Button
                      type="submit"
                      css={{ whiteSpace: "nowrap" }}
                      color="#1E883E"
                      disabled={
                        watchedName === "" ||
                        watchedColor === "" ||
                        Object.keys(errors).length > 0
                      }
                    >
                      Create label
                    </_Button>
                  </div>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        )}
      </form>
    </>
  );
};
