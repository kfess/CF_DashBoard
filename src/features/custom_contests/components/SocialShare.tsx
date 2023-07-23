import React from "react";
import Box from "@mui/material/Box";
import { SocialIcon } from "react-social-icons";

export const SocialShare: React.FC = () => {
  const url = window.location.href;

  return (
    <Box
      display="flex"
      sx={{
        "& > *": {
          mr: 1,
        },
        flexDirection: "row-reverse",
      }}
    >
      <SocialIcon
        network="linkedin"
        url={`
        https://www.linkedin.com/shareArticle?mini=true&url=${url}
        `}
        style={{ height: 30, width: 30 }}
      />
      <SocialIcon
        network="facebook"
        url={`
        https://www.facebook.com/sharer/sharer.php?u=${url}
        `}
        style={{ height: 30, width: 30 }}
      />
      <SocialIcon
        network="twitter"
        url={`
        https://twitter.com/intent/tweet?text=Join%20my%20custom%20codeforces%20contest%20at%20${url}
      `}
        style={{ height: 30, width: 30 }}
      />
    </Box>
  );
};
