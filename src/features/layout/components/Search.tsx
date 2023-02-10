import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { searchUserState } from "@features/layout/searchUser.atom";
import { generateUrlPath } from "../helper";

export const Search: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchUserID, setSearchUserID] = useRecoilState(searchUserState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchUserID(event.currentTarget.value);
  };

  const onKeyEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      navigate(generateUrlPath(pathname, event.currentTarget.value));
    }
  };

  const onClickSearch = (): void => {
    navigate(generateUrlPath(pathname, searchUserID));
  };

  return (
    <Paper
      sx={{
        p: "2px 2px",
        marginLeft: "20px",
        display: "flex",
        alignItems: "center",
        width: 300,
      }}
    >
      <InputBase
        placeholder="User ID..."
        inputProps={{ "aria-label": "search" }}
        value={searchUserID}
        onChange={onChange}
        onKeyUp={onKeyEnter}
        sx={{ ml: 1, flex: 1 }}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={onClickSearch}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
