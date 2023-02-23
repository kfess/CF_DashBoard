import React from "react";
import Box from "@mui/material/Box";
import type { TabItem } from "@features/ui/component/Tabs";
import { Tabs } from "@features/ui/component/Tabs";
import { LabelCreator } from "@features/bookmark/components/LabelCreator";
import { LabelItems } from "@features/bookmark/components/LabelsList";

export const LabelsPage: React.FC = () => {
  const tabItems: TabItem[] = [
    {
      label: "Problem Labels",
      children: (
        <>
          <LabelCreator />
          <LabelItems />
        </>
      ),
      disabled: false,
    },
    { label: "Contest Labels", children: <></>, disabled: false },
  ];

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Tabs tabItems={tabItems} />
      </Box>
    </>
  );
};
