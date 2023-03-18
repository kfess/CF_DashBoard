import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useSessionData } from "@features/authentication/hooks/useSessionData";
import { useCodeforcesUsername } from "@features/authentication/hooks/useCodeforcesUsername";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";
import { AlertMessage } from "@features/ui/component/AlertDialog";

export const Profile: React.FC = () => {
  const { sessionData } = useSessionData();
  const { codeforcesUsername, updateUsername, isLoading } =
    useCodeforcesUsername();
  const { loggedIn } = useLoggedIn();

  const [newCodeforcesUsername, setNewCodeforcesUsername] =
    useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCodeforcesUsername(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
      await updateUsername(newCodeforcesUsername);
      setNewCodeforcesUsername("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  if (!loggedIn) {
    return (
      <AlertMessage
        title="Error"
        message="You must be logged in to view this page"
      />
    );
  }

  return (
    <>
      <h2>Profile</h2>
      <p>Codeforces Username:{codeforcesUsername}</p>
      <form onSubmit={handleSubmit}>
        <label></label>
        <input
          type="text"
          id="codeforcesUsername"
          value={newCodeforcesUsername}
          onChange={handleChange}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </form>
    </>
  );
};
