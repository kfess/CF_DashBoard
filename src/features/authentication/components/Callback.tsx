import { useEffect } from "react";
import { useGithubOauth } from "@features/authentication/hooks/useGithubOauth";
import CircularProgress from "@mui/material/CircularProgress";

export default function Callback() {
  const githubOauth = useGithubOauth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const state = params.get("state");
    const code = params.get("code");
    githubOauth.mutate({ code, state });
  }, []);

  return (
    <div>
      <CircularProgress />
    </div>
  );
}
