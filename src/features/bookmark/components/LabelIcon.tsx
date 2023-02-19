import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { z } from "zod";
import { css } from "@emotion/react";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlined from "@mui/icons-material/StarBorderOutlined";
import { labelsState } from "@features/bookmark/label.atom";
import { labelStateSchema } from "@features/bookmark/label.atom";
import { ColoredCircle } from "@features/color/ColoredCircle";

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
  contestName: string;
  index: string;
  name: string;
};

export const LabelIcon: React.FC<Props> = (props: Props) => {
  const { contestId, contestName, index, name } = props;
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
    contestName: string,
    index: string,
    name: string,
    labelId: number
  ) => {
    try {
      const newProblem = { contestId, contestName, index, name };
      setLabels((oldLabels) =>
        oldLabels.map((label) => {
          if (label.id === labelId) {
            // this is ugly, Map is better
            const alreadyAdded =
              label.problems.filter(
                (p) =>
                  p.contestId === contestId &&
                  p.contestName === contestName &&
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
      {labels.length > 0 && (
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
              onClick={() =>
                addProblemToLabel(contestId, contestName, index, name, label.id)
              }
              css={{ display: "block" }}
            >
              <div>
                <ColoredCircle color={label.color} />
                {label.name}
              </div>
              <div css={{ fontSize: "13px" }}>{label.description}</div>
            </MenuItem>
          ))}
        </Menu>
      )}
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
        navigate("/labels");
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
    <Box sx={{ p: 1, textAlign: "left" }}>
      {mode === "Preview" ? (
        <Chip
          label={<div>{name.trim().length > 0 ? name : "Label Preview"}</div>}
          variant="filled"
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
          variant="filled"
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
