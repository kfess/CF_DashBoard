import React, { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { generateUrlPath } from "@features/layout/helper";
import { useFetchUserInfo } from "../useUserInfo";
import { getColorCodeFromRating } from "@features/color/ratingColor";
import { ColoredCircle } from "@features/color/components/ColoredCircle";
import { DeletableChip } from "@features/ui/component/Chip";
import { useQueryParams, QueryParamKeys } from "@hooks/useQueryParams";
import { Input } from "@features/ui/component/Input";
import { AlertMessage } from "@features/ui/component/AlertDialog";

export const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const queryUserId = useQueryParams(QueryParamKeys.USERID);
  const [searchUserId, setSearchUserId] = useState(queryUserId);

  const { data, isError, isSuccess } = useFetchUserInfo({
    userId: queryUserId,
  });

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

  return (
    <Box sx={{ p: 1 }}>
      <form onSubmit={onSubmit}>
        <Input placeholder="User ID" value={searchUserId} onChange={onChange} />
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

      {/* <Box sx={{ p: 1 }}>
        {isError && (
          <AlertMessage
            title="Error"
            message={`${searchUserId} Not Found. Please check the User ID`}
          />
        )}
      </Box> */}
    </Box>
  );
};
