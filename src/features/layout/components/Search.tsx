import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Input from "@mui/material/Input";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { generateUrlPath } from "@features/layout/helper";
import { useFetchUserInfo } from "../useUserInfo";
import { getColorCodeFromRating } from "@features/color/ratingColor";
import { ColoredCircle } from "@features/color/components/ColoredCircle";
import { DeletableChip } from "@features/ui/component/Chip";

export const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const urlQueries = new URLSearchParams(search);
  const queryUserId = urlQueries.get("userId") ?? "";

  const [searchUserId, setSearchUserId] = useState(queryUserId);

  // If queryUserId is not falsy ("", undefined, null, ...),
  // asynchronously fetch User Info by React-Query
  const { data, isError, isSuccess } = useFetchUserInfo({
    userId: queryUserId,
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchUserId(event.target.value);
  };

  return (
    <Box sx={{ p: 1 }}>
      <form
        onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          navigate(generateUrlPath(pathname, searchUserId));
        }}
      >
        <Input
          id="input-with-icon-adornment"
          onChange={onChange}
          value={searchUserId}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  navigate(generateUrlPath(pathname, searchUserId));
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          placeholder="User ID"
        />
        {isSuccess && (
          <DeletableChip
            label={queryUserId}
            icon={
              <ColoredCircle color={getColorCodeFromRating(data?.rating)} />
            }
            onDelete={() => {
              setSearchUserId("");
              navigate(pathname);
            }}
          />
        )}
      </form>

      <Box sx={{ p: 1 }}>
        {isError && queryUserId.length > 0 && (
          <NoUserFoundAlert userId={queryUserId} />
        )}
      </Box>
    </Box>
  );
};

const NoUserFoundAlert = ({ userId }: { userId: string }) => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      User <strong>{userId}</strong> Not Found. Please check the input value.
    </Alert>
  );
};
