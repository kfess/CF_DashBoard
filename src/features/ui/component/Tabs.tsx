import React, { ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import { Tabs as MuiTabs } from "@mui/material";
import Tab from "@mui/material/Tab";

type TabPanelProps = {
  children?: ReactNode;
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

export type TabItem = {
  label: string;
  children: ReactNode;
  disabled: boolean;
};

type Props = { tabItems: TabItem[] };

export const Tabs: React.FC<Props> = (props: Props) => {
  const { tabItems } = props;

  const [value, setValue] = useState<number>(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <MuiTabs value={value} onChange={handleChange} sx={{}}>
          {tabItems.map((item) => (
            <Tab
              label={item.label}
              sx={{ textTransform: "none" }}
              disabled={item.disabled}
            />
          ))}
        </MuiTabs>
      </Box>
      {tabItems.map((item, index) => (
        <TabPanel value={value} index={index}>
          {item.children}
        </TabPanel>
      ))}
    </>
  );
};
