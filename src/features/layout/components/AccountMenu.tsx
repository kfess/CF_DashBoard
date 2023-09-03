import * as React from "react";
import { NavLink } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LogoutIcon from "@mui/icons-material/Logout";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  USER_GUIDE_URL,
  GITHUB_SPONSOR_URL,
  GITHUB_ISSUE_URL,
} from "@constants/url";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";
import { Box } from "@mui/material";
import { IconButton } from "@features/ui/component/IconButton";

export type AccountMenuItem = {
  icon: React.ReactNode;
  title: string;
  to: string;
  isExternal?: boolean;
  onClick?: () => void;
};

export const commonItems: AccountMenuItem[] = [
  {
    icon: <HelpOutlineIcon sx={{ color: "#9246FF" }} />,
    title: "User Guide",
    to: USER_GUIDE_URL,
    isExternal: true,
  },
  {
    icon: <OutlinedFlagIcon sx={{ color: "#9246FF" }} />,
    title: "Feedback",
    to: GITHUB_ISSUE_URL,
    isExternal: true,
  },
  {
    icon: <FavoriteBorderOutlinedIcon sx={{ color: "#9246FF" }} />,
    title: "Sponsor",
    to: GITHUB_SPONSOR_URL,
    isExternal: true,
  },
  {
    icon: <SettingsOutlinedIcon sx={{ color: "#9246FF" }} />,
    title: "Setting",
    to: "/setting",
    isExternal: false,
  },
];

export const profileItem: AccountMenuItem = {
  icon: <PermIdentityIcon sx={{ color: "#9246FF" }} />,
  title: "Profile",
  to: "/profile",
  isExternal: false,
};

export const signInItem: AccountMenuItem = {
  icon: <ExitToAppIcon sx={{ color: "#9246FF" }} />,
  title: "Sign in",
  to: "/login",
  isExternal: false,
};

export const signOutItem: AccountMenuItem = {
  icon: <LogoutIcon sx={{ color: "#9246FF" }} />,
  title: "Sign Out",
  to: "/",
  isExternal: false,
};

export const AccountMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { loggedIn, logout } = useLoggedIn();
  const getMenuItems = (isLoggedIn: boolean): AccountMenuItem[] => {
    if (isLoggedIn) {
      return [
        profileItem,
        ...commonItems,
        {
          ...signOutItem,
          onClick: () => {
            handleClose();
            logout();
          },
        },
      ];
    }
    return [...commonItems, signInItem];
  };
  const menuItems = getMenuItems(loggedIn);

  return (
    <>
      <IconButton
        icon={<AccountCircleIcon fontSize="large" />}
        onClick={handleClick}
        disableTouchRipple
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.title}
            onClick={item.onClick ? item.onClick : handleClose}
            component="div"
          >
            {item.isExternal ? (
              <a
                href={item.to}
                target="_blank"
                rel="noopener noreferrer"
                css={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": {
                    color: "#9246FF",
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Box>{item.title}</Box>
                  <LaunchIcon fontSize="small" />
                </Stack>
              </a>
            ) : (
              <NavLink
                to={item.to}
                css={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": {
                    color: "#9246FF",
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Typography>{item.title}</Typography>
              </NavLink>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
