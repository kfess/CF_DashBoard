import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useThemeContext } from "@features/color/themeColor.hook";
import { Search } from "@features/layout/components/Search";
import { SideNavigationBar } from "@features/layout/components/SideNavigationBar";

// Without this offset, some part of the content to be invisible behind the header
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const HeaderBar: React.FC = () => {
  const { theme } = useThemeContext();
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const toggleSideBar = () => setIsOpenSideBar(!isOpenSideBar);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          css={{ backgroundColor: theme.colors.backgroundColor }}
          position="fixed"
        >
          <Toolbar>
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={toggleSideBar}
              css={{
                color: theme.colors.foregroundColor,
                margin: theme.spacing(0, 1, 0, 0),
              }}
            >
              <MenuIcon />
            </IconButton>
            <NavLink to="/">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
                css={{ color: theme.colors.foregroundColor }}
              >
                Codeforces Problems
              </Typography>
            </NavLink>
            <Search />
          </Toolbar>
        </AppBar>
        <Offset />
      </Box>
      {isOpenSideBar && (
        <SideNavigationBar
          isOpenSideBar={isOpenSideBar}
          toggleSideBar={toggleSideBar}
        />
      )}
    </>
  );
};
