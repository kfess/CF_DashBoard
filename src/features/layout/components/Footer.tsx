import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GitHubButton from "react-github-btn";
import { useTheme } from "@mui/material/styles";

export const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        marginTop: "auto",
        minHeight: "10rem",
        p: 2,
        borderTop: "1px solid",
        borderColor: "divider",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={["column", "row"]}
          justifyContent="space-between"
          alignItems={["center", "initial"]}
        >
          <Typography variant="body1">© 2023 CF-DashBoard</Typography>
          <Stack direction="row" spacing={1}>
            <GitHubButton
              href="https://github.com/kfess/CF_DashBoard"
              data-icon="octicon-star"
              data-size="large"
              data-show-count="true"
              aria-label="Star kfess/CF_DashBoard on GitHub"
            >
              Star
            </GitHubButton>
            <GitHubButton
              href="https://github.com/kfess"
              data-size="large"
              data-show-count="true"
              aria-label="Follow @kfess on GitHub"
            >
              Follow @kfess
            </GitHubButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
