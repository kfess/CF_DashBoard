import React from "react";
import { useNavigate } from "react-router-dom";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import { Chip } from "@features/ui/component/Chip";
import { useTheme } from "@mui/material";

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

  const theme = useTheme();
  const textColor = theme.palette.mode === "dark" ? "#fff" : "#000";
  const backgroundColorAlpha = theme.palette.mode === "dark" ? 0.9 : 0.6;

  return (
    <Box sx={{ p: 1, textAlign: "left" }}>
      {mode === "Preview" ? (
        <Chip
          label={<div>{name.trim().length > 0 ? name : "Label Preview"}</div>}
          sx={{
            color: textColor,
            borderColor: "black",
            backgroundColor: alpha(color, backgroundColorAlpha),
            fontWeight: "bold",
          }}
        />
      ) : (
        <Chip
          label={<div>{name.trim().length > 0 ? name : "Label Preview"}</div>}
          sx={{
            color: textColor,
            borderColor: "black",
            backgroundColor: alpha(color, backgroundColorAlpha),
            fontWeight: "bold",
          }}
          onClick={() => {
            navigate(`/labels/contest/${name}`);
          }}
        />
      )}
    </Box>
  );
};
