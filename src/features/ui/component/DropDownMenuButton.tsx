import React, { ReactNode } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CheckIcon from "@mui/icons-material/Check";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ITEM_HEIGHT = 48;

type Props<T extends string | number> = {
  readonly title: string;
  readonly items: readonly T[]; // "Japan" | "USA" | "China" , etc...
  selectedItem: T;
  setSelectedItem: (item: T) => void;
  readonly startIcons?: React.ReactNode[];
};

export const DropDownMenuButton = <T extends string | number>(
  props: Props<T>
) => {
  const { title, items, selectedItem, setSelectedItem, startIcons } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (_event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        endIcon={open ? <ArrowDropDownIcon /> : <ArrowLeftIcon />}
        css={{
          textTransform: "none",
          "&:hover": { textDecorationLine: "underline" },
        }}
      >
        {title}
      </Button>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 4.5 } }}
      >
        {items.map((item, index) => (
          <MenuItem
            key={item}
            onClick={() => {
              setSelectedItem(item);
              setAnchorEl(null);
            }}
            dense
          >
            {selectedItem === item ? (
              <CheckIcon fontSize="small" css={{ paddingRight: "5px" }} />
            ) : (
              <SvgIcon fontSize="small" css={{ paddingRight: "5px" }} />
            )}
            {startIcons && startIcons[index]}
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

// ------ refactoring

const ITEM_HEIGHT_ = 48;

type Props_<T extends string | number> = {
  readonly title: string;
  selectedItem: T;
  setSelectedItem: (item: T) => void;
  readonly items: { readonly item: T; startIcon?: ReactNode }[];
};

export const DropDownMenuButton_ = <T extends string | number>(
  props: Props_<T>
) => {
  const { title, selectedItem, setSelectedItem, items } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (_event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        endIcon={open ? <ArrowDropDownIcon /> : <ArrowLeftIcon />}
        css={{
          textTransform: "none",
          "&:hover": { textDecorationLine: "underline" },
        }}
      >
        {title}
      </Button>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{ style: { maxHeight: ITEM_HEIGHT_ * 4.5 } }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.item}
            onClick={() => {
              setSelectedItem(item.item);
              setAnchorEl(null);
            }}
            dense
          >
            {selectedItem === item.item ? (
              <CheckIcon fontSize="small" css={{ paddingRight: "5px" }} />
            ) : (
              <SvgIcon fontSize="small" css={{ paddingRight: "5px" }} />
            )}
            {item.startIcon}
            {item.item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
