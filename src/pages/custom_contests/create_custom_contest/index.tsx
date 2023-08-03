import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { HeadLine } from "@features/layout/components/HeadLine";
import { CreateContest } from "@features/custom_contests/components/Form/CreateContest";
import { _CreateContest } from "@features/custom_contests/components/Form/_CreateContest";

export const CreateCustomContestPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box>
        <HeadLine title="Create Custom Contest" />
        <Grid container spacing={2}>
          <Grid xs={12}>
            {/* <CreateContest /> */}
            <_CreateContest />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
