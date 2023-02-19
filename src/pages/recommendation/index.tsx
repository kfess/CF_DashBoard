import React from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import type { TabItem } from "@features/ui/component/Tabs";
import { Tabs } from "@features/ui/component/Tabs";

export const RecommendationPage: React.FC = () => {
  const { search } = useLocation();
  const urlQueries = new URLSearchParams(search);
  const userId = urlQueries.get("userId") ?? "";

  const tabItems: TabItem[] = [
    {
      label: "Easy Problems",
      children: <div>easy</div>,
      disabled: false,
    },
    {
      label: "Medium Problems",
      children: <div>medium</div>,
      disabled: false,
    },
    {
      label: "Hard Problems",
      children: <div>hard</div>,
      disabled: false,
    },
  ];

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Tabs tabItems={tabItems} />
      </Box>
    </>
  );
};
