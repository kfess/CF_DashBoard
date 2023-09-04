import React from "react";
import { useNavigate } from "react-router-dom";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import { Chip } from "@features/ui/component/Chip";

type Mode = "Preview" | "View";
type Props = {
  readonly name: string;
  readonly color: string;
  readonly mode: Mode;
};

export const LabelNameChip: React.FC<Props> = ({
  name,
  color,
  mode = "View",
}) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 1, textAlign: "left" }}>
      {mode === "Preview" ? (
        <Chip
          label={<div>{name.trim().length > 0 ? name : "Label Preview"}</div>}
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
          css={{
            color: color,
            borderColor: "black",
            backgroundColor: alpha(color, 0.15),
            fontWeight: "bold",
          }}
          onClick={() => {
            navigate(`/labels/problem/${name}`);
          }}
        />
      )}
    </Box>
  );
};
