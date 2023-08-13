import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { RecentSubmissionPage } from "@pages/submission/recent";
import { UserSubmissionPage } from "@pages/submission/user/index";
import { TabItem, Tabs } from "@features/ui/component/Tabs";
import { HeadLine } from "@features/layout/components/HeadLine";
import { useUserProfile } from "@features/authentication/hooks/useUserProfile";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";
import { useURLQuery } from "@hooks/useQueryParams";

export const SubmissionPage: React.FC = () => {
  const { queryParams } = useURLQuery();
  const userId = queryParams["userId"];

  const { loggedIn } = useLoggedIn();
  const { codeforcesUsername } = useUserProfile();

  const tabItems: TabItem[] = [
    {
      label: "Recent Submission",
      children: <RecentSubmissionPage />,
      disabled: false,
    },
    {
      label: `${userId ? userId : "User"}'s Submission`,
      children: <UserSubmissionPage userId={userId} />,
      disabled: !userId,
    },
    {
      label:
        !loggedIn || !codeforcesUsername
          ? "My Submission"
          : `My Submission (${codeforcesUsername})`,
      children: <UserSubmissionPage userId={codeforcesUsername} />,
      disabled: !loggedIn || !codeforcesUsername,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
        <HeadLine title="Submissions" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Tabs tabItems={tabItems} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
