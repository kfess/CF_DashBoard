import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Input from "@mui/material/Input";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { searchUserState } from "@features/layout/searchUser.atom";
import { generateUrlPath } from "@features/layout/helper";

export const SearchBar: React.FC = () => {
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
    <Box sx={{ p: 1, display: "flex", flexGrow: 1 }}>
      <FormControl variant="standard">
        <Input
          id="input-with-icon-adornment"
          onChange={onChange}
          onKeyUp={onKeyEnter}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={onClickSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          placeholder="User ID"
        />
      </FormControl>
    </Box>
  );
};
