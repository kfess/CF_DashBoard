import React, { useState } from "react";
import { TableCell, TableRow, Button, ButtonGroup, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LabelNameChip } from "@features/bookmark/components/LabelIcon";
import { LabelEditor } from "@features/bookmark/components/LabelEditer";
import { ButtonWithAlertDialog } from "@features/ui/component/AlertDialog";
import { useToggle } from "@hooks/index";
import { HexaColor } from "@features/color/labelColor";
import { ProblemLabelState } from "../_problemLabel.atom";
import { useIndexedDBForProblemLabel } from "../hooks/useProblemLabels";

type Props = {
  label: ProblemLabelState;
};

export const LabelItem: React.FC<Props> = ({ label }) => {
  const { deleteLabel } = useIndexedDBForProblemLabel();

  const navigate = useNavigate();
  const [showBlock, toggleShowBlock] = useToggle(false, true);

  const [name, setName] = useState({
    value: label.name,
    errorMsg: "",
  });
  const [description, setDescription] = useState({
    value: label.description,
    errorMsg: "",
  });
  const [color, setColor] = useState(label.color);

  const [defaultName, defaultDescription, defaultColor] = [
    label.name,
    label.description,
    label.color,
  ];

  return (
    <TableRow>
      {!showBlock ? (
        <>
          <TableCell>
            <LabelNameChip name={name.value} color={label.color} mode="View" />
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
      ) : (
        <TableCell colSpan={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <LabelEditor
                id={label.id as number}
                name={name}
                setName={setName}
                defaultName={defaultName}
                description={description}
                setDescription={setDescription}
                defaultDescription={defaultDescription}
                color={color as HexaColor}
                setColor={setColor}
                defaultColor={defaultColor as HexaColor}
                toggleShowBlock={toggleShowBlock}
              />
            </Grid>
          </Grid>
        </TableCell>
      )}
    </TableRow>
  );
};
