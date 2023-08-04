import React, { ReactNode } from "react";
import Tooltip from "@mui/material/Tooltip";

type Props = {
  title: ReactNode;
};

export const HelpToolTip: React.FC<Props> = ({ title }) => {
  return (
    <Tooltip title={title} enterTouchDelay={0}>
      <div>?</div>
    </Tooltip>
  );
};
