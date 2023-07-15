import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        marginTop: "auto",
        width: "100%",
        minHeight: "5rem",
        position: "relative",
        bottom: 0,
        padding: "1rem",
        color: "#fff",
        backgroundColor: "#333333",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © 2023 CF-Dashboard
        </Typography>
      </Container>
    </Box>
  );
};
