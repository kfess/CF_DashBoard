import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GitHubButton from "react-github-btn";

export const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        marginTop: "auto",
        width: "100%",
        minHeight: "8rem",
        position: "relative",
        bottom: 0,
        padding: "1rem",
        color: "#fff",
        backgroundColor: "#2E3436",
        boxSizing: "border-box",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: ["column", "row"],
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: ["center", "initial"],
          }}
        >
          <Typography variant="body1" mb={["0.5rem", "0"]}>
            © 2023 CF-DashBoard
          </Typography>
          <Stack direction="row" spacing={1}>
            <GitHubButton
              href="https://github.com/kfess/CF_DashBoard"
              data-icon="octicon-star"
              data-size="small"
              data-show-count="true"
              aria-label="Star kfess/CF_DashBoard on GitHub"
            >
              Star
            </GitHubButton>
            <GitHubButton
              href="https://github.com/kfess"
              data-size="small"
              data-show-count="true"
              aria-label="Follow @kfess on GitHub"
            >
              Follow @kfess
            </GitHubButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
