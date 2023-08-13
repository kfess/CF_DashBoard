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
import { generateUrlPath } from "@features/layout/helper";
import { useURLQuery } from "@hooks/useQueryParams";

type Props = {
  isOpenSideBar: boolean;
  toggleSideBar: Dispatch<SetStateAction<boolean>>;
  selectedItem: Field;
  setSelectedItem: Dispatch<SetStateAction<Field>>;
};

export const SideNavigationBar: React.FC<Props> = (props: Props) => {
  const { isOpenSideBar, toggleSideBar, selectedItem, setSelectedItem } = props;
  const { theme } = useThemeContext();

  const { queryParams } = useURLQuery();
  const userId = queryParams["userId"] || "";

  return (
    <Box role="presentation">
      <Drawer anchor="left" open={isOpenSideBar} onClose={toggleSideBar}>
        <Toolbar
          css={{ backgroundColor: theme.colors.header.backgroundColor }}
          variant="dense"
        >
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
                isOpenSideBar={isOpenSideBar}
                toggleSideBar={toggleSideBar}
              />
            );
          })}
        </List>
        <Toolbar />
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
              key={item.field}
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
