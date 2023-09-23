import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToggle } from "@hooks/index";
import { useIndexedDBForProblemLabel } from "@features/bookmark/hooks/useIndexedDBForProblemLabel";
import { generateHighContrastColor } from "@features/color/labelColor";
import {
  ProblemLabelForm,
  problemLabelFormSchema,
} from "@features/bookmark/problemLabel";
import { Button } from "@features/ui/component/Button";
import { LabelNameChip } from "@features/bookmark/components/problem/LabelNameChip";
import { Name } from "@features/bookmark/components/problem/Name";
import { Description } from "@features/bookmark/components/problem/Description";
import { Color } from "@features/bookmark/components/problem/Color";
import { trimFullWhiteSpace } from "@helpers/format";
import { useTheme } from "@mui/material";

const getDefaultValues = (): ProblemLabelForm => {
  return {
    name: "",
    description: "",
    color: generateHighContrastColor(),
  };
};

export const Creator: React.FC = () => {
  const theme = useTheme();

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
    allLabelNames && !allLabelNames.includes(trimFullWhiteSpace(watchedName));

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
        <Box sx={{ py: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={toggleShowBlock}>New Label</Button>
        </Box>
        {showBlock && (
          <Stack
            padding={2}
            mb={1.5}
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: "4px",
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <LabelNameChip
              name={trimFullWhiteSpace(watchedName)}
              color={watchedColor ?? "#000000"}
              mode="Preview"
            />
            <Stack
              direction={{ xs: "column", md: "row" }}
              sx={{ justifyContent: "space-between" }}
              spacing={1}
            >
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 0, md: 1.5 }}
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
                    <Button onClick={onCancel} color="secondary">
                      Cancel
                    </Button>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      disabled={
                        watchedName === "" ||
                        watchedColor === "" ||
                        Object.keys(errors).length > 0
                      }
                    >
                      Create label
                    </Button>
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
