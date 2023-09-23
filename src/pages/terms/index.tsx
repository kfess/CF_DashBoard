import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const TermsPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} py={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
        <Grid item>
          <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              Terms of Service
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            1. Introduction
          </Typography>
          <Typography paragraph>
            Welcome to our Terms of Service. This document describes the terms
            and conditions that govern your use of our services.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            2. Changes to the Terms
          </Typography>
          <Typography paragraph>
            We may modify the Terms at any time, in our sole discretion. If we
            do so, we&apos;ll let you know either by posting the modified Terms
            on the Site or through other communications.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            3. Codeforces Data and API Usage
          </Typography>
          <Typography paragraph>
            Our app uses data provided by Codeforces, and we adhere to their API
            usage policies. We do not claim ownership of the data displayed
            within our app, and any rights to the data belong to their
            respective owners. You agree to use the data displayed within our
            app solely for your personal, non-commercial use and in compliance
            with any restrictions set by Codeforces.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            4. User Conduct
          </Typography>
          <Typography paragraph>
            You agree not to engage in any of the following activities while
            using our app: (a) use our app for any illegal or unauthorized
            purpose; (b) access or tamper with non-public areas of the app, our
            computer systems, or the technical delivery systems of our
            providers; (c) probe, scan, or test the vulnerability of any system
            or network or breach or circumvent any security or authentication
            measures; (d) interfere with, or attempt to interfere with, the
            access of any user, host, or network.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            5. Intellectual Property Rights
          </Typography>
          <Typography paragraph>
            All intellectual property rights, including but not limited to,
            copyrights, trademarks, and patents, in our app and its content
            (including but not limited to text, graphics, images, logos, and
            software) are owned by or licensed to us. You may not copy,
            reproduce, distribute, modify, create derivative works, or publicly
            display any content from our app without our prior written consent
            or the appropriate rights holder.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            6. Disclaimer of Warranties and Limitation of Liability
          </Typography>
          <Typography paragraph>
            Our app is provided on an &quot;as is&quot; and &quot;as
            available&quot; basis. We make no representations or warranties of
            any kind, express or implied, as to the operation of our app, the
            accuracy or completeness of the content, or the suitability of the
            services for any particular purpose. To the fullest extent permitted
            by law, we disclaim all warranties, express or implied, including
            but not limited to, implied warranties of merchantability and
            fitness for a particular purpose. We will not be liable for any
            damages of any kind arising from the use of our app, including but
            not limited to, direct, indirect, incidental, punitive, and
            consequential damages.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            7. Indemnification
          </Typography>
          <Typography paragraph>
            You agree to indemnify, defend, and hold harmless us, our
            affiliates, officers, directors, employees, consultants, agents, and
            representatives from any and all third-party claims, losses,
            liability, damages, and/or costs (including reasonable attorney fees
            and costs) arising from your access to or use of our app, your
            violation of these Terms of Service, or your infringement of any
            intellectual property or other right of any person or entity.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            8. Governing Law and Jurisdiction
          </Typography>
          <Typography paragraph>
            These Terms of Service shall be governed by and construed in
            accordance with the laws of the applicable jurisdiction, without
            regard to its conflict of law provisions. You agree to submit to the
            personal and exclusive jurisdiction of the courts located within the
            applicable jurisdiction for the resolution of any disputes arising
            out of or relating to these Terms of Service.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            9. Severability
          </Typography>
          <Typography paragraph>
            If any provision of these Terms of Service is deemed invalid, void,
            or for any reason unenforceable, that provision shall be deemed
            severable and shall not affect the validity and enforceability of
            any remaining provisions.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
