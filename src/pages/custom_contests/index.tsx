import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { _Button } from "@features/ui/component/Button";
import { createdContestTypes } from "@features/custom_contests/customContest";
import { PublicContestTable } from "@features/custom_contests/components/PublicContestTable";
import { MyContestTable } from "@features/custom_contests/components/MyContestTable";
import { NavLink } from "react-router-dom";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";
import { AlertMessage } from "@features/ui/component/AlertDialog";
import { HeadLine } from "@features/layout/components/HeadLine";
import { TabPanel, Tabs, Tab } from "@features/ui/component/Tabs";

export const CustomContestPage: React.FC = () => {
  const { loggedIn } = useLoggedIn();

  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
        <HeadLine title="Custom Contest" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box py={1} display="flex" justifyContent="flex-end">
              <NavLink to={loggedIn ? "/custom-contest/create" : "#"}>
                <_Button color="#9246FF" disabled={!loggedIn}>
                  Create New Contest
                </_Button>
              </NavLink>
            </Box>
            {!loggedIn && (
              <AlertMessage
                title=""
                message="To create a new Contest, You need to be logged in."
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              addScrollButtons={true}
              aria-label="Problems and Standings Tabs"
            >
              {createdContestTypes.map((contestType, index) => {
                return (
                  <Tab key={contestType} value={index} label={contestType} />
                );
              })}
              <Tab value={3} label="My Contest" disabled={!loggedIn} />
            </Tabs>
            {createdContestTypes.map((contestType, index) => {
              return (
                <TabPanel key={contestType} value={tabValue} index={index}>
                  <PublicContestTable contestType={contestType} />
                </TabPanel>
              );
            })}
            <TabPanel value={tabValue} index={3}>
              <MyContestTable />
            </TabPanel>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
