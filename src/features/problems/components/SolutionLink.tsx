import React from "react";
import TaskIcon from "@mui/icons-material/Task";

type Props = {};

export const SolutionLink: React.FC<Props> = (props: Props) => {
  const {} = props;

  return (
    <a
      href=""
      target="_blank"
      rel="noopener noreferrer"
      css={{ textDecoration: "underline" }}
    >
      <TaskIcon />
    </a>
  );
};
