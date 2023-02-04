import React from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { labelsState } from "@features/bookmark/label.atom";
import { LabelNameChip } from "./LabelIcon";

export const Label: React.FC = () => {
  const { labelName } = useParams(); // path = bookmark/labels/:labelName
  const label = useRecoilValue(labelsState).find((l) => l.name === labelName);

  return (
    <>
      {label && (
        <>
          <LabelNameChip name={label.name} color={label.color} mode="View" />
          {label.problems.map((l) => (
            <>
              <div>contestId: {l.contestId}</div>
              <div>index: {l.index}</div>
              <div>name: {l.name}</div>
            </>
          ))}
        </>
      )}
    </>
  );
};
