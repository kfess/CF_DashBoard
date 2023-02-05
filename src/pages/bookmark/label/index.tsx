import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { LabeledProblems } from "@features/bookmark/components/LabeledProblems";
import { CustomBreadcrumbs } from "@features/ui/component/BreadCrumbs";

export const LabelPage: React.FC = () => {
  const { pathname } = useLocation();
  const { labelName } = useParams(); // path = /labels/:labelName

  return (
    <>
      <CustomBreadcrumbs path={pathname} />
      <LabeledProblems labelName={labelName} />
    </>
  );
};
