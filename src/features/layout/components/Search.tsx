import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { useFetchUserInfo } from "../useUserInfo";
import {
  useQueryParams,
  QueryParamKeys,
  addQueryParamsToPath,
} from "@hooks/useQueryParams";
import { Input } from "@features/ui/component/Input";
import { normalizeSearchUser } from "../searchUser";

type Props = { visible: boolean };

export const SearchBar: React.FC<Props> = ({ visible }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const queryUserId = useQueryParams(QueryParamKeys.USERID);
  const [searchUserId, setSearchUserId] = useState(queryUserId);

  const { isError } = useFetchUserInfo({
    userId: queryUserId,
  });

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate, pathname]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchUserId(event.target.value);
  };

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (searchUserId) {
        navigate(
          addQueryParamsToPath(pathname, {
            userId: normalizeSearchUser(searchUserId),
          }) // no query params other than userId
        );
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
    </Box>
  ) : null;
};
