import React, { useState } from "react";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const GitHubStars: React.FC = () => {
  const [starsCount, setStarsCount] = useState(0);

  return (
    <Button
      startIcon={<StarBorderIcon />}
      variant="outlined"
      sx={{
        color: "rgba(36, 41, 46, 0.7)",
        borderColor: "rgba(27, 31, 35, 0.15)",
        textTransform: "none",
        minWidth: "auto",
        padding: "2px 5px",
      }}
    >
      <Box display="flex" flexDirection="row" alignItems="center" gap="4px">
        <Typography variant="body2">Star</Typography>
        <Typography variant="body2">{starsCount.toLocaleString()}</Typography>
      </Box>
    </Button>
  );
};
