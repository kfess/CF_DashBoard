import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CheckIcon from "@mui/icons-material/Check";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ReplayIcon from "@mui/icons-material/Replay";
import { tags } from "@features/problems/problem";
import type { Tag } from "@features/problems/problem";
import { Button } from "@features/ui/component/Button";

const ITEM_HEIGHT = 48;

type Props = {
  selectedTags: Tag[];
  addOrRemoveTag: (item: Tag) => void;
  removeAllTags: () => void;
};

export const TagsButton: React.FC<Props> = (props: Props) => {
  const { selectedTags, addOrRemoveTag, removeAllTags } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        endIcon={open ? <ArrowDropDownIcon /> : <ArrowLeftIcon />}
      >
        Tags
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 5 } }}
      >
        {tags.map((tag) => (
          <MenuItem
            key={tag}
            onClick={() => {
              setAnchorEl(null);
              addOrRemoveTag(tag);
            }}
            dense
          >
            {selectedTags.includes(tag) ? (
              <CheckIcon fontSize="small" css={{ paddingRight: "5px" }} />
            ) : (
              <SvgIcon fontSize="small" css={{ paddingRight: "5px" }} />
            )}
            {tag}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem
          onClick={removeAllTags}
          css={{ justifyContent: "flex-end" }}
          dense
        >
          <ReplayIcon />
          Reset
        </MenuItem>
      </Menu>
    </>
  );
};
