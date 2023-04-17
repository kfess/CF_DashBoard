import React, { useState } from "react";
import { Box } from "@mui/material";
import { Button } from "@features/ui/component/Button";
import { Input } from "@features/ui/component/Input";
import { useUserProfile } from "@features/authentication/hooks/useUserProfile";
import { string } from "zod";

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
      {String(githubId)}
      <h2>Profile</h2>
      <p>GitHub ID: {githubId}</p>
      <p>GitHub Name: {githubUserName}</p>
      <p>Codeforces Username: {codeforcesUsername}</p>
      <form onSubmit={handleSubmit}>
        <label></label>
        <Box sx={{ width: "50%" }}>
          <Input
            type="text"
            id="codeforcesUsername"
            placeholder={codeforcesUsername ?? "Codeforces Username"}
            value={newUsername}
            onChange={handleChange}
          />
          <Button type="submit">Update</Button>
        </Box>
      </form>
    </>
  );
};
