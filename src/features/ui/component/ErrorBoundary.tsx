import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FallbackProps } from "react-error-boundary";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { __Button } from "./Button";

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  return (
    <Container component="main" maxWidth="xs">
      <Stack direction="column" alignItems="center" m={8}>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 40 }} />
        <Typography variant="h5" gutterBottom>
          Something went wrong...
        </Typography>
        <Typography variant="body2" paragraph>
          {error.message}
        </Typography>
        <__Button onClick={resetErrorBoundary}>Try Again</__Button>
      </Stack>
    </Container>
  );
};
