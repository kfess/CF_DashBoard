import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { labelsState } from "@features/bookmark/label.atom";
import { LabeledProblems } from "@features/bookmark/components/LabeledProblems";

export const LabelPage: React.FC = () => {
  const navigate = useNavigate();
  const { labelName } = useParams(); // path = /labels/:labelName
  const label = useRecoilValue(labelsState).find((l) => l.name === labelName);

  if (!label) {
    navigate("/contest");
  }

  return <>{label && <LabeledProblems label={label} />}</>;
};
