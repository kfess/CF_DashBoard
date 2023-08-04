import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} sx={{ my: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Privacy Policy
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography paragraph variant="body1" sx={{ my: 2 }}>
            By using our service, CF DashBoard, you're agreeing to our privacy
            policy. To improve our service, we use cookies for access analysis.
            We employ Google Analytics for this analysis. Google Analytics uses
            cookies to gather information that does not identify you personally.
            For more information on how this data is collected and processed,
            please refer to{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              css={{
                color: "#9146FF",
                ":hover": {
                  color: "#9146FF",
                  textDecoration: "underline",
                },
              }}
            >
              this
            </a>
            .
          </Typography>
          <Box mt={4}>
            <Typography variant="h5" component="h2" gutterBottom>
              Updates
            </Typography>
            <Typography variant="body1">
              <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
                <li>2023/08/03</li>
              </ul>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
