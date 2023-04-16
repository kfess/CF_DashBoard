import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useUserProfile } from "@features/authentication/hooks/useUserProfile";

export const Profile: React.FC = () => {
  const { githubId, githubUserName, codeforcesUsername, updateUsername } =
    useUserProfile();

  const [newUsername, setNewUsername] = useState<string>(
    codeforcesUsername ?? ""
  );
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
      <h2>Profile</h2>
      <p>GitHub ID: {githubId}</p>
      <p>GitHub Name: {githubUserName}</p>
      <p>Codeforces Username:{codeforcesUsername}</p>
      <form onSubmit={handleSubmit}>
        <label></label>
        <input
          type="text"
          id="codeforcesUsername"
          value={newUsername}
          onChange={handleChange}
        />
        <Button type="submit">Update</Button>
      </form>
    </>
  );
};
