import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { z } from "zod";
import { css } from "@emotion/react";
import { alpha } from "@mui/material";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlined from "@mui/icons-material/StarBorderOutlined";
import { labelsState } from "@features/bookmark/label.atom";
import { labelStateSchema } from "@features/bookmark/label.atom";

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

type Props = {
  contestId: number;
  index: string;
  name: string;
};

export const LabelIcon: React.FC<Props> = (props: Props) => {
  const { contestId, index, name } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [labels, setLabels] = useRecoilState(labelsState);

  const addProblemToLabel = (
    contestId: number,
    index: string,
    name: string,
    labelId: number
  ) => {
    try {
      const newProblem = { contestId, index, name };
      setLabels((oldLabels) =>
        oldLabels.map((label) => {
          if (label.id === labelId) {
            // this is ugly, Map is better
            const alreadyAdded =
              label.problems.filter(
                (p) =>
                  p.contestId === contestId &&
                  p.index === index &&
                  p.name === name
              ).length > 0;

            return labelStateSchema.parse({
              ...label,
              problems: alreadyAdded
                ? [...label.problems]
                : [...label.problems, newProblem],
            });
          } else {
            return labelStateSchema.parse(label);
          }
        })
      );
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err);
      }
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <div css={circleCss} id="label-button" onClick={handleClick}>
        <StarIcon fontSize="inherit" />
      </div>
      <Menu
        open={open}
        onClose={handleClose}
        id="label-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {labels.map((label) => (
          <MenuItem
            key={label.id}
            onClick={() => addProblemToLabel(contestId, index, name, label.id)}
            css={{ display: "block" }}
          >
            <div>
              <span
                css={{
                  borderRadius: "50%",
                  display: "inline-block",
                  paddingTop: "10px",
                  paddingLeft: "10px",
                  marginRight: "5px",
                  backgroundColor: label.color,
                }}
              ></span>
              {label.name}
            </div>
            <div css={{ fontSize: "13px" }}>{label.description}</div>
          </MenuItem>
        ))}
      </Menu>
    </div>
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
