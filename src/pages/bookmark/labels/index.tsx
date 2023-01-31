import React from "react";
import Divider from "@mui/material/Divider";
import { LabelCreator } from "@features/bookmark/components/LabelCreator";

export const LabelsPage: React.FC = () => {
  return (
    <>
      <h2 css={{ textAlign: "left" }}>Labels</h2>
      <Divider />
      <LabelCreator />
    </>
  );
};
