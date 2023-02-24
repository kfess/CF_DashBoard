import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LabeledProblems } from "@features/bookmark/components/LabeledProblems";
import { labelSelectors } from "@features/bookmark/labelActions";

export const LabelPage: React.FC = () => {
  const navigate = useNavigate();
  const { labelName } = useParams(); // path = /labels/:labelName
  const label = labelSelectors.useLabel(labelName ?? "");

  useEffect(() => {
    // if label does not exist, then go back to /labels page
    if (!label) {
      navigate("/labels");
    }
  }, []);

  return <>{label && <LabeledProblems label={label} />}</>;
};
