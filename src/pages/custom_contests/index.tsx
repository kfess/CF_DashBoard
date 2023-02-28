import React from "react";
import Box from "@mui/material/Box";
import type { TabItem } from "@features/ui/component/Tabs";
import { Tabs } from "@features/ui/component/Tabs";
import {
  CreatedContests,
  createdContestTypes,
} from "@features/custom_contests/components/CreatedContests";

export const CustomContestPage: React.FC = () => {
  const tabItems: TabItem[] = createdContestTypes.map((contestType) => {
    return {
      label: contestType,
      children: <CreatedContests contestType={contestType} />,
      disabled: false,
    };
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs tabItems={tabItems} />
    </Box>
  );
};
