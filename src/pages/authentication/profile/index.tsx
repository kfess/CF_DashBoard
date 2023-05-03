import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Profile } from "@features/authentication/components/Profile";

export const ProfilePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Profile />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
