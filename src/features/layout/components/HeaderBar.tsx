import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Toolbar } from "@mui/material";
import { useThemeContext } from "@features/color/themeColor.hook";
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
