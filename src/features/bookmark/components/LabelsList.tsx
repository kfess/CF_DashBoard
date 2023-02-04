import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CheckIcon from "@mui/icons-material/Check";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRecoilState } from "recoil";
import { labelsState } from "@features/bookmark/label.atom";
import { LabelNameChip } from "./LabelIcon";

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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
              <Button
                endIcon={
                  open ? <KeyboardArrowDownIcon /> : <KeyboardArrowLeftIcon />
                }
                onClick={handleClick}
              >
                sort
              </Button>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {sortOrders.map((sortOrder) => (
                  <MenuItem
                    onClick={() => {
                      setOrder(sortOrder);
                      setAnchorEl(null);
                    }}
                  >
                    {sortOrder === order && <CheckIcon fontSize="small" />}
                    {sortOrder}
                  </MenuItem>
                ))}
              </Menu>
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
                <Button variant="text" onClick={() => deleteLabel(label.id)}>
                  Delete
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </div>
    </>
  );
};
