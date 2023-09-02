import React, { Dispatch, SetStateAction } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useThemeContext } from "@features/color/themeColor.hook";
import { isMainField } from "@features/layout/helper";
import { SearchBar } from "@features/layout/components/Search";
import { AccountMenu } from "@features/layout/components/AccountMenu";
import type { Field } from "@features/layout/components/SideNavigationItems";

// Without this offset, some part of the content to be invisible behind the header
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

type Props = {
  isOpenSideBar: boolean;
  toggleSideBar: Dispatch<SetStateAction<boolean>>;
  selectedItem: Field;
  setSelectedItem: Dispatch<SetStateAction<Field>>;
};

export const HeaderBar: React.FC<Props> = ({
  isOpenSideBar,
  toggleSideBar,
  selectedItem,
  setSelectedItem,
}) => {
  const { theme } = useThemeContext();
  const { pathname } = useLocation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        css={{ backgroundColor: theme.colors.header.backgroundColor }}
        position="fixed"
        elevation={0}
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
            >
              <MenuIcon />
            </IconButton>
            <a href="/" rel="noopener noreferrer">
              <Typography
                variant="h6"
                component="div"
                onClick={() => {
                  setSelectedItem("Contests");
                }}
                noWrap
                sx={{ display: { xs: "none", sm: "block" } }}
                css={{
                  color: theme.colors.header.foregroundColor,
                }}
              >
                CF DashBoard
              </Typography>
            </a>
          </Box>
          <Stack direction="row" spacing={2} flexGrow={1} pl={2}>
            <SearchBar visible={isMainField(pathname)} />
          </Stack>
          <AccountMenu />
        </Toolbar>
      </AppBar>
      <Offset />
    </Box>
  );
};
