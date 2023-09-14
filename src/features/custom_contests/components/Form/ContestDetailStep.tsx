import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { alpha } from "@mui/material";
import { Chip } from "@features/ui/component/Chip";
import { Visibility } from "@features/custom_contests/components/Form/Visibility";
import { Mode } from "@features/custom_contests/components/Form/Mode";
import { Title } from "@features/custom_contests/components/Form/Title";
import { Description } from "@features/custom_contests/components/Form/Description";
import { Date } from "@features/custom_contests/components/Form/Date";
import { Penalty } from "@features/custom_contests/components/Form/Penalty";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { Control, FieldErrors } from "react-hook-form";
import { Button } from "@features/ui/component/Button";

type Props = {
  setActiveStep(step: number): void;
  codeforcesUsername?: string;
  watchedVisibility: string;
  watchedMode: string;
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
};

export const ContestDetailStep: React.FC<Props> = ({
  setActiveStep,
  codeforcesUsername,
  watchedVisibility,
  watchedMode,
  control,
  errors,
}) => {
  return (
    <Box pb={{ xs: 2, md: 4 }}>
      <Box sx={{ px: { xs: 1, md: 4 }, py: 3 }}>
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Stack direction="row" flexWrap="wrap" flexGrow={1} gap={1}>
              <Chip
                label={`Scope: ${watchedVisibility}`}
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  backgroundColor: alpha("#9246FF", 0.15),
                }}
              />
              <Chip
                label={`Type: ${watchedMode}`}
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  backgroundColor: alpha("#9246FF", 0.15),
                }}
              />
              <Chip
                label={`Hosted By: ${codeforcesUsername}`}
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  backgroundColor: alpha("#9246FF", 0.15),
                }}
              />
            </Stack>
            <Box ml={2}>
              <Button size="small" color="secondary">
                Change User
              </Button>
            </Box>
          </Stack>
        </Box>
        <Stack spacing={2}>
          <Title control={control} errors={errors} />
          <Description control={control} errors={errors} />
          <Date control={control} errors={errors} />
          <Visibility control={control} errors={errors} />
          <Penalty control={control} errors={errors} />
          <Mode control={control} errors={errors} />
        </Stack>
      </Box>
      <Stack direction="row" mt={2} mr={2} justifyContent="flex-end">
        <Button
          onClick={() => setActiveStep(1)}
          color="secondary"
          endIcon={<KeyboardDoubleArrowRightIcon />}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
};
