import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@features/ui/component/Button";
import { Switch } from "@features/ui/component/Switch";

const ITEM_HEIGHT = 48;

type Props = {
  showTags: boolean;
  toggleShowTags: () => void;
};

export const ViewFilter: React.FC<Props> = ({ showTags, toggleShowTags }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClose = (_: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick} color="secondary">
        <SettingsIcon css={{ color: !open ? "inherit" : "#3170B9" }} />
      </Button>
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
          style: { maxHeight: ITEM_HEIGHT * 4.5, marginTop: "8px" },
        }}
      >
        <MenuItem>
          <Switch
            label="Show Tags"
            checked={showTags}
            onChange={toggleShowTags}
          />
        </MenuItem>
      </Menu>
    </>
  );
};
