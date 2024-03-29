import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToggle } from "@hooks/index";
import { useIndexedDBForContestLabel } from "@features/bookmark/hooks/useIndexedDBForContestLabel";
import {
  generateRandomHexaColor,
  isValidHexaColor,
} from "@features/color/labelColor";
import {
  ContestLabelForm,
  contestLabelFormSchema,
} from "@features/bookmark/contestLabel";
import { Button } from "@features/ui/component/Button";
import { LabelNameChip } from "@features/bookmark/components/contest/LabelNameChip";
import { Name } from "@features/bookmark/components/contest/Name";
import { Description } from "@features/bookmark/components/contest/Description";
import { Color } from "@features/bookmark/components/contest/Color";
import { trimFullWhiteSpace } from "@helpers/format";

const getDefaultValues = (): ContestLabelForm => ({
  name: "",
  description: "",
  color: generateRandomHexaColor(),
});

export const Creator: React.FC = () => {
  const { createLabel, allLabelNames } = useIndexedDBForContestLabel();
  const [showBlock, toggleShowBlock] = useToggle(false, true);

  const {
    control,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<ContestLabelForm>({
    resolver: zodResolver(contestLabelFormSchema),
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
      name: watchedName,
      color: watchedColor,
      description: getValues("description"),
      contests: [],
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
              backgroundColor: (theme) => theme.palette.background.paper,
            }}
          >
            <LabelNameChip
              name={trimFullWhiteSpace(watchedName)}
              color={isValidHexaColor(watchedColor) ? watchedColor : "#000000"}
              mode="Preview"
            />
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
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
