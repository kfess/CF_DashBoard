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
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  mainListItems,
  subListItems,
  otherListItems,
  Item,
} from "@features/layout/listItems";

const SideBarItem: React.FC<Item> = (props: Item) => {
  const { field, link, icon } = props;
  return (
    <React.Fragment key={field}>
      <Link to={link}>
        <ListItem key={field} disablePadding>
          <ListItemButton>
            {icon}
            <ListItemText primary={field} />
          </ListItemButton>
        </ListItem>
      </Link>
    </React.Fragment>
  );
};

export const SideBar: React.FC = () => {
  return (
    <div>
      <Box>
        <Drawer anchor="left" open={true}>
          <Toolbar />
          <Divider />
          <List>
            {mainListItems.map((item) => (
              <SideBarItem
                field={item.field}
                link={item.link}
                icon={item.icon}
              />
            ))}
          </List>
          <Toolbar />
          <Divider />
          <List>
            {subListItems.map((item) => (
              <SideBarItem
                field={item.field}
                link={item.link}
                icon={item.icon}
              />
            ))}
          </List>
          <Toolbar />
          <Divider />
          <List>
            {otherListItems.map((item) => (
              <SideBarItem
                field={item.field}
                link={item.link}
                icon={item.icon}
              />
            ))}
          </List>
        </Drawer>
      </Box>
    </div>
  );
};
