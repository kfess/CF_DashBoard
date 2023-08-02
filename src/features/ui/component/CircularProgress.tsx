import React from "react";
import Box from "@mui/material/Box";
import { CircularProgress as MUICircularProgress } from "@mui/material";

export const CircularProgress: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "10vh",
      }}
    >
      <MUICircularProgress sx={{color:"#9246FF"}} />
    </Box>
  );
};
