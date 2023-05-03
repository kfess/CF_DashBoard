import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { SignInOutButton } from "@features/authentication/components/SignInOut";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";
import {
  USER_GUIDE_URL,
  GITHUB_SPONSOR_URL,
  GITHUB_ISSUE_URL,
} from "@constants/url";

type Props = {};

export const UserSettingIcon: React.FC<Props> = () => {
  const { loggedIn } = useLoggedIn();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick} disableTouchRipple>
        <AccountCircleIcon fontSize="large" />
      </IconButton>
      <Menu
        id=""
        aria-labelledby=""
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>
          {loggedIn && <NavLink to="/profile">Profile</NavLink>}
        </MenuItem>
        <MenuItem onClick={handleClick}>
          <a href={USER_GUIDE_URL} target="_blank" rel="noopener noreferrer">
            <HelpOutlineIcon />
            User Guide
          </a>
        </MenuItem>
        <MenuItem onClick={handleClick}>
          <NavLink to="/setting">
            <SettingsOutlinedIcon />
            Setting
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClick}>
          <a href={GITHUB_ISSUE_URL} target="_blank" rel="noopener noreferrer">
            <OutlinedFlagIcon />
            Feedback
          </a>
        </MenuItem>
        <MenuItem onClick={handleClick}>
          <a
            href={GITHUB_SPONSOR_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FavoriteBorderOutlinedIcon />
            Sponsor
          </a>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <SignInOutButton />
        </MenuItem>
      </Menu>
    </>
  );
};
