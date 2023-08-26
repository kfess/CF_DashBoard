import { useEffect, useRef } from "react";
import { useGithubOauth } from "@features/authentication/hooks/useGithubOauth";
import { CircularProgress } from "@features/ui/component/CircularProgress";

export default function Callback() {
  const initial = useRef<boolean>(false);

  const githubOauth = useGithubOauth();

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;

      const params = new URLSearchParams(window.location.search);
      const state = params.get("state");
      const code = params.get("code");
      console.log("here!");
      githubOauth.mutate({ code, state });
    }
  }, []);

  return (
    <div>
      <CircularProgress />
    </div>
  );
}
