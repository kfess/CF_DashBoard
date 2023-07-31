import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { _Button } from "@features/ui/component/Button";

type Props<T extends string | number> = {
  title: string;
  dialogTitle: string;
  dialogText: string;
  deleteTarget: T;
  deleteFn: (arg: T) => void;
};

export const ButtonWithAlertDialog = <T extends string | number>(
  props: Props<T>
) => {
  const { title, dialogTitle, dialogText, deleteTarget, deleteFn } = props;

  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <_Button
        onClick={handleClickOpen}
        css={{
          textTransform: "none",
          "&:hover": { textDecorationLine: "underline" },
        }}
        color="#E55B66"
      >
        {title}
      </_Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            <Alert severity="error">
              <AlertTitle>{dialogTitle}</AlertTitle>
              {dialogText}
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <_Button onClick={handleClose} css={{ textTransform: "none" }}>
            Cancel
          </_Button>
          <_Button
            onClick={() => {
              deleteFn(deleteTarget);
              setOpen(false);
            }}
            color="#E55B66"
            css={{ textTransform: "none" }}
          >
            OK
          </_Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

type MessageProps = { title: string; message: string };

export const AlertMessage: React.FC<MessageProps> = (props: MessageProps) => {
  const { title, message } = props;

  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  if (!open) {
    return null;
  }

  return (
    <Alert onClose={handleClose} severity="error" css={{ margin: "16px 8px" }}>
      <AlertTitle css={{ textAlign: "left" }}>{title}</AlertTitle>
      {message}
    </Alert>
  );
};
