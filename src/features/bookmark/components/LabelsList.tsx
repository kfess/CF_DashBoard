import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProblemLabelForm,
  problemLabelFormSchema,
} from "@features/bookmark/problemLabel";
import { TableCell, TableRow, Button, ButtonGroup, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LabelNameChip } from "@features/bookmark/components/LabelIcon";
import { ButtonWithAlertDialog } from "@features/ui/component/AlertDialog";
import { useToggle } from "@hooks/index";
import type { ProblemLabel } from "@features/bookmark/problemLabel";
import { useIndexedDBForProblemLabel } from "../hooks/useProblemLabels";
import { Editer } from "./Editer";

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

  const navigate = useNavigate();

  return (
    <TableRow>
      {showBlock ? (
        <TableCell colSpan={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Editer
                control={control}
                errors={errors}
                handleSubmit={handleSubmit(onSubmit)}
                watchedName={watchedName}
                watchedColor={watchedColor}
                onCancel={() => {
                  toggleShowBlock();
                }}
              />
            </Grid>
          </Grid>
        </TableCell>
      ) : (
        <>
          <TableCell>
            <LabelNameChip
              name={watchedName}
              color={watchedColor}
              mode="View"
            />
          </TableCell>
          <TableCell>{label.description}</TableCell>
          <TableCell>
            <Button
              onClick={() => {
                navigate(`/labels/${label.name}`);
              }}
            >
              {label.problems.length}
            </Button>
          </TableCell>
          <TableCell>
            <ButtonGroup>
              <Button variant="text" onClick={toggleShowBlock}>
                Edit
              </Button>
              <ButtonWithAlertDialog
                title="Delete"
                dialogText="Are you sure? Deleting a label will remove it from relevant problems."
                dialogTitle="Confirmation"
                deleteTarget={label.id as number}
                deleteFn={() => {
                  deleteLabel(label.id as number);
                }}
              />
            </ButtonGroup>
          </TableCell>
        </>
      )}
    </TableRow>
  );
};
