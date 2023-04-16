import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

export const SignInOutButton: React.FC = () => {
  const { logout, loggedIn } = useLoggedIn();

  const handleLogin = () => {
    const state = crypto.getRandomValues(new Uint32Array(10)).join("");
    localStorage.setItem("github_oauth_state", state);

    const redirectUri = encodeURIComponent(
      `${window.location.origin}/callback`
    );
    const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}&state=${state}`;
    window.location.href = url;
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <Button
        onClick={loggedIn ? handleLogout : handleLogin}
        startIcon={<GitHubIcon />}
        sx={{ textTransform: "none" }}
      >
        {loggedIn ? "Log out" : "Sign in"}
      </Button>
    </div>
  );
};
