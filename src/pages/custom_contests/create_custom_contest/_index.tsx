import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SubNavigation } from "@features/ui/component/SubNavigation";
import { HeadLine } from "@features/layout/components/HeadLine";
import { CreateContest } from "@features/custom_contests/components/Form/CreateContest";

export const CreateCustomContestPage: React.FC = () => {
  return (
    <>
      <SubNavigation
        message={
          <Typography variant="h6">Create your own custom contest.</Typography>
        }
        py={1.5}
        textAlign="center"
        sx={{
          color: "info.contrastText",
          backgroundColor: "primary.main",
        }}
      />
      <Container maxWidth="lg">
        <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }}>
          <HeadLine title="Create Custom Contest" />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CreateContest />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
