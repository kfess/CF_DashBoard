import React from "react";
import {
  List as MUIList,
  ListItem,
  ListItemButton,
  ListItemText,
  ListProps as MUIListProps,
  ListItemProps,
} from "@mui/material";

type HorizontalListProps = MUIListProps & {
  children?: React.ReactNode;
};

const HorizontalList: React.FC<HorizontalListProps> = (props) => (
  <MUIList
    sx={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      width: "100%",
      overflow: "auto",
    }}
    {...props}
  />
);

type CustomListItemProps = ListItemProps & {
  children?: React.ReactNode;
};

const CustomListItem: React.FC<CustomListItemProps> = (props) => (
  <ListItem
    sx={{ padding: "0px 3px" }} // padding between ListItems
    {...props}
  />
);

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
        <ListItemButton
          onClick={item.onClick}
          disabled={item.disabled ?? false}
          sx={{
            backgroundColor: item.selected ? "#9246FF" : "transparent",
            color: item.selected ? "#ffffff" : "#000000",
            "&:hover": {
              backgroundColor: "#9246FF",
              color: "#ffffff",
            },
            borderRadius: "6px",
            "&.Mui-focusVisible": {
              outline: "2px solid #7112CC",
            },
          }}
          disableRipple
        >
          <ListItemText>{item.text}</ListItemText>
        </ListItemButton>
      </CustomListItem>
    ))}
  </HorizontalList>
);
