import React from "react";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

type Props = {
  to: string;
  title: React.ReactNode;
};

export const InternalLink: React.FC<Props> = ({ to, title }) => {
  return (
    <NavLink to={to}>
      <Typography
        variant="inherit"
        sx={{
          color: (theme) => theme.palette.text.primary,
          "&:hover": {
            color: (theme) => theme.palette.primary.main,
          },
        }}
      >
        {title}
      </Typography>
    </NavLink>
  );
};
