import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Tabs as MUITabs, TabsProps as MUITabsProps } from "@mui/material";

interface TabsProps extends MUITabsProps {
  addScrollButtons?: boolean;
}

export const Tabs = ({ addScrollButtons = false, ...props }: TabsProps) => {
  return (
    <MUITabs
      variant={addScrollButtons ? "scrollable" : "standard"}
      scrollButtons={addScrollButtons ? "auto" : undefined}
      allowScrollButtonsMobile={addScrollButtons}
      sx={
        addScrollButtons
          ? {
              ".MuiTabs-scrollButtons.Mui-disabled": {
                opacity: 0.3,
              },
            }
          : undefined
      }
      {...props}
    />
  );
};

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box px={1} py={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
