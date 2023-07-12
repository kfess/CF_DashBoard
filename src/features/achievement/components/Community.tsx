// import React from "react";
// import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
// import ExtensionIcon from "@mui/icons-material/Extension";
// import GroupIcon from "@mui/icons-material/Group";

// type Props = {
//   readonly contribution?: number;
//   readonly friendsOfCount?: number;
// };

// export const Community: React.FC<Props> = (props: Props) => {
//   const { contribution, friendsOfCount } = props;

//   return (
//     <Box sx={{ marginBottom: 1 }}>
//       <Box sx={{ marginTop: 1, marginBottom: 1 }}>
//         <strong>Community</strong>
//       </Box>
//       <Stack>
//         <Stack direction="row">
//           <ExtensionIcon
//             fontSize="small"
//             color="primary"
//             sx={{ marginRight: "10px" }}
//           />
//           <strong>{(contribution ?? 0).toLocaleString()}</strong>
//           <div css={{ fontSize: "14px", color: "gray", marginLeft: "8px" }}>
//             contributions
//           </div>
//         </Stack>
//         <Stack direction="row">
//           <GroupIcon
//             fontSize="small"
//             color="success"
//             sx={{ marginRight: "10px" }}
//           />
//           <strong>{(friendsOfCount ?? 0).toLocaleString()}</strong>
//           <div css={{ fontSize: "14px", color: "gray", marginLeft: "8px" }}>
//             friends
//           </div>
//         </Stack>
//       </Stack>
//     </Box>
//   );
// };

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

export const Community: React.FC<Props> = (props: Props) => {
  const { contribution, friendsOfCount } = props;

  return (
    <Box
      sx={{
        marginTop: 2,
        marginBottom: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Community
      </Typography>
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center">
          <ExtensionIcon
            fontSize="small"
            color="primary"
            sx={{ marginRight: "10px" }}
          />
          <Typography variant="body1">
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
          <GroupIcon
            fontSize="small"
            color="success"
            sx={{ marginRight: "10px" }}
          />
          <Typography variant="body1">
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
