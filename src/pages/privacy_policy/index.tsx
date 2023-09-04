import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ExternalLink } from "@features/ui/component/ExternalLink";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} my={2}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Privacy Policy
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography paragraph variant="body1" my={2}>
            By using our service, CF DashBoard, you're agreeing to our privacy
            policy. To improve our service, we use cookies for access analysis.
            We employ Google Analytics for this analysis. Google Analytics uses
            cookies to gather information that does not identify you personally.
            For more information on how this data is collected and processed,
            please refer to{" "}
            <ExternalLink
              href="https://policies.google.com/technologies/partner-sites"
              label="this"
              sx={{ color: (theme) => theme.palette.primary.main }}
            />
            .
          </Typography>
          <Box mt={4}>
            <Typography variant="h5" component="h2" gutterBottom>
              Updates
            </Typography>
            <Typography component="div">
              <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
                <Typography component="li" variant="body1">
                  2023/08/03
                </Typography>
              </ul>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PrivacyPolicyPage;
