import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Google, Facebook, Twitter } from "@mui/icons-material";
import { SignInOutButton } from "@features/authentication/components/SignInOut";

export const LoginPage: React.FC = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      spacing={2}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Sign in with social account
            </Typography>
            <SignInOutButton />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
