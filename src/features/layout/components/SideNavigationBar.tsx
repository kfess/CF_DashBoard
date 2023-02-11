import React, { Dispatch, SetStateAction } from "react";
import { NavLink } from "react-router-dom";
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
import { useThemeContext } from "@features/color/themeColor.hook";

type Props = {
  isOpenSideBar: boolean;
  toggleSideBar: Dispatch<SetStateAction<boolean>>;
  selectedItem: Field;
  setSelectedItem: Dispatch<SetStateAction<Field>>;
};

export const SideNavigationBar: React.FC<Props> = (props: Props) => {
  const { isOpenSideBar, toggleSideBar, selectedItem, setSelectedItem } = props;
  const { theme } = useThemeContext();

  return (
    <Box role="presentation">
      <Drawer anchor="left" open={isOpenSideBar} onClose={toggleSideBar}>
        <Toolbar css={{ backgroundColor: theme.colors.backgroundColor }}>
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={() => toggleSideBar(!isOpenSideBar)}
            css={{
              color: theme.colors.foregroundColor,
              margin: theme.spacing(0, 1, 0, 0),
            }}
          >
            <MenuIcon />
          </IconButton>
          <NavLink to="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={() => {
                setSelectedItem("Contests");
                toggleSideBar(!isOpenSideBar);
              }}
              sx={{ display: { xs: "none", sm: "block" } }}
              css={{ color: theme.colors.foregroundColor }}
            >
              CF DashBoard
            </Typography>
          </NavLink>
        </Toolbar>
        <Divider />
        <List>
          {mainItems.map((item) => (
            <SideNavigationItem
              field={item.field}
              link={item.link}
              selectedIcon={item.selectedIcon}
              notSelectedIcon={item.notSelectedIcon}
              isSelected={selectedItem === item.field}
              setSelected={setSelectedItem}
              isOpenSideBar={isOpenSideBar}
              toggleSideBar={toggleSideBar}
            />
          ))}
        </List>
        <Toolbar />
        <Divider />
        <List>
          {activityItems.map((item) => (
            <SideNavigationItem
              field={item.field}
              link={item.link}
              selectedIcon={item.selectedIcon}
              notSelectedIcon={item.notSelectedIcon}
              isSelected={selectedItem === item.field}
              setSelected={setSelectedItem}
              isOpenSideBar={isOpenSideBar}
              toggleSideBar={toggleSideBar}
            />
          ))}
        </List>
        <Toolbar />
        <Divider />
        <List>
          {otherItems.map((item) => (
            <SideNavigationItem
              field={item.field}
              link={item.link}
              selectedIcon={item.selectedIcon}
              notSelectedIcon={item.notSelectedIcon}
              isSelected={selectedItem === item.field}
              setSelected={setSelectedItem}
              isOpenSideBar={isOpenSideBar}
              toggleSideBar={toggleSideBar}
            />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
