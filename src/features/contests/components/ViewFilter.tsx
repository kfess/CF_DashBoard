import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@features/ui/component/Button";
import { Switch } from "@features/ui/component/Switch";

const ITEM_HEIGHT = 48;

type Props = {
  showDifficulty: boolean;
  toggleShowDifficulty: () => void;
  toggleShowACStatus: () => void;
  togglePinTableHeader: () => void;
  toggleReverse: () => void;
};

export const ViewFilter: React.FC<Props> = ({
  showDifficulty,
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
        <SettingsIcon />
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
        PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 4.5 } }}
      >
        <MenuItem>
          <Switch label="Show Difficulty" onChange={toggleShowDifficulty} />
        </MenuItem>
        <MenuItem>
          <Switch label="Show AC Status" onChange={toggleShowACStatus} />
        </MenuItem>
        <MenuItem>
          <Switch label="Pin Header" onChange={togglePinTableHeader} />
        </MenuItem>
        <MenuItem>
          <Switch label="Reverse" onChange={toggleReverse} />
        </MenuItem>
      </Menu>
    </>
  );
};
