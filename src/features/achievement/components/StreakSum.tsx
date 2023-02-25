import React from "react";
import Stack from "@mui/material/Stack";
import type { Submission } from "@features/submission/submission";
import { isACSubmission, uniqueDateSet } from "../processSubmission";

type Props = { submissions: Submission[] };

export const StreakSum: React.FC<Props> = (props: Props) => {
  const { submissions } = props;
  const ACSubmissions = submissions.filter(isACSubmission);
  const uniqueACDate = uniqueDateSet(ACSubmissions);

  return (
    <Stack direction="column" sx={{ alignItems: "center" }}>
      <div>
        <strong>Streak Sum</strong>
      </div>
      <div>
        <strong>{uniqueACDate.size.toLocaleString()}</strong>{" "}
        <span css={{ fontSize: "14px", color: "gray" }}>
          {uniqueACDate.size > 1 ? "days" : "day"}
        </span>
      </div>
    </Stack>
  );
};
