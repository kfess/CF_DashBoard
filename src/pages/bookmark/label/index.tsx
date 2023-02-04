import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Label } from "@features/bookmark/components/Label";
import { CustomBreadcrumbs } from "@features/ui/component/BreadCrumbs";

export const LabelPage: React.FC = () => {
  const { pathname } = useLocation();
  const { labelName } = useParams(); // path = bookmark/labels/:labelName

  return (
    <>
      <CustomBreadcrumbs path={pathname} />
      <Label labelName={labelName} />
    </>
  );
};
