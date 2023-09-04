import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

type Props = {
  readonly title: string;
  readonly message: React.ReactNode;
};

export const NoDataMessage: React.FC<Props> = ({ title, message }) => (
  <Stack
    direction="column"
    alignItems="center"
    justifyContent="center"
    minHeight="200px"
    color="grey.600"
  >
    <Typography variant="h5" align="center">
      {title}
    </Typography>
    <Typography variant="body1" align="center" sx={{ whiteSpace: "pre-wrap" }}>
      {message}
    </Typography>
  </Stack>
);
