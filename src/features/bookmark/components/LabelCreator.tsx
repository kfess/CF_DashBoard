import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Button } from "@features/ui/component/Button";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import ReplayIcon from "@mui/icons-material/Replay";
import Tooltip from "@mui/material/Tooltip";
import {
  HexaColor,
  generateRandomHexaColor,
  isValidHexaColor,
} from "@features/color/labelColor";
import { LabelNameChip } from "./LabelIcon";
import { ColorPalette } from "@features/color/components/ColorPalette";
import { labelActions } from "@features/bookmark/labelActions";
import { useToggle } from "@hooks/index";
import { Input } from "@features/ui/component/Input";

export const LabelCreator: React.FC = () => {
  const [showBlock, toggleShowBlock] = useToggle(false, true);
  const [name, setName] = useState({ value: "", errorMsg: "" });
  const [description, setDescription] = useState({ value: "", errorMsg: "" });
  const [color, setColor] = useState(generateRandomHexaColor());

  const resetInput = () => {
    setName({ value: "", errorMsg: "" });
    setDescription({ value: "", errorMsg: "" });
    setColor(generateRandomHexaColor());
  };

  const addLabel = labelActions.useAddLabel();
  const onClickCreateLabel = () => {
    addLabel(name.value, color, description.value);
    toggleShowBlock();
    resetInput();
  };

  return (
    <>
      <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={toggleShowBlock}>New Label</Button>
      </Box>
      {showBlock && (
        <Stack
          spacing={0.5}
          padding={2}
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: "4px",
            backgroundColor: "white",
          }}
        >
          <LabelNameChip
            name={name.value}
            color={isValidHexaColor(color) ? color : "#000000"}
            mode="Preview"
          />
          <Stack direction={{ xs: "column", sm: "row", md: "row" }} spacing={2}>
            <div>
              <InputLabel>Label Name</InputLabel>
              <Input
                value={name.value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setName({ value: event.target.value, errorMsg: "" })
                }
                placeholder="label name"
              />
            </div>

            <div>
              <InputLabel>Description</InputLabel>
              <Input
                value={description.value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setDescription({ value: event.target.value, errorMsg: "" })
                }
                placeholder="description (optional)"
              />
            </div>

            <div>
              <InputLabel>Generate Color</InputLabel>
              <Stack direction="row" alignItems="center">
                <IconButton
                  aria-label="generate"
                  onClick={() => {
                    setColor(generateRandomHexaColor());
                  }}
                >
                  <ReplayIcon
                    fontSize="inherit"
                    css={{
                      color: isValidHexaColor(color) ? color : "#000000",
                    }}
                  />
                </IconButton>

                <Tooltip
                  title={<ColorPalette setColor={setColor} />}
                  arrow
                  leaveDelay={300} // ms
                >
                  <Box sx={{ flexGrow: 1, width: "100%" }}>
                    <Input
                      value={color}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setColor(event.target.value as HexaColor)
                      }
                      css={{
                        "& .MuiInputBase-root": {
                          color: isValidHexaColor(color) ? color : "#000000",
                        },
                      }}
                    />
                  </Box>
                </Tooltip>
              </Stack>
            </div>
          </Stack>
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            <Button onClick={toggleShowBlock}>Cancel</Button>
            <Button
              onClick={onClickCreateLabel}
              disabled={name.value.length === 0 || !isValidHexaColor(color)}
            >
              Create Label
            </Button>
          </Stack>
        </Stack>
      )}
    </>
  );
};
