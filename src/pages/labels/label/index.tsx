import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import { LabeledProblems } from "@features/bookmark/components/problem/LabeledProblems";
import { LabeledContests } from "@features/bookmark/components/contest/LabeledContests";
import { HeadLine } from "@features/layout/components/HeadLine";
import { Typography } from "@mui/material";
import { useIndexedDBForProblemLabel } from "@features/bookmark/hooks/useIndexedDBForProblemLabel";
import { useIndexedDBForContestLabel } from "@features/bookmark/hooks/useIndexedDBForContestLabel";

export const ProblemLabelPage: React.FC = () => {
  const { labelName } = useParams(); // path = /labels/:labelName
  const { fetchLabelAndProblemsByName } = useIndexedDBForProblemLabel();
  const label = fetchLabelAndProblemsByName(labelName ?? "");

  return (
    <Container maxWidth="lg">
      <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
        <HeadLine title={`${labelName}`} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {label && (
              <>
                <Paper
                  elevation={0}
                  sx={{
                    my: 2,
                    p: 2,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    borderLeft: `5px solid ${label.color}`,
                  }}
                >
                  <Typography variant="body1" color="text.main">
                    {label?.description || "No description provided."}
                  </Typography>
                </Paper>
                <LabeledProblems label={label} />
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export const ContestLabelPage: React.FC = () => {
  const { labelName } = useParams(); // path = /labels/:labelName
  const { fetchLabelAndContestsByName } = useIndexedDBForContestLabel();
  const label = fetchLabelAndContestsByName(labelName ?? "");

  return (
    <Container maxWidth="lg">
      <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
        <HeadLine title={`${labelName}`} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {label && (
              <>
                <Paper
                  elevation={0}
                  sx={{
                    my: 2,
                    p: 2,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    borderLeft: `5px solid ${label.color}`,
                  }}
                >
                  <Typography variant="body1" color="text.main">
                    {label?.description || "No description provided."}
                  </Typography>
                </Paper>
                <LabeledContests label={label} />
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
