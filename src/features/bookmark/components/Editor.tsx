import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { TableCell } from "@mui/material";
import { Control, FieldErrors } from "react-hook-form";
import { isValidHexaColor } from "@features/color/labelColor";
import { Button } from "@features/ui/component/Button";
import { LabelNameChip } from "@features/bookmark/components/LabelNameChip";
import { ProblemLabelForm } from "../problemLabel";
import { Name } from "@features/bookmark/components/Name";
import { Description } from "@features/bookmark/components/Description";
import { Color } from "@features/bookmark/components/Color";

type Props = {
  control: Control<ProblemLabelForm>;
  errors: FieldErrors<ProblemLabelForm>;
  handleSubmit: () => void;
  watchedName: string;
  watchedColor: string;
  onCancel: () => void;
  onDelete: () => void;
};

export const Editor: React.FC<Props> = ({
  control,
  errors,
  handleSubmit,
  watchedName,
  watchedColor,
  onCancel,
  onDelete,
}) => {
  return (
    <TableCell colSpan={4} sx={{ py: 0 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={0.5} padding={1.5}>
          <Stack direction="row" justifyContent="space-between">
            <LabelNameChip
              name={watchedName}
              color={isValidHexaColor(watchedColor) ? watchedColor : "#000000"}
              mode="Preview"
            />
            <div>
              <Button onClick={onDelete}>Delete</Button>
            </div>
          </Stack>

          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            sx={{ justifyContent: "space-between" }}
            spacing={2}
          >
            <Stack
              direction={{
                xs: "column",
                md: "row",
              }}
              spacing={1}
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
                  <Button onClick={onCancel}>Cancel</Button>
                </div>
                <div>
                  <Button
                    type="submit"
                    css={{ whiteSpace: "nowrap" }}
                    disabled={
                      watchedName === "" ||
                      watchedColor === "" ||
                      Object.keys(errors).length > 0
                    }
                  >
                    Save Changes
                  </Button>
                </div>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </TableCell>
  );
};
