import React from "react";
import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";

type Props = {
  readonly avatarUrl?: string;
};

export const ProfileIcon: React.FC<Props> = ({ avatarUrl }) => {
  return (
    <Box sx={{ m: 1 }}>
      {avatarUrl ? (
        <Box
          component="img"
          sx={{
            width: 80,
            height: 80,
            borderRadius: 2,
            color: "white",
          }}
          src={avatarUrl}
          alt="avatar"
        />
      ) : (
        <SvgIcon
          sx={{
            width: 80,
            height: 80,
            color: "white",
            borderRadius: 2,
            backgroundColor: "gray",
            opacity: 0.5,
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z" />
          </svg>
        </SvgIcon>
      )}
    </Box>
  );
};
