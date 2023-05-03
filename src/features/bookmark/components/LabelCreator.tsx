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
        <Box
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "6px",
            backgroundColor: "white",
            p: 1,
          }}
        >
          <LabelNameChip
            name={name.value}
            color={isValidHexaColor(color) ? color : "#000000"}
            mode="Preview"
          />
          <Box component="form" autoComplete="off">
            <Stack
              direction={{ xs: "column", sm: "row", md: "row" }}
              sx={{ width: "100%", margin: "0 -8px" }}
            >
              <Box sx={{ p: 1, flexGrow: 1, width: "100%" }}>
                <InputLabel
                  css={{ paddingBottom: "0.3rem", fontWeight: "bold" }}
                >
                  Label Name
                </InputLabel>
                <Input
                  value={name.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setName({ value: event.target.value, errorMsg: "" })
                  }
                  placeholder="label name"
                />
              </Box>
              <Box sx={{ p: 1, flexGrow: 1, width: "100%" }}>
                <InputLabel
                  css={{ paddingBottom: "0.3rem", fontWeight: "bold" }}
                >
                  Description
                </InputLabel>
                <Input
                  value={description.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setDescription({ value: event.target.value, errorMsg: "" })
                  }
                  placeholder="description (optional)"
                />
              </Box>
              <Box
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  width: "100%",
                }}
              >
                <InputLabel
                  css={{ paddingBottom: "0.3rem", fontWeight: "bold" }}
                >
                  Generate Color
                </InputLabel>
                <Box sx={{ display: "flex", alignItems: "center" }}>
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
                  <Box sx={{ flexGrow: 1, width: "100%" }}>
                    <Tooltip
                      title={<ColorPalette setColor={setColor} />}
                      arrow
                      leaveDelay={300} // ms
                    >
                      <Input
                        value={color}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => setColor(event.target.value as HexaColor)}
                        css={{
                          "& .MuiInputBase-root": {
                            color: isValidHexaColor(color) ? color : "#000000",
                          },
                        }}
                      />
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Box>
          <Box
            sx={{
              p: 1,
              display: "flex",
              justifyContent: "flex-end",
              flexWrap: { xs: "wrap", sm: "nowrap" },
            }}
          >
            <Button onClick={toggleShowBlock}>Cancel</Button>
            <Button
              onClick={onClickCreateLabel}
              disabled={name.value.length === 0 || !isValidHexaColor(color)}
            >
              Create Label
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};
