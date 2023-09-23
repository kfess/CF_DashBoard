import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Input } from "@features/ui/component/Input";
import { useUserProfile } from "@features/authentication/hooks/useUserProfile";
import { HeadLine } from "@features/layout/components/HeadLine";
import { Button } from "@features/ui/component/Button";
import { Snackbar } from "@features/ui/component/Snackbar";

export const Profile: React.FC = () => {
  const {
    githubId,
    githubUserName,
    codeforcesUsername,
    updateUsername,
    updateError,
  } = useUserProfile();

  const [newUsername, setNewUsername] = useState<string>("");

  // for error snackbar
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await updateUsername(newUsername);
      setNewUsername("");
    } catch (error) {
      setIsSnackbarOpen(true);
    }
  };

  return (
    <>
      <HeadLine title="Profile" />
      <Stack sx={{ my: 3 }} spacing={0.5}>
        <Typography variant="body1">GitHub ID: {githubId}</Typography>
        <Typography variant="body1">GitHub Name: {githubUserName}</Typography>
        <Typography variant="body1">
          Codeforces Username: {codeforcesUsername}
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={1}>
          <Input
            type="text"
            id="codeforcesUsername"
            placeholder={codeforcesUsername ?? "Codeforces Username"}
            value={newUsername}
            onChange={handleChange}
          />
          <Button type="submit">Update</Button>
        </Stack>
      </form>
      {updateError && (
        <Snackbar
          open={isSnackbarOpen}
          message={"An error occurred during updating codeforces username"}
          onClose={handleCloseSnackbar}
        />
      )}
    </>
  );
};
