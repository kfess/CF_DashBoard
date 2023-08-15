import React, { useState } from "react";
import { Snackbar as MUISnackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  readonly open: boolean;
  readonly message: string;
  readonly onClose: () => void;
};

export const Snackbar: React.FC<Props> = ({ open, message, onClose }) => {
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <MUISnackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      message={message}
      action={action}
    />
  );
};
