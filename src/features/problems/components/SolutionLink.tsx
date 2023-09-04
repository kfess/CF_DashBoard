import React from "react";
import TaskIcon from "@mui/icons-material/Task";
import { ExternalLink } from "@features/ui/component/ExternalLink";

type Props = {};

export const SolutionLink: React.FC<Props> = ({}) => {
  return <ExternalLink href="" label={<TaskIcon />} />;
};
