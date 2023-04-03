import React, { Dispatch, SetStateAction } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useThemeContext } from "@features/color/themeColor.hook";
import { SignInOutButton } from "@features/authentication/components/SignInOut";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";
import { isMainField } from "@features/layout/helper";
import { SearchBar } from "@features/layout/components/Search";

// Without this offset, some part of the content to be invisible behind the header
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

type Props = {
  isOpenSideBar: boolean;
  toggleSideBar: Dispatch<SetStateAction<boolean>>;
};

export const HeaderBar: React.FC<Props> = (props: Props) => {
  const { isOpenSideBar, toggleSideBar } = props;
  const { theme } = useThemeContext();
  const { loggedIn } = useLoggedIn();
  const { pathname } = useLocation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        css={{ backgroundColor: theme.colors.header.backgroundColor }}
        position="fixed"
      >
        <Toolbar
          variant="dense"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={() => toggleSideBar(!isOpenSideBar)}
              css={{ margin: theme.spacing(0, 1, 0, 0) }}
            >
              <MenuIcon />
            </IconButton>
            <NavLink to="/">
              <Typography
                variant="h6"
                component="div"
                noWrap
                sx={{ display: { xs: "none", sm: "block" } }}
                css={{
                  color: theme.colors.header.foregroundColor,
                }}
              >
                CF DashBoard
              </Typography>
            </NavLink>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              width: "40%",
            }}
          >
            {isMainField(pathname) && (
              <SearchBar visible={isMainField(pathname)} />
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SignInOutButton />
            {loggedIn && (
              <NavLink to="/profile">
                <Typography
                  noWrap
                  component="div"
                  css={{
                    color: theme.colors.header.foregroundColor,
                  }}
                >
                  Profile
                </Typography>
              </NavLink>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Offset />
    </Box>
  );
};
