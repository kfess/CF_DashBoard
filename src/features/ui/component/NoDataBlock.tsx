import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

type Props = {
  readonly title: string;
  readonly message: React.ReactNode;
  readonly height?: string;
};

export const NoDataMessage: React.FC<Props> = ({
  title,
  message,
  height = "200px",
}) => (
  <Stack
    direction="column"
    alignItems="center"
    justifyContent="center"
    minHeight={height}
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
