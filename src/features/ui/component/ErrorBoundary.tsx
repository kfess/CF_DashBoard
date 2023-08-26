import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FallbackProps } from "react-error-boundary";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { _Button } from "./Button";

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <ErrorOutlineIcon color="error" style={{ fontSize: 40 }} />
        <Typography variant="h5" gutterBottom>
          Something went wrong...
        </Typography>
        <Typography variant="body2" paragraph>
          {error.message}
        </Typography>
        <_Button onClick={resetErrorBoundary}>Try Again</_Button>
      </Box>
    </Container>
  );
};
