import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Divider, alpha } from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Button } from "@features/ui/component/Button";
import type { CreateCustomContest } from "@features/custom_contests/customContest";
import { Chip } from "@features/ui/component/Chip";
import { SelectedProblemsTable } from "@features/custom_contests/components/Form/SelectedProblemsTable";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import dayjs from "dayjs";

type Props = {
  setActiveStep(step: number): void;
  formData: CreateCustomContest;
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
};
export const ViewStep: React.FC<Props> = ({
  setActiveStep,
  formData,
  control,
  errors,
}) => {
  return (
    <Box pt={3} pb={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }} pr={0.5}>
          <Typography variant="h6" fontWeight="bold">
            About Problems
          </Typography>
          <Box my={2}>
            <Controller
              name="problems"
              control={control}
              render={({ field }) => (
                <SelectedProblemsTable isEdit={false} field={field} />
              )}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            About this Contest
          </Typography>
          <Stack direction="row" flexWrap="wrap" flexGrow={1} gap={1} my={2}>
            <Chip
              label={`Scope: ${formData.visibility}`}
              sx={{
                color: (theme) => theme.palette.primary.main,
                backgroundColor: alpha("#9246FF", 0.15),
              }}
            />
            <Chip
              label={`Type: ${formData.mode}`}
              sx={{
                color: (theme) => theme.palette.primary.main,
                backgroundColor: alpha("#9246FF", 0.15),
              }}
            />
            <Chip
              label={`Hosted By: ${formData.owner}`}
              sx={{
                color: (theme) => theme.palette.primary.main,
                backgroundColor: alpha("#9246FF", 0.15),
              }}
            />
          </Stack>
          <Divider light sx={{ mb: 0.5 }}>
            Details
          </Divider>
          <Typography
            variant="body2"
            gutterBottom
            noWrap
            color="text.secondary"
          >
            Title : {formData.title}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            noWrap
            color="text.secondary"
          >
            Description : {formData.description || "No Description Provided"}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            noWrap
            color="text.secondary"
          >
            Start :{" "}
            {dayjs(formData.startDate).local().format("YYYY-MM-DD HH:mm")}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            noWrap
            color="text.secondary"
          >
            End : {dayjs(formData.endDate).local().format("YYYY-MM-DD HH:mm")}
          </Typography>
          <Divider light sx={{ mt: 2, mb: 0.5 }}>
            problems
          </Divider>
          <Typography
            variant="body2"
            gutterBottom
            noWrap
            color="text.secondary"
          >
            Penalty : {formData.penalty} seconds
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            noWrap
            color="text.secondary"
          >
            Problems : {formData.problems.length}
          </Typography>
          <Divider light sx={{ mt: 2, mb: 1 }}>
            Expected Users
          </Divider>
          {formData.problemsFilter.expectedParticipants.length > 0 &&
            formData.problemsFilter.expectedParticipants.map((participant) => (
              <Typography
                variant="body2"
                gutterBottom
                noWrap
                color="text.secondary"
              >
                {participant.name}
              </Typography>
            ))}
          {formData.problemsFilter.expectedParticipants.length === 0 && (
            <Typography
              variant="body2"
              gutterBottom
              noWrap
              color="text.secondary"
            >
              No users specified
            </Typography>
          )}
          <Divider light sx={{ mt: 2, mb: 0.5 }}>
            Related Tags
          </Divider>
          <Typography
            variant="body2"
            gutterBottom
            noWrap
            color="text.secondary"
          >
            No tags specified
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      {Object.keys(errors).length > 0 &&
        Object.keys(errors).map((key) => (
          <ErrorMessage
            key={key}
            message={errors[key as keyof CreateCustomContest]?.message}
          />
        ))}
      <Stack
        direction="row"
        mt={2}
        mr={2}
        spacing={1}
        justifyContent="flex-end"
      >
        <Button
          onClick={() => setActiveStep(1)}
          color="secondary"
          startIcon={<KeyboardDoubleArrowLeftIcon />}
        >
          Back
        </Button>
        <Button type="submit">Create Contest</Button>
      </Stack>
    </Box>
  );
};
