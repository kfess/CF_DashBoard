import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { useFetchUserInfo } from "../useUserInfo";
import { useURLQuery } from "@hooks/useQueryParams";
import { Input } from "@features/ui/component/Input";
import { normalizeSearchUser } from "../searchUser";
import { Snackbar } from "@features/ui/component/Snackbar";

type Props = { readonly visible: boolean };

export const SearchBar: React.FC<Props> = ({ visible }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { queryParams, setURLQuery } = useURLQuery();
  const queryUserId = queryParams["userId"];
  const [searchUserId, setSearchUserId] = useState(queryUserId);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const { isError, error } = useFetchUserInfo({
    userId: queryUserId,
  });

  useEffect(() => {
    if (isError) {
      navigate("/");
      setIsSnackbarOpen(true);
    }
  }, [isError, navigate, pathname]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchUserId(event.target.value);
  };

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (searchUserId) {
        setURLQuery({ userId: normalizeSearchUser(searchUserId) });
      }
    },
    [navigate, pathname, searchUserId]
  );

  return visible ? (
    <Box css={{ width: "100%" }}>
      <form onSubmit={onSubmit}>
        <Input
          placeholder="Search User ID"
          value={searchUserId}
          onChange={onChange}
        />
      </form>
      <Snackbar
        open={isSnackbarOpen}
        message={
          error && error.message === "Codeforces is temporarily unavailable."
            ? "Codeforces is temporarily unavailable. Please try again later."
            : "Failed to fetch user info. Check the user ID and try again later."
        }
        onClose={handleCloseSnackbar}
      />
    </Box>
  ) : null;
};
