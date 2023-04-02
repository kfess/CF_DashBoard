import React from "react";
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
    <>
      <HeadLine title="Labels" />
      <Box sx={{ width: "100%" }}>
        <Tabs tabItems={tabItems} />
      </Box>
    </>
  );
};
