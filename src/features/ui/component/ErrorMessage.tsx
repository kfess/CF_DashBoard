import React from "react";
import Box from "@mui/material/Box";

type Props = {
  readonly message: string | undefined | null;
};

export const ErrorMessage: React.FC<Props> = ({ message }) => {
  return message ? <Box sx={{ color: "red" }}>{message}</Box> : null;
};
