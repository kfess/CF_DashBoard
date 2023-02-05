import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useRecoilState } from "recoil";
import { labelsState } from "@features/bookmark/label.atom";
import { LabelNameChip } from "./LabelIcon";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import { ButtonWithAlertDialog } from "@features/ui/component/AlertDialog";

const sortOrders = [
  "Alphabetically",
  "Reverse Alphabetically",
  "Most Problems",
  "Fewest Problems",
] as const;
type SortOrder = typeof sortOrders[number];

export const LabelsList: React.FC = () => {
  const [labels, setLabels] = useRecoilState(labelsState);
  const navigate = useNavigate();

  const editLabel = () => {};
  const deleteLabel = (id: number) => {
    setLabels(labels.filter((label) => label.id !== id));
  };

  const [order, setOrder] = useState<SortOrder>("Alphabetically");
  const sortedLabels = [...labels].sort((a, b) => {
    switch (order) {
      case "Alphabetically":
        return a.name.localeCompare(b.name);
      case "Reverse Alphabetically":
        return b.name.localeCompare(a.name);
      case "Most Problems":
        return b.problems.length - a.problems.length;
      case "Fewest Problems":
        return a.problems.length - b.problems.length;
    }
  });

  return (
    <>
      <div css={{ width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              p: 1,
              m: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>{labels.length} labels</Box>
            <Box>
              <DropDownMenuButton
                title="sort"
                items={sortOrders}
                selectedItem={order}
                setSelectedItem={setOrder}
              />
            </Box>
          </Box>
          {sortedLabels.map((label) => (
            <Box sx={{ p: 1, m: 1, display: "flex" }}>
              <Box sx={{ width: "25%", textAlign: "left" }}>
                <LabelNameChip
                  name={label.name}
                  color={label.color}
                  mode="View"
                />
              </Box>
              <Box sx={{ width: "40%", textAlign: "left" }}>
                {label.description}
              </Box>
              <Box
                sx={{
                  width: "10%",
                  textAlign: "left",
                }}
              >
                <Button
                  onClick={() => {
                    navigate(`/bookmark/labels/${label.name}`);
                  }}
                >
                  <CreateOutlinedIcon />
                  {label.problems.length}
                </Button>
              </Box>
              <Box sx={{ width: "25%" }}>
                <Button variant="text" onClick={editLabel}>
                  Edit
                </Button>
                <ButtonWithAlertDialog
                  title="Delete"
                  dialogText="Are you sure? Deleting a label will remove it from relevant problems."
                  dialogTitle="Confirmation"
                  deleteTarget={label.id}
                  deleteFn={deleteLabel}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </div>
    </>
  );
};
