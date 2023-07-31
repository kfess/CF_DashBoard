import React from "react";
import { TableCell, TableRow, Button, ButtonGroup, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LabelNameChip } from "@features/bookmark/components/LabelNameChip";
import { ButtonWithAlertDialog } from "@features/ui/component/AlertDialog";
import { useToggle } from "@hooks/index";
import { useIndexedDBForProblemLabel } from "../hooks/useProblemLabels";
import { Editor } from "./Editor";
import {
  ProblemLabelForm,
  problemLabelFormSchema,
  ProblemLabel,
} from "@features/bookmark/problemLabel";
import { pluralize } from "@helpers/format";
import { _Button } from "@features/ui/component/Button";

type Props = {
  label: ProblemLabel;
};

export const LabelItem: React.FC<Props> = ({ label }) => {
  const { updateLabel, deleteLabel } = useIndexedDBForProblemLabel();
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

  const onSubmit = async () => {
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
      <LabelNameChip name={watchedName} color={watchedColor} mode="View" />
    </TableCell>
    <TableCell sx={{ py: 1 }}>{label.description}</TableCell>
    <TableCell sx={{ py: 1 }}>
      <Link
        to={{
          pathname: `/labels/${label.name}`,
        }}
        css={{ whiteSpace: "nowrap" }}
      >
        {label.problems.length} {pluralize(label.problems.length, "problem")}
      </Link>
    </TableCell>
    <TableCell sx={{ py: 1 }}>
      <Stack direction="row" spacing={1}>
        <_Button onClick={onEdit}>Edit</_Button>
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
