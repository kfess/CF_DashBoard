import React from "react";
import { List as MUIList } from "@mui/material";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { styled } from "@mui/system";

const HorizontalList = styled(MUIList)`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  overflow: auto;
`;

const CustomListItem = styled(ListItem)`
  padding: 0px 3px; // padding between ListItems
`;

const CustomListItemButton = styled(ListItemButton)`
  background-color: ${({ selected }) => (selected ? "#e9edf1" : "transparent")};
  border-radius: 6px;
  &:hover {
    background-color: #e9edf1;
  }
  &:focus {
    outline: 2px solid #80bfff;
  }
`;

type Props = {
  items: {
    readonly text: string;
    readonly onClick: () => void;
    readonly selected?: boolean;
    readonly disabled?: boolean;
  }[];
};

export const List: React.FC<Props> = ({ items }) => (
  <HorizontalList>
    {items.map((item, index) => (
      <CustomListItem key={index}>
        <CustomListItemButton
          onClick={item.onClick}
          disabled={item.disabled ?? false}
          selected={item.selected}
          disableRipple
          disableTouchRipple
        >
          <ListItemText>{item.text}</ListItemText>
        </CustomListItemButton>
      </CustomListItem>
    ))}
  </HorizontalList>
);
