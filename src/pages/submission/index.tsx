import React from "react";
import Box from "@mui/material/Box";
import { RecentSubmissionPage } from "@pages/submission/recent";
import { UserSubmissionPage } from "@pages/submission/user/index";
import { TabItem, Tabs } from "@features/ui/component/Tabs";
import { HeadLine } from "@features/layout/components/HeadLine";
import { useUserProfile } from "@features/authentication/hooks/useUserProfile";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";
import { QueryParamKeys, useQueryParams } from "@hooks/useQueryParams";

export const SubmissionPage: React.FC = () => {
  const userId = useQueryParams(QueryParamKeys.USERID);
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
    <>
      <HeadLine title="Submissions" />
      <Box sx={{ width: "100%" }}>
        <Tabs tabItems={tabItems} />
      </Box>
    </>
  );
};
