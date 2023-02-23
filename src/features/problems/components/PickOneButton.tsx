import React from "react";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import IconButton from "@mui/material/IconButton";

type Props = {};

export const PickOneButton: React.FC<Props> = (props: Props) => {
  const {} = props;

  return (
    <a
      href=""
      target="_blank"
      rel="noopener noreferrer"
      css={{
        display: "inline-flex",
        alignItems: "center",
        color: "green",
      }}
    >
      <IconButton size="small" disabled>
        <ShuffleIcon color="success" />
      </IconButton>
      Pick One
    </a>
  );
};
