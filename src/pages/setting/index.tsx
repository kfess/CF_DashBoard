import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { HeadLine } from "@features/layout/components/HeadLine";
import { TimeZone } from "@features/setting/components/TimeZone";
import { RemoveIndexedDB } from "@features/setting/components/RemoveIndexedDB";

export const SettingPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box py={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
        <HeadLine title={`General Setting`} />
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <TimeZone />
            <RemoveIndexedDB />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
