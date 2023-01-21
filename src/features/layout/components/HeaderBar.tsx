import React, { useState } from "react";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useThemeContext } from "@features/color/themeColor.hook";
import { SideNavigationBar } from "@features/layout/components/SideNavigationBar";
import { useFetchContests } from "@features/contests/useFetchContest";

export const HeaderBar: React.FC = () => {
  const { theme } = useThemeContext();
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const toggleSideBar = () => setIsOpenSideBar(!isOpenSideBar);

  const { status, data } = useFetchContests();

  if (status === "loading") return <div>Loading</div>;
  if (status === "error") return <div>Error</div>;

  return (
    <div>
      {data[0].durationSeconds}
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
