import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { css } from "@emotion/react";
import Chip from "@mui/material/Chip";
import { alpha } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlined from "@mui/icons-material/StarBorderOutlined";
import { labelsState } from "@features/bookmark/label.atom";

const circleCss = css({
  cursor: "pointer",
  borderRadius: "50%",
  display: "inline-block",
  paddingTop: "3px",
  paddingLeft: "4px",
  paddingRight: "4px",
  backgroundColor: "#EFEFEF",
  color: "#93A1B0",
  "&:hover": { color: "#666" },
});

export const LabelIcon: React.FC = () => {
  return (
    <span css={circleCss}>
      <StarIcon fontSize="inherit" />
    </span>
  );
};

export const LabelsChip: React.FC = () => {
  const labels = useRecoilValue(labelsState);
  const navigate = useNavigate();

  return (
    <Chip
      label={
        <div css={{ display: "flex", gap: "3px", alignItems: "center" }}>
          <StarBorderOutlined fontSize="small" />
          <div>{labels.length} Labels</div>
        </div>
      }
      variant="outlined"
      onClick={() => {
        navigate("/bookmark/labels");
      }}
    />
  );
};

type Mode = "Preview" | "View";
type LabelNameProps = { name: string; color: string; mode: Mode };

export const LabelNameChip: React.FC<LabelNameProps> = (
  props: LabelNameProps
) => {
  const { name, color, mode = "View" } = props;
  const navigate = useNavigate();

  return (
    <div css={{ textAlign: "left", marginBottom: "10px" }}>
      {mode === "Preview" ? (
        <Chip
          label={<div>{name}</div>}
          variant="filled"
          size="small"
          css={{
            color: color,
            borderColor: "black",
            backgroundColor: alpha(color, 0.15),
          }}
        />
      ) : (
        <Chip
          label={<div>{name}</div>}
          variant="filled"
          size="small"
          css={{
            color: color,
            borderColor: "black",
            backgroundColor: alpha(color, 0.15),
          }}
          onClick={() => {
            navigate(`/bookmark/labels/${name}`);
          }}
        />
      )}
    </div>
  );
};
