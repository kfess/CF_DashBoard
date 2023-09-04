import React, { ReactNode } from "react";
import Tooltip from "@mui/material/Tooltip";
import { Chip } from "@features/ui/component/Chip";

type Props = {
  title: ReactNode;
};

export const HelpToolTip: React.FC<Props> = ({ title }) => {
  return (
    <Tooltip title={title} enterTouchDelay={0} arrow>
      <Chip label="?" />
    </Tooltip>
  );
};
