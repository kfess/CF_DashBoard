import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { Checkbox } from "@features/ui/component/Checkbox";

type Props = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
  excludeSolved: boolean;
  toggleExcludeSolved: () => void;
};

export const ExpectedParticipants: React.FC<Props> = ({
  control,
  errors,
  excludeSolved,
  toggleExcludeSolved,
}) => {
  return (
    <>
      <Checkbox
        title="Restriction of Problems"
        label="Don't suggest problems solved by expected participants"
        toggle={toggleExcludeSolved}
        description="When you check this, problems solved by expected participants are excluded"
      />
      {excludeSolved && <></>}
    </>
  );
};
