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
    // this implementation is only for msw.
    // because msw need a few seconds to start, setTimeout 1000 ms.
    // setTimeout(() => {
    //   githubOauth.mutate({ code, state });
    // }, 1000);
  }, []);

  return (
    <div>
      <CircularProgress />
    </div>
  );
}
