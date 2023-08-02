import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ProfileIcon } from "@features/ui/component/ProfileIcon";
import { ColoredCircle } from "@features/color/components/ColoredCircle";
import {
  getColorCodeFromRating,
  calcFillPercent,
} from "@features/color/ratingColor";
import { UserInfo } from "@features/layout/userInfo";
import { CF_PROFILE_URL } from "@constants/url";

type Props = {
  userInfo?: UserInfo;
};

// url には色をつけない
export const Profile: React.FC<Props> = ({ userInfo }) => {
  const userColor = getColorCodeFromRating(userInfo?.rating);

  return (
    <Box sx={{ p: 1, marginBottom: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <ProfileIcon avatarUrl={userInfo?.avatar} />
        <Box sx={{ marginLeft: 2 }}>
          <Typography variant="subtitle1" sx={{ color: userColor }}>
            {userInfo?.rank}
          </Typography>
          <Typography variant="h6" sx={{ color: userColor }}>
            <Box sx={{ display: "inline-flex", alignItems: "center" }}>
              <ColoredCircle
                color={userColor}
                fillPercent={calcFillPercent(userInfo?.rating)}
              />
              <Box sx={{ marginLeft: 1 }}>
                <a
                  href={`${CF_PROFILE_URL}/${userInfo?.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  css={{
                    textDecoration: "none",
                    color: userColor,
                  }}
                >
                  {userInfo?.handle}
                </a>
              </Box>
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: getColorCodeFromRating(userInfo?.rating),
            }}
          >
            Rating: {userInfo?.rating}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body1">Max Rating: {userInfo?.maxRating}</Typography>
      <Typography variant="body1">
        Organization: {userInfo?.organization || "-"}
      </Typography>
    </Box>
  );
};
