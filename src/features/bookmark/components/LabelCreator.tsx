import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
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
import { ColorPalette } from "@features/color/ColorPalette";
import { labelActions } from "@features/bookmark/labelActions";
import { useToggle } from "@hooks/index";

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
        <Button
          onClick={toggleShowBlock}
          variant="contained"
          color="primary"
          size="small"
          css={{ textTransform: "none" }}
        >
          New Label
        </Button>
      </Box>
      {showBlock && (
        <>
          <LabelNameChip
            name={name.value}
            color={isValidHexaColor(color) ? color : "#000000"}
            mode="Preview"
          />
          <Box component="form" autoComplete="off" sx={{ display: "flex" }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              <Box sx={{ p: 1 }}>
                <InputLabel css={{ fontWeight: "bold" }}>Label Name</InputLabel>
                <TextField
                  label="label name"
                  size="small"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setName({ value: event.target.value, errorMsg: "" })
                  }
                />
              </Box>
              <Box sx={{ p: 1 }}>
                <InputLabel css={{ fontWeight: "bold" }}>
                  Description
                </InputLabel>
                <TextField
                  label="Description (Optional)"
                  size="small"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setDescription({ value: event.target.value, errorMsg: "" })
                  }
                />
              </Box>
              <Box sx={{ p: 1 }}>
                <InputLabel css={{ fontWeight: "bold" }}>
                  Generate Color
                </InputLabel>
                <IconButton
                  aria-label="generate"
                  onClick={() => {
                    setColor(generateRandomHexaColor());
                  }}
                >
                  <ReplayIcon
                    fontSize="inherit"
                    css={{ color: isValidHexaColor(color) ? color : "#000000" }}
                  />
                </IconButton>
                <Tooltip
                  title={<ColorPalette setColor={setColor} />}
                  arrow
                  leaveDelay={300} // ms
                >
                  <TextField
                    label="Color"
                    size="small"
                    value={color}
                    inputProps={{
                      pattern: "#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})",
                      maxLength: "7",
                      autoComplete: false,
                    }}
                    helperText={
                      !isValidHexaColor(color) && "Invalid Color Code"
                    }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setColor(event.target.value as HexaColor)
                    }
                    sx={{
                      "& .MuiInputBase-root": {
                        color: isValidHexaColor(color) ? color : "#000000",
                      },
                    }}
                  />
                </Tooltip>
              </Box>
            </Stack>
          </Box>
          <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}>
            <ButtonGroup>
              <Button
                onClick={toggleShowBlock}
                variant="contained"
                color="secondary"
                size="small"
                css={{ textTransform: "none" }}
              >
                Cancel
              </Button>
              <Button
                onClick={onClickCreateLabel}
                disabled={name.value.length === 0 || !isValidHexaColor(color)}
                variant="contained"
                color="success"
                size="small"
                css={{ textTransform: "none" }}
              >
                Create Label
              </Button>
            </ButtonGroup>
          </Box>
        </>
      )}
    </>
  );
};
