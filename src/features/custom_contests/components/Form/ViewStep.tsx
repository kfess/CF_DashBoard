import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Divider, alpha } from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import NotesIcon from "@mui/icons-material/Notes";
import DescriptionIcon from "@mui/icons-material/Description";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ReportIcon from "@mui/icons-material/Report";
import QuizIcon from "@mui/icons-material/Quiz";
import { Control, FieldErrors } from "react-hook-form";
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
            <SelectedProblemsTable isEdit={false} formData={formData} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            About Contest
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
          <Stack direction="column" spacing={1}>
            <Stack
              direction="row"
              alignContent="center"
              color="text.secondary"
              spacing={0.5}
            >
              <NotesIcon fontSize="small" />
              <Typography variant="body2" gutterBottom noWrap>
                Title : {formData.title}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignContent="center"
              color="text.secondary"
              spacing={0.5}
            >
              <DescriptionIcon fontSize="small" />
              <Typography variant="body2" gutterBottom noWrap>
                Description :{" "}
                {formData.description || "No Description Provided"}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignContent="center"
              color="text.secondary"
              spacing={0.5}
            >
              <ScheduleIcon fontSize="small" />
              <Typography variant="body2" gutterBottom noWrap>
                Start :{" "}
                {dayjs(formData.startDate).local().format("YYYY-MM-DD HH:mm")}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignContent="center"
              color="text.secondary"
              spacing={0.5}
            >
              <ScheduleIcon fontSize="small" />
              <Typography variant="body2" gutterBottom noWrap>
                End :{" "}
                {dayjs(formData.endDate).local().format("YYYY-MM-DD HH:mm")}
              </Typography>
            </Stack>
          </Stack>
          <Divider light sx={{ mt: 2, mb: 0.5 }}>
            problems
          </Divider>
          <Stack direction="column" spacing={1}>
            <Stack
              direction="row"
              alignContent="center"
              color="text.secondary"
              spacing={0.5}
            >
              <ReportIcon fontSize="small" />
              <Typography variant="body2" gutterBottom noWrap>
                Penalty : {formData.penalty} seconds
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignContent="center"
              color="text.secondary"
              spacing={0.5}
            >
              <QuizIcon fontSize="small" />
              <Typography variant="body2" gutterBottom noWrap>
                Problems : {formData.problems.length}
              </Typography>
            </Stack>
          </Stack>
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
