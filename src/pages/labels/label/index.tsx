import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useNavigate, useParams } from "react-router-dom";
import { LabeledProblems } from "@features/bookmark/components/LabeledProblems";
import { labelSelectors } from "@features/bookmark/labelActions";
import { HeadLine } from "@features/layout/components/HeadLine";
import { Typography } from "@mui/material";

export const LabelPage: React.FC = () => {
  const navigate = useNavigate();
  const { labelName } = useParams(); // path = /labels/:labelName
  const label = labelSelectors.useLabel(labelName ?? "");

  useEffect(() => {
    // if label does not exist, then go back to /labels page
    if (!label) {
      navigate("/labels");
    }
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
          <HeadLine title={`${labelName} Problems`} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {label && (
                <>
                  {label.problems.length > 0 && (
                    <Box
                      sx={{
                        p: 2,
                        marginTop: "20px",
                        marginBottom: "20px",
                        display: "flex",
                        flexWrap: "wrap",
                        fontSize: "1.1rem",
                        backgroundColor: "#ffffff",
                        borderStyle: "solid",
                        borderRadius: "4px",
                        borderColor: "#c0c0c0",
                        borderWidth: "0.8px",
                        borderLeftColor: "green",
                        borderLeftWidth: "5px",
                      }}
                    >
                      <Typography variant="body1" color="text.main">
                        {label?.description}
                      </Typography>
                    </Box>
                  )}
                  <LabeledProblems label={label} />
                </>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
