import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@features/ui/component/Button";
import { Switch } from "@features/ui/component/Switch";

const ITEM_HEIGHT = 48;

type Props = {
  showDifficulty: boolean;
  showACStatus: boolean;
  pinTableHeader: boolean;
  reverse: boolean;
  toggleShowDifficulty: () => void;
  toggleShowACStatus: () => void;
  togglePinTableHeader: () => void;
  toggleReverse: () => void;
};

export const ViewFilter: React.FC<Props> = ({
  showDifficulty,
  showACStatus,
  pinTableHeader,
  reverse,
  toggleShowDifficulty,
  toggleShowACStatus,
  togglePinTableHeader,
  toggleReverse,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (_event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick}>
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
            label="Show Difficulty"
            checked={showDifficulty}
            onChange={toggleShowDifficulty}
          />
        </MenuItem>
        <MenuItem>
          <Switch
            label="Show AC Status"
            checked={showACStatus}
            onChange={toggleShowACStatus}
          />
        </MenuItem>
        <MenuItem>
          <Switch
            label="Pin Header"
            checked={pinTableHeader}
            onChange={togglePinTableHeader}
          />
        </MenuItem>
        <MenuItem>
          <Switch label="Reverse" checked={reverse} onChange={toggleReverse} />
        </MenuItem>
      </Menu>
    </>
  );
};