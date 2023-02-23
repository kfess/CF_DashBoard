import React from "react";
import { useNavigate } from "react-router-dom";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

type Mode = "Preview" | "View";
type LabelNameProps = { name: string; color: string; mode: Mode };

export const LabelNameChip: React.FC<LabelNameProps> = (
  props: LabelNameProps
) => {
  const { name, color, mode = "View" } = props;
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 1, textAlign: "left" }}>
      {mode === "Preview" ? (
        <Chip
          label={<div>{name.trim().length > 0 ? name : "Label Preview"}</div>}
          size="small"
          css={{
            color: color,
            borderColor: "black",
            backgroundColor: alpha(color, 0.15),
            fontWeight: "bold",
          }}
        />
      ) : (
        <Chip
          label={<div>{name.trim().length > 0 ? name : "Label Preview"}</div>}
          size="small"
          css={{
            color: color,
            borderColor: "black",
            backgroundColor: alpha(color, 0.15),
            fontWeight: "bold",
          }}
          onClick={() => {
            navigate(`/labels/${name}`);
          }}
        />
      )}
    </Box>
  );
};
