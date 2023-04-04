import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { SignInOutButton } from "@features/authentication/components/SignInOut";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";

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
          {loggedIn && (
            <NavLink to="/profile" color="inherit">
              <Typography noWrap component="div">
                Profile
              </Typography>
            </NavLink>
          )}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <SignInOutButton />
        </MenuItem>
      </Menu>
    </>
  );
};
