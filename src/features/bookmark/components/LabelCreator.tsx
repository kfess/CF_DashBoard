import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { z } from "zod";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import ReplayIcon from "@mui/icons-material/Replay";
import Tooltip from "@mui/material/Tooltip";
import { labelsState } from "@features/bookmark/label.atom";
import { HexaColor, generateRandomHexaColor } from "@features/color/labelColor";
import { labelStateSchema } from "@features/bookmark/label.atom";
import { LabelNameChip } from "./LabelIcon";
import { ColorPalette } from "@features/color/ColorPalette";

export const LabelCreator: React.FC = () => {
  const [labels, setLabels] = useRecoilState(labelsState);
  const [name, setName] = useState({ value: "", errorMsg: "" });
  const [description, setDescription] = useState({ value: "", errorMsg: "" });
  const [color, setColor] = useState(generateRandomHexaColor());
  const [showBlock, setShowBlock] = useState<boolean>(true);

  const nextId =
    labels.length > 0 ? Math.max(...labels.map((label) => label.id)) + 1 : 0;

  const resetInput = () => {
    setName({ value: "", errorMsg: "" });
    setDescription({ value: "", errorMsg: "" });
    setColor(generateRandomHexaColor());
  };

  const addLabel = () => {
    try {
      setLabels((oldLabels) => [
        ...oldLabels,
        labelStateSchema.parse({
          id: nextId,
          name: name.value,
          description: description.value,
          color: color,
          problems: [],
        }),
      ]);
    } catch (err) {
      if (err instanceof z.ZodError) {
      }
    }
    setShowBlock(false);
    resetInput();
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
          <LabelNameChip
            name={name.value.trim() ? name.value : "Label Preview"}
            color={color}
            mode="Preview"
          />
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
                  setName({ value: event.target.value, errorMsg: "" })
                }
              />
            </div>
            <div>
              <InputLabel>Description</InputLabel>
              <TextField
                label="Description (Optional)"
                size="small"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setDescription({ value: event.target.value, errorMsg: "" })
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
            <Button
              variant="contained"
              color="success"
              onClick={addLabel}
              disabled={name.value.length === 0}
            >
              Create Label
            </Button>
          </div>
        </Box>
      )}
    </>
  );
};
