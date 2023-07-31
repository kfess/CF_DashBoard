import React from "react";
import Stack from "@mui/material/Stack";
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
};

export const Editer: React.FC<Props> = ({
  control,
  errors,
  handleSubmit,
  watchedName,
  watchedColor,
  onCancel,
}) => {
  return (
    <TableCell colSpan={4}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={0.5} padding={2}>
          <LabelNameChip
            name={watchedName}
            color={isValidHexaColor(watchedColor) ? watchedColor : "#000000"}
            mode="Preview"
          />
          <Stack direction={{ xs: "column", sm: "row", md: "row" }} spacing={2}>
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
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </Stack>
        </Stack>
      </form>
    </TableCell>
  );
};
