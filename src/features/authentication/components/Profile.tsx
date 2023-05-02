import React, { useState } from "react";
import { Box } from "@mui/material";
import { Button } from "@features/ui/component/Button";
import { Input } from "@features/ui/component/Input";
import { useUserProfile } from "@features/authentication/hooks/useUserProfile";
import { HeadLine } from "@features/layout/components/HeadLine";

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
      <p>GitHub ID: {githubId}</p>
      <p>GitHub Name: {githubUserName}</p>
      <p>Codeforces Username: {codeforcesUsername}</p>
      <form onSubmit={handleSubmit}>
        <Box sx={{ width: "50%" }}>
          <Input
            type="text"
            id="codeforcesUsername"
            placeholder={codeforcesUsername ?? "Codeforces Username"}
            value={newUsername}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ p: 1 }}>
          <Button type="submit">Update</Button>
        </Box>
      </form>
    </>
  );
};
