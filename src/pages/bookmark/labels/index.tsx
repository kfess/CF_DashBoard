import React from "react";
import { useLocation } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { CustomBreadcrumbs } from "@features/ui/component/BreadCrumbs";
import { LabelCreator } from "@features/bookmark/components/LabelCreator";
import { LabelItems } from "@features/bookmark/components/LabelsList";

export const LabelsPage: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      <CustomBreadcrumbs path={pathname} />
      <h2 css={{ textAlign: "left" }}>Bookmark Labels</h2>
      <Divider />
      <LabelCreator />
      <LabelItems />
    </>
  );
};
