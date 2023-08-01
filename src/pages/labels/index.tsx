import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { HeadLine } from "@features/layout/components/HeadLine";
import type { TabItem } from "@features/ui/component/Tabs";
import { Tabs } from "@features/ui/component/Tabs";
import { Creator as ProblemLabelCreator } from "@features/bookmark/components/problem/Creator";
import { LabelsTable as ProblemLabelsTable } from "@features/bookmark/components/problem/LabelsTable";
import { Creator as ContestLabelCreator } from "@features/bookmark/components/contest/Creator";
import { LabelsTable as ContestLabelsTable } from "@features/bookmark/components/contest/LabelsTable";

export const LabelsPage: React.FC = () => {
  const tabItems: TabItem[] = [
    {
      label: "Problem Labels",
      children: (
        <>
          <ProblemLabelCreator />
          <ProblemLabelsTable />
        </>
      ),
      disabled: false,
    },
    {
      label: "Contest Labels",
      children: (
        <>
          <ContestLabelCreator />
          <ContestLabelsTable />
        </>
      ),
      disabled: false,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
        <HeadLine title="Labels" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Tabs tabItems={tabItems} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
