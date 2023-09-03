import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ExtensionIcon from "@mui/icons-material/Extension";
import GroupIcon from "@mui/icons-material/Group";

type Props = {
  readonly contribution?: number;
  readonly friendsOfCount?: number;
};

export const Community: React.FC<Props> = ({
  contribution,
  friendsOfCount,
}) => {
  return (
    <Box mt={1} mb={2}>
      <Typography variant="h6" gutterBottom>
        Community
      </Typography>
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center">
          <ExtensionIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
          <Typography
            variant="body1"
            color={(theme) => theme.palette.primary.main}
            fontWeight="fontWeightBold"
          >
            {(contribution ?? 0).toLocaleString()}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginLeft: "8px" }}
          >
            contributions
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <GroupIcon fontSize="small" color="success" sx={{ mr: 1 }} />
          <Typography
            variant="body1"
            color={(theme) => theme.palette.primary.main}
            fontWeight="fontWeightBold"
          >
            {(friendsOfCount ?? 0).toLocaleString()}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginLeft: "8px" }}
          >
            friends
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};
