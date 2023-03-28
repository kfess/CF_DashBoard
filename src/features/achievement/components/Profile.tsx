import React from "react";
import Box from "@mui/material/Box";
import { ProfileIcon } from "@features/ui/component/ProfileIcon";
import { ColoredCircle } from "@features/color/components/ColoredCircle";
import {
  getColorCodeFromRating,
  calcFillPercent,
} from "@features/color/ratingColor";
import { UserInfo } from "@features/layout/userInfo";

type Props = {
  userInfo?: UserInfo;
};

export const Profile: React.FC<Props> = (props: Props) => {
  const { userInfo } = props;

  return (
    <Box>
      <Box sx={{ display: "inline-flex" }}>
        <ProfileIcon avatarUrl={userInfo?.avatar} />
        <Box>
          <Box sx={{ color: getColorCodeFromRating(userInfo?.rating) }}>
            <strong>{userInfo?.rank}</strong>
            <Box sx={{ fontSize: "20px" }}>
              <ColoredCircle
                color={getColorCodeFromRating(userInfo?.rating)}
                fillPercent={calcFillPercent(userInfo?.rating)}
              />
              <strong>{userInfo?.handle}</strong>
            </Box>
            <Box>Rating: {userInfo?.rating}</Box>
          </Box>
          <Box sx={{ fontSize: "14px" }}>
            <Box>Max Rating: {userInfo?.maxRating}</Box>
          </Box>
        </Box>
      </Box>
      <div>Organization: {userInfo?.organization}</div>
    </Box>
  );
};
