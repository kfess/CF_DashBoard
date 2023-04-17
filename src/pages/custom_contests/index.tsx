import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import type { TabItem } from "@features/ui/component/Tabs";
import { Tabs } from "@features/ui/component/Tabs";
import { createdContestTypes } from "@features/custom_contests/customContest";
import { PublicContestTable } from "@features/custom_contests/components/PublicContestTable";
import { PrivateContestList } from "@features/custom_contests/components/PrivateContestList";
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
      children: <PrivateContestList />,
      disabled: true,
    },
  ];

  return (
    <>
      <HeadLine title="Custom Contest" />
      <Box sx={{ p: 1 }}>
        <NavLink to={loggedIn ? "/custom-contest/create" : "#"}>
          <Button
            color="success"
            variant="contained"
            css={{ textTransform: "none" }}
            disabled={!loggedIn}
          >
            Create New Contest
          </Button>
        </NavLink>
        {!loggedIn && (
          <AlertMessage
            title=""
            message="To create a new Contest, You need to be logged in."
          />
        )}
        <Box sx={{ width: "100%" }}>
          <Tabs tabItems={tabItems} />
        </Box>
      </Box>
    </>
  );
};
