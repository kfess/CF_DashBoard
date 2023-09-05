import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Input } from "@features/ui/component/Input";
import { useUserProfile } from "@features/authentication/hooks/useUserProfile";
import { HeadLine } from "@features/layout/components/HeadLine";
import { Button } from "@features/ui/component/Button";

export const Profile: React.FC = () => {
  const { githubId, githubUserName, codeforcesUsername, updateUsername } =
    useUserProfile();

  const [newUsername, setNewUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
      await updateUsername(newUsername);
      setNewUsername("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <>
      <HeadLine title="Profile" />
      <Box sx={{ my: 3 }}>
        <Typography variant="body1">GitHub ID: {githubId}</Typography>
        <Typography variant="body1">GitHub Name: {githubUserName}</Typography>
        <Typography variant="body1">
          Codeforces Username: {codeforcesUsername}
        </Typography>
      </Box>
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
    </>
  );
};
