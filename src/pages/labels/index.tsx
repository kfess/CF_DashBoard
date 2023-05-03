import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import type { TabItem } from "@features/ui/component/Tabs";
import { Tabs } from "@features/ui/component/Tabs";
import { LabelCreator } from "@features/bookmark/components/LabelCreator";
import { LabelsTable } from "@features/bookmark/components/LabelsTable";
import { HeadLine } from "@features/layout/components/HeadLine";

export const LabelsPage: React.FC = () => {
  const tabItems: TabItem[] = [
    {
      label: "Problem Labels",
      children: (
        <>
          <LabelCreator />
          <LabelsTable />
        </>
      ),
      disabled: false,
    },
    { label: "Contest Labels", children: <></>, disabled: false },
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
