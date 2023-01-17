import React from "react";
import { Drawer, Box, Toolbar, Divider, List } from "@mui/material";
// import {
//   mainListItems,
//   subListItems,
//   otherListItems,
// } from "@features/layout/listItems";

export const SideBar: React.FC = () => {
  return (
    <Box>
      <Drawer>
        <Toolbar />
        <Divider />
        <List>{}</List>
      </Drawer>
    </Box>
  );
};
