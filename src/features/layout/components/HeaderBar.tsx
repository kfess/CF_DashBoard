import React, { useState } from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useThemeContext } from "@features/color/themeColor.hook";
import { Search } from "@features/layout/components/Search";
import { SideNavigationBar } from "@features/layout/components/SideNavigationBar";

export const HeaderBar: React.FC = () => {
  const { theme } = useThemeContext();
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const toggleSideBar = () => setIsOpenSideBar(!isOpenSideBar);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar css={{ backgroundColor: theme.colors.mainColor }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="default"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleSideBar}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
              css={{ color: theme.colors.fontColor }}
            >
              Codeforces Problems
            </Typography>
            <Search />
          </Toolbar>
        </AppBar>
      </Box>
      {isOpenSideBar && (
        <SideNavigationBar
          isOpenSideBar={isOpenSideBar}
          toggleSideBar={toggleSideBar}
        />
      )}
    </div>
  );
};
