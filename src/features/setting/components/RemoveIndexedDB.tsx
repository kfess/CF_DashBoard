import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Button } from "@features/ui/component/Button";
import { deleteAllData } from "@indexedDB/db";

export const RemoveIndexedDB: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box mt={3}>
      <Box
        component="label"
        display="block"
        htmlFor="difficulty-from-input"
        fontWeight="bold"
      >
        Delete All Label Data
      </Box>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        alignContent="space-around"
      >
        <Box>when you click this button, all label data will be deleted.</Box>
        <Button
          onClick={() => {
            handleClickOpen();
          }}
          variant="outlined"
          color="error"
        >
          Delete All Data
        </Button>
      </Stack>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent id="alert-dialog-description">
          <DialogContentText>
            Are you sure you want to delete all Label data?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Disagree
          </Button>
          <Button
            onClick={() => {
              deleteAllData();
              handleClose();
            }}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
