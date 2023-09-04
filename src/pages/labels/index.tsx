import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { HeadLine } from "@features/layout/components/HeadLine";
import { Creator as ProblemLabelCreator } from "@features/bookmark/components/problem/Creator";
import { LabelsTable as ProblemLabelsTable } from "@features/bookmark/components/problem/LabelsTable";
import { Creator as ContestLabelCreator } from "@features/bookmark/components/contest/Creator";
import { LabelsTable as ContestLabelsTable } from "@features/bookmark/components/contest/LabelsTable";
import { TabPanel, Tabs, Tab } from "@features/ui/component/Tabs";

export const LabelsPage: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
        <HeadLine title="Labels" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="Problems and Standings Tabs"
            >
              <Tab value={0} label="Problem Labels" />
              <Tab value={1} label="Contest Labels" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <ProblemLabelCreator />
              <ProblemLabelsTable />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <ContestLabelCreator />
              <ContestLabelsTable />
            </TabPanel>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
