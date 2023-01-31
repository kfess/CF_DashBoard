import React, { Dispatch, SetStateAction, useState } from "react";
import { useRecoilState } from "recoil";
import { alpha } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import ReplayIcon from "@mui/icons-material/Replay";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import { labelsState } from "@features/bookmark/label.atom";
import { HexaColor, generateRandomHexaColor } from "@features/color/labelColor";

export const LabelCreator: React.FC = () => {
  const [labels, setLabels] = useRecoilState(labelsState);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(generateRandomHexaColor());
  const [showBlock, setShowBlock] = useState<boolean>(true);

  const nextId =
    labels.length > 0 ? Math.max(...labels.map((label) => label.id)) + 1 : 0;

  const addLabel = () => {
    setLabels((oldLabels) => [
      ...oldLabels,
      {
        id: nextId,
        name: name,
        description: description,
        color: color,
        problems: [],
      },
    ]);
  };

  return (
    <>
      <div css={{ textAlign: "right" }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setShowBlock(!showBlock);
          }}
        >
          New Label
        </Button>
      </div>
      {showBlock && (
        <Box>
          <div css={{ textAlign: "left", marginBottom: "10px" }}>
            <Chip
              label={<div>Label Preview</div>}
              variant="filled"
              size="small"
              css={{
                color: color,
                borderColor: "black",
                backgroundColor: alpha(color, 0.15),
              }}
            />
          </div>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <div>
              <InputLabel>Label Name</InputLabel>
              <TextField
                label="label name"
                size="small"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setName(event.target.value)
                }
              />
            </div>
            <div>
              <InputLabel>Description</InputLabel>
              <TextField
                label="Description (Optional)"
                size="small"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setDescription(event.target.value)
                }
              />
            </div>
            <div>
              <InputLabel>Generate Color</InputLabel>
              <IconButton
                aria-label="generate"
                onClick={() => {
                  setColor(generateRandomHexaColor());
                }}
              >
                <ReplayIcon fontSize="inherit" css={{ color: color }} />
              </IconButton>
              <Tooltip
                title={<ColorPalette setColor={setColor} />}
                arrow
                leaveDelay={500} // ms
              >
                <TextField
                  label="Color"
                  size="small"
                  value={color}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setColor(event.target.value as HexaColor)
                  }
                  sx={{
                    "& .MuiInputBase-root": {
                      color: color,
                    },
                  }}
                />
              </Tooltip>
            </div>
          </Stack>
          <div css={{ textAlign: "right" }}>
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                setShowBlock(!showBlock);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="success" onClick={addLabel}>
              Create Label
            </Button>
          </div>
        </Box>
      )}
    </>
  );
};

type Props = {
  setColor: Dispatch<SetStateAction<HexaColor>>;
};

const vividColors = [
  "#FF0000",
  "#FFA500",
  "#FFD700",
  "#008000",
  "#008B8B",
  "#4169E1",
  "#0000FF",
  "#8A2BE2",
];

const paleColors = [
  "#FFB6C1",
  "#FFDEAD",
  "#F0E68C",
  "#9ACD32",
  "#3CB371",
  "#6495ED",
  "#4169E1",
  "#9370DB",
];

const ColorPalette: React.FC<Props> = (props: Props) => {
  const { setColor } = props;

  return (
    <>
      <div css={{ marginBottom: "0.3rem" }}>Choose from popular colors</div>
      {vividColors.map((c) => {
        return (
          <span
            key={c}
            css={{
              cursor: "pointer",
              marginRight: "0.1rem",
              marginLeft: "0.1rem",
            }}
          >
            <span
              onClick={() => {
                setColor(c as HexaColor);
              }}
              css={{
                display: "inline-block",
                width: "1.2rem",
                height: "1.2rem",
                borderRadius: "100%",
                backgroundColor: c,
              }}
            ></span>
          </span>
        );
      })}
      <div></div>
      {paleColors.map((c) => {
        return (
          <span
            key={c}
            css={{
              cursor: "pointer",
              marginRight: "0.1rem",
              marginLeft: "0.1rem",
            }}
          >
            <span
              onClick={() => {
                setColor(c as HexaColor);
              }}
              css={{
                display: "inline-block",
                width: "1.2rem",
                height: "1.2rem",
                borderRadius: "100%",
                backgroundColor: c,
              }}
            ></span>
          </span>
        );
      })}
    </>
  );
};
