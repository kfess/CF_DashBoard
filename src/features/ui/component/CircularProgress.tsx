import React from "react";
import Stack from "@mui/material/Stack";
import { CircularProgress as MUICircularProgress } from "@mui/material";

export const CircularProgress: React.FC = () => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      height="10vh"
      color={(theme) => theme.palette.primary.main}
    >
      <MUICircularProgress />
    </Stack>
  );
};
