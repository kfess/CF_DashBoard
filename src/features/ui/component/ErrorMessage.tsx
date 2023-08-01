import React from "react";

type Props = {
  readonly message: string | undefined | null;
};

export const ErrorMessage: React.FC<Props> = ({ message }) => {
  return message ? <div css={{ color: "red" }}>{message}</div> : null;
};
