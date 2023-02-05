import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
      <Button variant="text" onClick={handleClickOpen}>
        {title}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle css={{ color: "red" }}>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText css={{ color: "red" }}>
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              deleteFn(deleteTarget);
              setOpen(false);
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
