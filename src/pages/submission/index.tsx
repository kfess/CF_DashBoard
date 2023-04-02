import React from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { RecentSubmissionPage } from "@pages/submission/recent";
import { UserSubmissionPage } from "@pages/submission/user/index";
import { TabItem, Tabs } from "@features/ui/component/Tabs";
import { HeadLine } from "@features/layout/components/HeadLine";
import { useUserProfile } from "@features/authentication/hooks/useUserProfile";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";

export const SubmissionPage: React.FC = () => {
  const { search } = useLocation();
  const urlQueries = new URLSearchParams(search);
  const userId = urlQueries.get("userId") ?? "";

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
      children: <UserSubmissionPage />,
      disabled: !userId,
    },
    // {
    //   label: "My Submission",
    //   children: <UserSubmissionPage />,
    //   disabled: !loggedIn || !codeforcesUsername,
    // },
  ];

  return (
    <>
      <HeadLine title="Submissions" />
      <Box sx={{ width: "100%" }}>
        <Tabs tabItems={tabItems} />
      </Box>
    </>
  );
};
