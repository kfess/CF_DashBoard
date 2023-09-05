import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material";
import { Chip } from "@features/ui/component/Chip";
import { Visibility } from "@features/custom_contests/components/Form/Visibility";
import { Mode } from "@features/custom_contests/components/Form/Mode";
import { Title } from "@features/custom_contests/components/Form/Title";
import { Description } from "@features/custom_contests/components/Form/Description";
import { ContestDate } from "@features/custom_contests/components/Form/ContestDate";
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

export const _ContestDetailStep: React.FC<Props> = ({
  setActiveStep,
  codeforcesUsername,
  watchedVisibility,
  watchedMode,
  control,
  errors,
}) => {
  return (
    <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }}>
      <Box
        sx={{
          px: { xs: 2, md: 4 },
          py: 3,
          backgroundColor: (theme) => theme.palette.background.paper,
          border: (theme) => `0.5px solid ${theme.palette.divider}`,
          borderRadius: 3,
        }}
      >
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
        <Stack>
          <Title control={control} errors={errors} />
          <Description control={control} errors={errors} />
          <ContestDate control={control} errors={errors} />
          <Visibility control={control} errors={errors} />
          <Penalty control={control} errors={errors} />
          <Mode control={control} errors={errors} />
        </Stack>
      </Box>
      <Stack direction="row" mt={2} mr={2} justifyContent="flex-end">
        <Button onClick={() => setActiveStep(1)} color="secondary">
          Next
        </Button>
      </Stack>
    </Box>
  );
};
