import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WarningIcon from "@mui/icons-material/Warning";
import { styled } from "@mui/system";

const IconContainer = styled("div")(({ theme }) => ({
  textAlign: "center",
  fontSize: "4rem",
  color: theme.palette.warning.main,
}));

export const SettingPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Under Construction
        </Typography>
      </Box>
      <IconContainer>
        <WarningIcon fontSize="inherit" />
      </IconContainer>
      <Box my={4}>
        <Typography variant="h6" component="h2" gutterBottom align="center">
          This page is currently under construction.
        </Typography>
      </Box>
      <Typography align="center">
        We're working hard to bring you this content soon. Please check back
        later.
      </Typography>
    </Container>
  );
};
