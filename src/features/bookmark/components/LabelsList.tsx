import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useRecoilState } from "recoil";
import { labelsState } from "@features/bookmark/label.atom";
import { LabelNameChip } from "./LabelIcon";

export const LabelsList: React.FC = () => {
  const [labels, setLabels] = useRecoilState(labelsState);
  const navigate = useNavigate();

  const editLabel = () => {};
  const deleteLabel = (id: number) => {
    setLabels(labels.filter((label) => label.id !== id));
  };

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
            <Box>sort</Box>
          </Box>
          {labels.map((label) => (
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
