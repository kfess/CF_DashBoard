import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { RecentSubmissionPage } from "@pages/submission/recent";
import { UserSubmissionPage } from "./user";

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
  const { search } = useLocation();
  const urlQueries = new URLSearchParams(search);
  const userId = urlQueries.get("userId") ?? "";

  const [value, setValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <h2 css={{ textAlign: "left" }}>Submission</h2>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Recent Submission" sx={{ textTransform: "none" }} />
            <Tab
              label={`${userId ? userId : "User"}'s Submission`}
              disabled={!userId}
              sx={{ textTransform: "none" }}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <RecentSubmissionPage />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserSubmissionPage />
        </TabPanel>
      </Box>
    </>
  );
};
