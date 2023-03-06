import React, { ReactNode } from "react";
import Box from "@mui/material/Box";

type Props = { children: ReactNode };

export const NoDataBlock: React.FC<Props> = (props: Props) => {
  const { children } = props;

  return (
    <Box
      sx={{
        m: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderStyle: "solid",
        borderRadius: "6px",
        borderColor: "#c0c0c0",
        borderWidth: "1px",
        height: "100px",
        fontSize: "1.3rem",
        color: "gray",
      }}
    >
      {children}
    </Box>
  );
};
