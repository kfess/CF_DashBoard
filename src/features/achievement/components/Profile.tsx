import React from "react";
import Box from "@mui/material/Box";
import { useFetchUserInfo } from "@features/layout/useUserInfo";
import { ProfileIcon } from "@features/ui/component/ProfileIcon";
import { ColoredCircle } from "@features/color/ColoredCircle";
import { getColorCodeFromRating } from "@features/color/ratingColor";

type Props = {
  userId: string;
};

export const Profile: React.FC<Props> = (props: Props) => {
  const { userId } = props;
  const userInfo = useFetchUserInfo({ userId }).data;

  return (
    <Box>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
        <Box gridColumn="span 4" sx={{ p: 1 }}>
          <ProfileIcon avatarUrl={userInfo?.avatar} />
        </Box>
        <Box gridColumn="span 8" sx={{ p: 1 }}>
          <div css={{ color: getColorCodeFromRating(userInfo?.rating) }}>
            {userInfo?.rank}
          </div>
          <div css={{ color: getColorCodeFromRating(userInfo?.rating) }}>
            <ColoredCircle color={getColorCodeFromRating(userInfo?.rating)} />
            {userInfo?.handle}
          </div>
        </Box>
      </Box>
      <div>Contribution: {userInfo?.contribution}</div>
      <div>friends: {userInfo?.friendOfCount} users</div>
      <div>Max Rank: {userInfo?.maxRank}</div>
      <div>Max Rating: {userInfo?.maxRating}</div>
      <div>Organization: {userInfo?.organization}</div>
    </Box>
  );
};
