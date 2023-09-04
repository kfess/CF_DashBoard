import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { TableCell, TableRow, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LabelNameChip } from "@features/bookmark/components/problem/LabelNameChip";
import { ButtonWithAlertDialog } from "@features/ui/component/AlertDialog";
import { useToggle } from "@hooks/index";
import { useIndexedDBForProblemLabel } from "@features/bookmark/hooks/useIndexedDBForProblemLabel";
import { Editor } from "./Editor";
import {
  ProblemLabelForm,
  problemLabelFormSchema,
  ProblemLabel,
} from "@features/bookmark/problemLabel";
import { pluralize } from "@helpers/format";
import { __Button } from "@features/ui/component/Button";
import { trimFullWhiteSpace } from "@helpers/format";

type Props = {
  label: ProblemLabel;
};

export const LabelItem: React.FC<Props> = ({ label }) => {
  const { updateLabel, deleteLabel, allLabelNames } =
    useIndexedDBForProblemLabel();
  const [showBlock, toggleShowBlock] = useToggle(false, true);

  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
    reset,
  } = useForm<ProblemLabelForm>({
    resolver: zodResolver(problemLabelFormSchema),
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
  label: ProblemLabel;
  watchedName: string;
  watchedColor: string;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ label, watchedName, watchedColor, onEdit, onDelete }) => (
  <>
    <TableCell sx={{ py: 1 }}>
      <LabelNameChip
        name={trimFullWhiteSpace(watchedName)}
        color={watchedColor}
        mode="View"
      />
    </TableCell>
    <TableCell sx={{ py: 1 }}>
      {label.description ? (
        <Typography>{label.description}</Typography>
      ) : (
        <Typography color="text.secondary">No description provided</Typography>
      )}
    </TableCell>
    <TableCell sx={{ py: 1 }}>
      <Link to={{ pathname: `/labels/problem/${label.name}` }}>
        <Typography noWrap color="text.secondary">
          {label.problems.length} {pluralize(label.problems.length, "problem")}
        </Typography>
      </Link>
    </TableCell>
    <TableCell sx={{ py: 1 }}>
      <Stack direction="row" spacing={1}>
        <__Button onClick={onEdit}>Edit</__Button>
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
