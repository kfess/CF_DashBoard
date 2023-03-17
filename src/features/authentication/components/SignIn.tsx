import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";

const GITHUB_CLIENT_ID = "d3222c18172256b27ea6";

export const SignInButton: React.FC = () => {
  const handleClick = () => {
    const state = crypto.getRandomValues(new Uint32Array(10)).join("");
    localStorage.setItem("github_oauth_state", state);

    const redirectUri = encodeURIComponent(
      `${window.location.origin}/callback`
    );
    const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}&state=${state}`;
    window.location.href = url;
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        startIcon={<GitHubIcon />}
        sx={{ textTransform: "none" }}
      >
        Sign in
      </Button>
    </div>
  );
};
