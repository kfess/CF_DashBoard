import React from "react";
import Divider from "@mui/material/Divider";
import { LabelCreator } from "@features/bookmark/components/LabelCreator";
import { LabelItems } from "@features/bookmark/components/LabelsList";

export const LabelsPage: React.FC = () => {
  return (
    <>
      <h2 css={{ textAlign: "left" }}>Bookmark Labels</h2>
      <Divider />
      <LabelCreator />
      <LabelItems />
    </>
  );
};
