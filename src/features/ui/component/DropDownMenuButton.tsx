import React, { ReactNode, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CheckIcon from "@mui/icons-material/Check";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { __Button } from "@features/ui/component/Button";

const ITEM_HEIGHT = 48;

type Props<T extends string | number> = {
  readonly title: string;
  selectedItem: T;
  onSelect: (item: T) => void; // 変更点: setSelectedItem から onSelect に変更
  readonly items: { readonly item: T; startIcon?: ReactNode }[];
  disabled?: boolean;
};

export const DropDownMenuButton = <T extends string | number>(
  props: Props<T>
) => {
  const {
    title,
    selectedItem,
    onSelect, // 変更点: setSelectedItem から onSelect に変更
    items,
    disabled = false,
  } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (_event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item: T) => {
    // 変更点: 項目をクリックしたときのハンドラを追加
    onSelect(item);
    setAnchorEl(null);
  };

  return (
    <>
      <__Button
        onClick={handleClick}
        endIcon={open ? <ArrowDropDownIcon /> : <ArrowLeftIcon />}
        disabled={disabled}
        color="secondary"
      >
        {title}
      </__Button>
      <Menu
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handleClose}
        PaperProps={{
          style: { maxHeight: ITEM_HEIGHT * 4.5 },
        }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.item}
            onClick={() => handleMenuItemClick(item.item)} // 変更点: handleMenuItemClick を使用
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
