import React from "react";

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
      link
    </a>
  );
};
