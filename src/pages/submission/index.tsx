import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { CustomBreadcrumbs } from "@features/ui/component/BreadCrumbs";
import { RecentSubmission } from "@features/submission/components/recentSubmission";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

const TabPanel: React.FC<TabPanelProps> = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export const SubmissionPage: React.FC = () => {
  const { pathname } = useLocation();

  const [value, setValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <CustomBreadcrumbs path={pathname} />
      <h2 css={{ textAlign: "left" }}>Submission</h2>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Recent Submission" />
            <Tab label={`testUser's Submission`} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <RecentSubmission />
        </TabPanel>
        <TabPanel value={value} index={1}></TabPanel>
      </Box>
    </>
  );
};
