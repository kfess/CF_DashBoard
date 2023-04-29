import React from "react";
import { CreateContestInfoForm } from "@features/custom_contests/components/CreateContestInfoForm";
import { HeadLine } from "@features/layout/components/HeadLine";
import { CreateContest } from "@features/custom_contests/components/Form/CreateContest";

export const CreateCustomContestPage: React.FC = () => {
  return (
    <>
      <HeadLine title="Create Custom Contest" />
      {/* <CreateContestInfoForm /> */}
      <CreateContest />
    </>
  );
};
