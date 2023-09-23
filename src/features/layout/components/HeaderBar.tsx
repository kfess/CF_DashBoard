import React, { Dispatch, SetStateAction } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { AppBar, Box, Toolbar, Typography, Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import { isMainField } from "@features/layout/helper";
import { SearchBar } from "@features/layout/components/Search";
import { AccountMenu } from "@features/layout/components/AccountMenu";
import type { Field } from "@features/layout/components/SideNavigationItems";
import { ThemeSelector } from "@features/layout/components/ThemeSelector";
import { HeaderNavigationItems } from "./HeaderNavigationItems";
import { IconButton } from "@features/ui/component/IconButton";
import { ExternalLink } from "@features/ui/component/ExternalLink";

// Without this offset, some part of the content to be invisible behind the header
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

type Props = {
  isOpenSideBar: boolean;
  toggleSideBar: Dispatch<SetStateAction<boolean>>;
  setSelectedItem: Dispatch<SetStateAction<Field>>;
};

export const HeaderBar: React.FC<Props> = ({
  isOpenSideBar,
  toggleSideBar,
  setSelectedItem,
}) => {
  const { pathname } = useLocation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        color="default"
        position="fixed"
        elevation={0}
        sx={{ mb: "1px solid", borderColor: "divider" }}
      >
        <Toolbar
          variant="dense"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              icon={<MenuIcon />}
              edge="start"
              aria-label="menu"
              onClick={() => toggleSideBar(!isOpenSideBar)}
              sx={{ mr: 1 }}
            />
            <ExternalLink
              href="/"
              target="" // Do not open in new tab
              label={<Typography variant="h6">CF-DashBoard</Typography>}
              noWrap
              onClick={() => {
                setSelectedItem("Contests");
              }}
              sx={{
                display: { xs: "none", sm: "block" },
                color: (theme) =>
                  theme.palette.mode === "light" ? "#000000" : "#ffffff",
                "&:hover": {
                  textDecoration: "none",
                  color: (theme) => theme.palette.primary.main,
                },
              }}
            />
          </Box>
          <Stack direction="row" spacing={2} flexGrow={1} px={2}>
            <SearchBar visible={isMainField(pathname)} />
          </Stack>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <HeaderNavigationItems setSelectedItem={setSelectedItem} />
          </Box>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ mx: 1 }}
          />
          <ThemeSelector />
          <AccountMenu />
        </Toolbar>
      </AppBar>
      <Offset />
    </Box>
  );
};
