import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Divider, alpha } from "@mui/material";
import { Button } from "@features/ui/component/Button";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { Chip } from "@features/ui/component/Chip";
import { _ViewSelectedProblems } from "./_ViewSelectedProblems";

type Props = {
  setActiveStep(step: number): void;
  formData: CreateCustomContest;
};
export const _ViewStep: React.FC<Props> = ({ setActiveStep, formData }) => {
  return (
    <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            About Problems
          </Typography>
          <Box my={2}>
            <_ViewSelectedProblems problems={formData.problems} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
          <Box>
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
            <Typography variant="body2" gutterBottom noWrap>
              Title : {formData.title}
            </Typography>
            <Typography variant="body2" gutterBottom noWrap>
              Description : {formData.description || "No Description Provided"}
            </Typography>
            <Typography variant="body2" gutterBottom noWrap>
              Start : {formData.startDate}
            </Typography>
            <Typography variant="body2" gutterBottom noWrap>
              End : {formData.endDate}
            </Typography>
            <Divider light sx={{ mt: 2, mb: 0.5 }}>
              problems
            </Divider>
            <Typography variant="body2" gutterBottom noWrap>
              Penalty : {formData.penalty}
            </Typography>
            <Typography variant="body2" gutterBottom noWrap>
              Problems : {formData.problems.length}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Stack
        direction="row"
        mt={2}
        mr={2}
        spacing={1}
        justifyContent="flex-end"
      >
        <Button onClick={() => setActiveStep(1)} color="secondary">
          Previous
        </Button>
        <Button type="submit">Create Contest</Button>
      </Stack>
    </Box>
  );
};
