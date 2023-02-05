import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CheckIcon from "@mui/icons-material/Check";
import SvgIcon from "@mui/material/SvgIcon";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type Props<T extends string | number> = {
  readonly title: string;
  readonly items: readonly T[]; // "Japan" | "USA" | "China" , etc...
  selectedItem: T;
  setSelectedItem: (item: T) => void;
};

export const DropDownMenuButton = <T extends string | number>(
  props: Props<T>
) => {
  const { title, items, selectedItem, setSelectedItem } = props;

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
        endIcon={open ? <KeyboardArrowDownIcon /> : <KeyboardArrowLeftIcon />}
        css={{ "&:hover": { textDecorationLine: "underline" } }}
      >
        {title}
      </Button>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        {items.map((item) => (
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
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
