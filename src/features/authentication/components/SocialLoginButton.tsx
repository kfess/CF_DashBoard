import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";
import { Button } from "@features/ui/component/Button";

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

const providers = ["github", "google", "facebook", "twitter"] as const;
type Provider = typeof providers[number];

type Props = {
  provider: Provider;
};

export const SocialLoginButton: React.FC<Props> = ({ provider }) => {
  const { loggedIn } = useLoggedIn();

  const handleLogin = () => {
    const state = crypto.getRandomValues(new Uint32Array(10)).join("");
    localStorage.setItem("github_oauth_state", state);

    const redirectUri = encodeURIComponent(
      `${window.location.origin}/callback`
    );
    const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}&state=${state}`;
    window.location.href = url;
  };

  return (
    <>
      {!loggedIn && (
        <Button
          onClick={handleLogin}
          startIcon={provider === "github" ? <GitHubIcon /> : null}
          css={{
            backgroundColor: "#24292e",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#3b434a",
              "@media (hover: none)": {
                backgroundColor: "#24292e",
              },
            },
          }}
        >
          Sign in with {provider}
        </Button>
      )}
    </>
  );
};
