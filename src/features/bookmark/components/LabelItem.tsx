import React from "react";
import { TableCell, TableRow, Button, ButtonGroup } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { LabelNameChip } from "@features/bookmark/components/LabelIcon";
import { ButtonWithAlertDialog } from "@features/ui/component/AlertDialog";
import { useToggle } from "@hooks/index";
import { useIndexedDBForProblemLabel } from "../hooks/useProblemLabels";
import { Editer } from "./Editer";
import {
  ProblemLabelForm,
  problemLabelFormSchema,
  ProblemLabel,
} from "@features/bookmark/problemLabel";

type Props = {
  label: ProblemLabel;
};

export const LabelItem: React.FC<Props> = ({ label }) => {
  const { updateLabel, deleteLabel } = useIndexedDBForProblemLabel();
  const [showBlock, toggleShowBlock] = useToggle(false, true);
  const navigate = useNavigate();

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
        <Editer
          control={control}
          errors={errors}
          handleSubmit={handleSubmit(onSubmit)}
          watchedName={watchedName}
          watchedColor={watchedColor}
          onCancel={() => {
            reset();
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
          onView={() => navigate(`/labels/${label.name}`)}
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
  onView: () => void;
}> = ({ label, watchedName, watchedColor, onEdit, onDelete, onView }) => (
  <>
    <TableCell>
      <LabelNameChip name={watchedName} color={watchedColor} mode="View" />
    </TableCell>
    <TableCell>{label.description}</TableCell>
    <TableCell>
      <Button onClick={onView}>{label.problems.length}</Button>
    </TableCell>
    <TableCell>
      <ButtonGroup>
        <Button variant="text" onClick={onEdit}>
          Edit
        </Button>
        <ButtonWithAlertDialog
          title="Delete"
          dialogText="Are you sure? Deleting a label will remove it from relevant problems."
          dialogTitle="Confirmation"
          deleteTarget={label.id as number}
          deleteFn={onDelete}
        />
      </ButtonGroup>
    </TableCell>
  </>
);
