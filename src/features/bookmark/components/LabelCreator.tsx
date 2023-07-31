import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToggle } from "@hooks/index";
import { useIndexedDBForProblemLabel } from "@features/bookmark/hooks/useProblemLabels";
import {
  generateRandomHexaColor,
  isValidHexaColor,
} from "@features/color/labelColor";
import {
  ProblemLabelForm,
  problemLabelFormSchema,
} from "@features/bookmark/problemLabel";
import { _Button } from "@features/ui/component/Button";
import { LabelNameChip } from "@features/bookmark/components/LabelNameChip";
import { Name } from "@features/bookmark/components/Name";
import { Description } from "@features/bookmark/components/Description";
import { Color } from "@features/bookmark/components/Color";

const getDefaultValues = (): ProblemLabelForm => ({
  name: "",
  description: "",
  color: generateRandomHexaColor(),
});

export const LabelCreator: React.FC = () => {
  const { createLabel } = useIndexedDBForProblemLabel();
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

  const onCancel = () => {
    reset();
    toggleShowBlock();
  };

  const onSubmit = async () => {
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
              name={watchedName}
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
                  <Name control={control} errors={errors} />
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
