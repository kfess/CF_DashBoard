import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

// type Props = { children: ReactNode };

// export const NoDataBlock: React.FC<Props> = (props: Props) => {
//   const { children } = props;

//   return (
//     <Box
//       sx={{
//         m: 1,
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         borderStyle: "solid",
//         borderRadius: "6px",
//         borderColor: "#c0c0c0",
//         borderWidth: "1px",
//         height: "100px",
//         fontSize: "1.3rem",
//         color: "gray",
//       }}
//     >
//       {children}
//     </Box>
//   );
// };

type Props = {
  readonly title: string;
  readonly message: string;
};

export const NoDataMessage: React.FC<Props> = ({ title, message }) => (
  <Stack
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{
      minHeight: "200px",
      color: "grey.600",
    }}
  >
    <Typography variant="h5" align="center">
      {title}
    </Typography>
    <Typography variant="body1" align="center" sx={{ whiteSpace: "pre-wrap" }}>
      {message}
    </Typography>
  </Stack>
);
