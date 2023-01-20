import React from "react";
import {
  Drawer,
  Box,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import {
  mainItems,
  activityItems,
  otherItems,
} from "@features/layout/components/SideNavigationItems";

export const SideBar: React.FC = () => {
  return (
    <div>
      <Box>
        <Drawer anchor="left" open={true}>
          <Toolbar />
          <Divider />
          <List>
            {mainItems.map((item) => (
              <NavLink
                to={item.link}
                css={{ color: "#000000", "&:hover": { color: "#000000" } }}
              >
                <ListItem key={item.field} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.field} />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
          </List>
          <Toolbar />
          <Divider />
          <List>
            {activityItems.map((item) => (
              <NavLink
                to={item.link}
                css={{ color: "#000000", "&:hover": { color: "#000000" } }}
              >
                <ListItem key={item.field} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.field} />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
          </List>
          <Toolbar />
          <Divider />
          <List>
            {otherItems.map((item) => (
              <NavLink
                to={item.link}
                css={{ color: "#000000", "&:hover": { color: "#000000" } }}
              >
                <ListItem key={item.field} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.field} />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Drawer>
      </Box>
    </div>
  );
};
