import React from "react";
import { css } from "@emotion/react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import StarIcon from "@mui/icons-material/Star";
import { ColoredCircle } from "@features/color/components/ColoredCircle";
import { useIndexedDBForProblemLabel } from "../hooks/useProblemLabels";

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

export const AddLabelButton: React.FC<Props> = ({
  contestId,
  contestName,
  index,
  name,
}) => {
  const { allLabels, addProblemToLabel } = useIndexedDBForProblemLabel();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div css={circleCss} id="label-button" onClick={handleClick}>
        <StarIcon fontSize="inherit" />
      </div>
      {allLabels && allLabels.length > 0 && (
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
          {allLabels.map((label) => (
            <MenuItem
              key={label.id}
              onClick={() => {
                addProblemToLabel(label.id as number, {
                  contestId,
                  contestName,
                  index,
                  name,
                });
                setAnchorEl(null);
              }}
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
