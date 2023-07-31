import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ReplayIcon from "@mui/icons-material/Replay";
import Tooltip from "@mui/material/Tooltip";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Input } from "@features/ui/component/Input";
import { FormControl } from "@features/ui/component/FormControl";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { ProblemLabelForm } from "../problemLabel";
import { ColorPalette } from "@features/color/components/ColorPalette";
import {
  HexaColor,
  generateRandomHexaColor,
  isValidHexaColor,
} from "@features/color/labelColor";

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
        <FormControl>
          <label
            htmlFor="color-input"
            css={{ fontWeight: "bold", paddingBottom: "0.3rem" }}
          >
            Generate Color
          </label>
          <Stack direction="row" alignItems="center">
            <IconButton
              aria-label="generate"
              onClick={() => {
                field.onChange(generateRandomHexaColor());
              }}
            >
              <ReplayIcon
                fontSize="inherit"
                css={{
                  color: isValidHexaColor(field.value)
                    ? field.value
                    : "#000000",
                }}
              />
            </IconButton>

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
        </FormControl>
      )}
    ></Controller>
  );
};
