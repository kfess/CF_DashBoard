import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";
import { SocialLoginButton } from "@features/authentication/components/SocialLoginButton";

export const LoginPage: React.FC = () => {
  const { loggedIn } = useLoggedIn();
  const navigate = useNavigate();

  if (loggedIn) {
    navigate("/");
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="40vh"
      spacing={2}
      px={2}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" align="center">
              CF-DashBoard
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h6" align="center" gutterBottom>
              Authentication
            </Typography>
            <Typography align="center">
              <SocialLoginButton provider="github" />
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
