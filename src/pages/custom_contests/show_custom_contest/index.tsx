import React from "react";
import { useParams } from "react-router-dom";

export const ShowCustomContestPage: React.FC = () => {
  const params = useParams();

  return (
    <>
      {params.contestId}
      <div>this is Show CustomContestPage</div>
    </>
  );
};
