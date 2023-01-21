import React, { useState } from "react";
import { Drawer, Box, Toolbar, Divider, List } from "@mui/material";
import {
type Field,
  mainItems,
  activityItems,
  otherItems,
  SideNavigationItem,
} from "@features/layout/components/SideNavigationItems";

export const SideNavigationBar: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<Field>("Contests");
  return (
    <Box>
      <Drawer anchor="left" open={true}>
        <Toolbar />
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
          />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
