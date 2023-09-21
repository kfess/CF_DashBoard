import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ReplayIcon from "@mui/icons-material/Replay";
import Tooltip from "@mui/material/Tooltip";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Input } from "@features/ui/component/Input";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { ProblemLabelForm } from "@features/bookmark/problemLabel";
import { ColorPalette } from "@features/color/components/ColorPalette";
import {
  HexaColor,
  generateRandomHexaColor,
  generateHighContrastColor,
  isValidHexaColor,
} from "@features/color/labelColor";
import { IconButton } from "@features/ui/component/IconButton";

type Props = {
  control: Control<ProblemLabelForm>;
  errors: FieldErrors<ProblemLabelForm>;
};

export const Color: React.FC<Props> = ({ control, errors }) => {
  return (
    <Controller
      name="color"
      control={control}
      render={({ field }) => (
        <Box>
          <Box
            component="label"
            display="block"
            htmlFor="generate-color-input"
            fontWeight="bold"
            mb={0.5}
          >
            Generate Color
          </Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
              icon={<ReplayIcon />}
              aria-label="generate"
              onClick={() => {
                // field.onChange(generateRandomHexaColor());
                field.onChange(generateHighContrastColor());
              }}
              size="small"
              sx={{
                borderRadius: "6px",
                backgroundColor: isValidHexaColor(field.value)
                  ? field.value
                  : "#000000",
                "&:hover": {
                  backgroundColor: isValidHexaColor(field.value)
                    ? field.value
                    : "#000000",
                },
                color: "white",
              }}
            />
            <Tooltip
              title={<ColorPalette setColor={field.onChange} />}
              arrow
              leaveDelay={300} // ms
            >
              <Box sx={{ flexGrow: 1, width: "100%" }}>
                <Input
                  value={field.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    field.onChange(event.target.value as HexaColor)
                  }
                  css={{
                    "& .MuiInputBase-root": {
                      color: isValidHexaColor(field.value)
                        ? field.value
                        : "#000000",
                    },
                  }}
                />
              </Box>
            </Tooltip>
          </Stack>
          <ErrorMessage message={errors.color?.message} />
        </Box>
      )}
    />
  );
};
