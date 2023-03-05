import React from "react";
import Divider from "@mui/material/Divider";
import { CreateContestInfoForm } from "@features/custom_contests/components/CreateContestInfoForm";

export const CreateCustomContestPage: React.FC = () => {
  return (
    <>
      <h2>Create Custom Contest</h2>
      <Divider />
      <CreateContestInfoForm />
    </>
  );
};
