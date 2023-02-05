import React, { Dispatch, SetStateAction, useState } from "react";
import { useRecoilState } from "recoil";
import { z } from "zod";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
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

type NameProps = {
  value: string;
  errorMsg: string;
};

type DescriptionProps = {
  value: string | undefined;
  errorMsg: string;
};

type Props = {
  id: number;
  name: NameProps;
  setName: (name: NameProps) => void;
  description: DescriptionProps;
  setDescription: Dispatch<SetStateAction<DescriptionProps>>;
  color: HexaColor;
  setColor: (color: HexaColor) => void;
  showBlock: boolean;
  toggleShowBlock: () => void;
};

export const LabelEditor: React.FC<Props> = (props: Props) => {
  const {
    id,
    name,
    setName,
    description,
    setDescription,
    color,
    setColor,
    showBlock,
    toggleShowBlock,
  } = props;

  const [labels, setLabels] = useRecoilState(labelsState);

  const editLabel = () => {
    try {
      setLabels((oldLabels) => [
        ...oldLabels,
        labelStateSchema.parse({
          id: id,
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
    toggleShowBlock();
  };

  return (
    <>
      <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}></Box>
      {showBlock && (
        <>
          <Box sx={{ display: "flex" }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              <Box sx={{ p: 1 }}>
                <InputLabel css={{ fontWeight: "bold" }}>Label Name</InputLabel>
                <TextField
                  label="label name"
                  size="small"
                  defaultValue={name.value}
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
                  defaultValue={description.value}
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
              >
                Cancel
              </Button>
              <Button
                onClick={editLabel}
                disabled={name.value.length === 0}
                variant="contained"
                color="success"
                size="small"
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
