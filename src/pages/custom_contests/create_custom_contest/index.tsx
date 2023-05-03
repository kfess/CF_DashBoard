import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { HeadLine } from "@features/layout/components/HeadLine";
import { CreateContest } from "@features/custom_contests/components/Form/CreateContest";

export const CreateCustomContestPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
        <HeadLine title="Create Custom Contest" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CreateContest />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
