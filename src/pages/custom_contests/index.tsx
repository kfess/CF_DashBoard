import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import { _Button } from "@features/ui/component/Button";
import type { TabItem } from "@features/ui/component/Tabs";
import { Tabs } from "@features/ui/component/Tabs";
import { createdContestTypes } from "@features/custom_contests/customContest";
import { PublicContestTable } from "@features/custom_contests/components/PublicContestTable";
import { MyContestTable } from "@features/custom_contests/components/MyContestTable";
import { NavLink } from "react-router-dom";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";
import { AlertMessage } from "@features/ui/component/AlertDialog";
import { HeadLine } from "@features/layout/components/HeadLine";

export const CustomContestPage: React.FC = () => {
  const { loggedIn } = useLoggedIn();

  const tabItems: TabItem[] = [
    ...createdContestTypes.map((contestType) => {
      return {
        label: contestType,
        children: <PublicContestTable contestType={contestType} />,
        disabled: false,
      };
    }),
    {
      label: "MyContest",
      children: <MyContestTable />,
      disabled: !loggedIn,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
        <HeadLine title="Custom Contest" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box py={1.5} display="flex" justifyContent="flex-end">
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
            <Tabs tabItems={tabItems} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
