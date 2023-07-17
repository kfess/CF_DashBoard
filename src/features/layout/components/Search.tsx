import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { generateUrlPath } from "@features/layout/helper";
import { useFetchUserInfo } from "../useUserInfo";
import { useQueryParams, QueryParamKeys } from "@hooks/useQueryParams";
import { Input } from "@features/ui/component/Input";

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
      navigate(generateUrlPath("/", ""));
    }
  }, [isError, navigate, pathname]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchUserId(event.target.value);
  };

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (searchUserId) {
        navigate(generateUrlPath(pathname, searchUserId));
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
