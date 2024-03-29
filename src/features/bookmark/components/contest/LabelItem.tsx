import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { TableCell, TableRow, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LabelNameChip } from "@features/bookmark/components/contest/LabelNameChip";
import { ButtonWithAlertDialog } from "@features/ui/component/AlertDialog";
import { useToggle } from "@hooks/index";
import { useIndexedDBForContestLabel } from "@features/bookmark/hooks/useIndexedDBForContestLabel";
import { Editor } from "@features/bookmark/components/contest/Editor";
import {
  ContestLabelForm,
  contestLabelFormSchema,
  ContestLabel,
} from "@features/bookmark/contestLabel";
import { pluralize } from "@helpers/format";
import { Button } from "@features/ui/component/Button";

type Props = {
  label: ContestLabel;
};

export const LabelItem: React.FC<Props> = ({ label }) => {
  const { updateLabel, deleteLabel, allLabelNames } =
    useIndexedDBForContestLabel();
  const [showBlock, toggleShowBlock] = useToggle(false, true);

  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
    reset,
  } = useForm<ContestLabelForm>({
    resolver: zodResolver(contestLabelFormSchema),
    defaultValues: {
      name: label.name,
      description: label.description,
      color: label.color,
    },
  });
  const watchedName = watch("name");
  const watchedColor = watch("color");

  // for name unique validation
  const [customError, setCustomError] = useState<string | null>(null);
  const resetCustomError = () => setCustomError(null);
  const isUniqueName =
    allLabelNames &&
    (!allLabelNames.includes(watchedName.trim()) ||
      label.name.trim() === watchedName.trim());

  const onSubmit = async () => {
    resetCustomError();
    if (!isUniqueName) {
      setCustomError("This name is already used.");
      return;
    }

    await updateLabel(label.id as number, {
      name: watchedName,
      color: watchedColor,
      description: getValues("description"),
    });
    toggleShowBlock();
  };

  return (
    <TableRow>
      {showBlock ? (
        <Editor
          control={control}
          errors={errors}
          handleSubmit={handleSubmit(onSubmit)}
          watchedName={watchedName}
          watchedColor={watchedColor}
          onCancel={() => {
            reset();
            toggleShowBlock();
          }}
          onDelete={async () => {
            await deleteLabel(label.id as number);
            toggleShowBlock();
          }}
          customError={customError}
          resetCustomError={resetCustomError}
        />
      ) : (
        <DefaultView
          label={label}
          watchedName={watchedName}
          watchedColor={watchedColor}
          onEdit={toggleShowBlock}
          onDelete={() => deleteLabel(label.id as number)}
        />
      )}
    </TableRow>
  );
};

const DefaultView: React.FC<{
  label: ContestLabel;
  watchedName: string;
  watchedColor: string;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ label, watchedName, watchedColor, onEdit, onDelete }) => (
  <>
    <TableCell sx={{ py: 1 }}>
      <LabelNameChip name={watchedName} color={watchedColor} mode="View" />
    </TableCell>
    <TableCell sx={{ py: 1 }}>
      {label.description ? (
        <Typography>{label.description}</Typography>
      ) : (
        <Typography color="text.secondary">No description provided</Typography>
      )}
    </TableCell>
    <TableCell sx={{ py: 1 }}>
      <Link to={{ pathname: `/labels/contest/${label.name}` }}>
        <Typography noWrap color="text.secondary">
          {label.contests.length} {pluralize(label.contests.length, "contest")}
        </Typography>
      </Link>
    </TableCell>
    <TableCell sx={{ py: 1 }}>
      <Stack direction="row" spacing={1}>
        <Button onClick={onEdit} color="secondary" size="small">
          Edit
        </Button>
        <ButtonWithAlertDialog
          title="Delete"
          dialogText="Are you sure? Deleting a label will remove it from relevant problems."
          dialogTitle="Confirmation"
          deleteTarget={label.id as number}
          deleteFn={onDelete}
        />
      </Stack>
    </TableCell>
  </>
);
