import React from "react";
import { useLocation } from "react-router-dom";

export const ShowCustomContestPage: React.FC = () => {
  const pathname = useLocation().pathname;
  const contestId = pathname.split("/")[pathname.split("/").length - 1];

  return (
    <>
      {contestId}
      <div>this is Show CustomContestPage</div>
    </>
  );
};
