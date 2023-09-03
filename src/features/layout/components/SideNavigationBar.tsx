import React, { Dispatch, SetStateAction } from "react";
import Typography from "@mui/material/Typography";
import { Drawer, Box, Toolbar, Divider, List } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import type { Field } from "@features/layout/components/SideNavigationItems";
import {
  mainItems,
  activityItems,
  otherItems,
  SideNavigationItem,
} from "@features/layout/components/SideNavigationItems";
import { generateUrlPath } from "@features/layout/helper";
import { useURLQuery } from "@hooks/useQueryParams";
import { useTheme } from "@mui/material/styles";

type Props = {
  isOpenSideBar: boolean;
  toggleSideBar: () => void;
  selectedItem: Field;
  setSelectedItem: Dispatch<SetStateAction<Field>>;
};

export const SideNavigationBar: React.FC<Props> = ({
  isOpenSideBar,
  toggleSideBar,
  selectedItem,
  setSelectedItem,
}) => {
  const theme = useTheme();

  const { queryParams } = useURLQuery();
  const userId = queryParams["userId"] || "";

  return (
    <Box role="presentation">
      <Drawer
        anchor="left"
        open={isOpenSideBar}
        onClose={toggleSideBar}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={() => toggleSideBar()}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <a href="/" rel="noopener noreferrer">
            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={() => {
                setSelectedItem("Contests");
                toggleSideBar();
              }}
              sx={{
                display: { xs: "none", sm: "block" },
                color: theme.palette.mode === "light" ? "#000000" : "#ffffff",
              }}
            >
              CF-DashBoard
            </Typography>
          </a>
        </Toolbar>
        <Divider />
        <List>
          {mainItems.map((item) => {
            return (
              <SideNavigationItem
                key={item.field}
                field={item.field}
                link={generateUrlPath(item.link, userId)}
                selectedIcon={item.selectedIcon}
                notSelectedIcon={item.notSelectedIcon}
                isSelected={selectedItem === item.field}
                setSelected={setSelectedItem}
                toggleSideBar={toggleSideBar}
              />
            );
          })}
        </List>
        <Divider />
        <List>
          {activityItems.map((item) => (
            <SideNavigationItem
              key={item.field}
              field={item.field}
              link={item.link}
              selectedIcon={item.selectedIcon}
              notSelectedIcon={item.notSelectedIcon}
              isSelected={selectedItem === item.field}
              setSelected={setSelectedItem}
              toggleSideBar={toggleSideBar}
            />
          ))}
        </List>
        <Divider />
        <List>
          {otherItems.map((item) => (
            <SideNavigationItem
              key={item.field}
              field={item.field}
              link={item.link}
              selectedIcon={item.selectedIcon}
              notSelectedIcon={item.notSelectedIcon}
              isSelected={selectedItem === item.field}
              setSelected={setSelectedItem}
              toggleSideBar={toggleSideBar}
            />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
