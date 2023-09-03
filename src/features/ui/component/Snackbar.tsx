import React from "react";
import { Snackbar as MUISnackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@features/ui/component/IconButton";

interface Props extends React.ComponentProps<typeof MUISnackbar> {
  readonly open: boolean;
  readonly message: string;
  readonly onClose: () => void;
}

export const Snackbar: React.FC<Props> = ({
  open,
  message,
  onClose,
  ...restProps
}) => {
  const action = (
    <IconButton
      icon={<CloseIcon />}
      size="small"
      aria-label="close"
      color="inherit"
      onClick={onClose}
    />
  );

  return (
    <MUISnackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      message={message}
      action={action}
      {...restProps}
    />
  );
};
