import React from "react";
import { useParams } from "react-router-dom";
import { LabeledProblems } from "@features/bookmark/components/LabeledProblems";

export const LabelPage: React.FC = () => {
  const { labelName } = useParams(); // path = /labels/:labelName

  return (
    <>
      <LabeledProblems labelName={labelName} />
    </>
  );
};
