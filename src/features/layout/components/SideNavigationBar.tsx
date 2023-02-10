import React, { Dispatch, SetStateAction } from "react";
import { Drawer, Box, Toolbar, Divider, List } from "@mui/material";
import type { Field } from "@features/layout/components/SideNavigationItems";
import {
  mainItems,
  activityItems,
  otherItems,
  SideNavigationItem,
} from "@features/layout/components/SideNavigationItems";

type Props = {
  isOpenSideBar: boolean;
  toggleSideBar: Dispatch<SetStateAction<boolean>>;
  selectedItem: Field;
  setSelectedItem: Dispatch<SetStateAction<Field>>;
};

export const SideNavigationBar: React.FC<Props> = (props: Props) => {
  const { isOpenSideBar, toggleSideBar, selectedItem, setSelectedItem } = props;

  return (
    <Box role="presentation">
      <Drawer anchor="left" open={isOpenSideBar} onClose={toggleSideBar}>
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
