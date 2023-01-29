import React from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useThemeContext } from "@features/color/themeColor.hook";

export const Search: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <div
      css={{
        position: "relative",
        marginLeft: theme.spacing(2),
        width: "30%",
        borderRadius: "5px",
        backgroundColor: "#ffffff",
        "&:hover": {
          backgroundColor: "#ffffff",
        },
        [theme.breakpoints.down("sm")]: {
          marginLeft: theme.spacing(2),
          width: "50%",
        },
      }}
    >
      <div
        css={{
          padding: theme.spacing(0, 1.5),
          height: "100%",
          position: "absolute",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#4d5156",
        }}
      >
        <SearchIcon />
      </div>

      <InputBase
        placeholder="User ID..."
        inputProps={{ "aria-label": "search" }}
        css={{
          padding: theme.spacing(0.5, 1, 0.5, 0),
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create("width"),
          width: "100%",
          [theme.breakpoints.down("sm")]: {
            width: "auto",
            "&:focus": {
              width: "20ch",
            },
          },
        }}
      />
    </div>
  );
};
