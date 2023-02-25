import React from "react";
import Stack from "@mui/material/Stack";
import type { Submission } from "@features/submission/submission";
import {
  isACSubmission,
  filterUniqueSubmissions,
} from "@features/achievement/processSubmission";
import { isLastMonth, isLastYear } from "@helpers/index";

type Props = { submissions: Submission[] };

export const UniqueACCount: React.FC<Props> = (props: Props) => {
  const { submissions } = props;

  const ACSubs = submissions.filter(isACSubmission);
  const uniqueACSubs = filterUniqueSubmissions(ACSubs);
  const lastYearUniqueACSubs = uniqueACSubs.filter((sub) =>
    isLastYear(sub.creationTimeSeconds)
  );
  const lastMonthYniqueACSubs = uniqueACSubs.filter((sub) =>
    isLastMonth(sub.creationTimeSeconds)
  );

  return (
    <>
      <div>
        <strong>Accepted Count</strong>
      </div>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          m: 1,
        }}
      >
        <Stack direction="column" sx={{ alignItems: "center" }}>
          <div>
            <strong>Total</strong>
          </div>
          <div>
            <strong>{uniqueACSubs.length}</strong>{" "}
            <span css={{ fontSize: "14px", color: "gray" }}>
              {uniqueACSubs.length > 1 ? "problems" : "problem"} solved
            </span>
          </div>
        </Stack>
        <Stack direction="column" sx={{ alignItems: "center" }}>
          <div>
            <strong>Last Year</strong>
          </div>
          <div>
            <strong>{lastYearUniqueACSubs.length}</strong>{" "}
            <span css={{ fontSize: "14px", color: "gray" }}>
              {lastYearUniqueACSubs.length > 1 ? "problems" : "problem"} solved
            </span>
          </div>
        </Stack>
        <Stack direction="column" sx={{ alignItems: "center" }}>
          <strong>Last Month</strong>
          <div>
            <strong>{lastMonthYniqueACSubs.length}</strong>{" "}
            <span css={{ fontSize: "14px", color: "gray" }}>
              {lastMonthYniqueACSubs.length > 1 ? "problems" : "problem"} solved
            </span>
          </div>
        </Stack>
      </Stack>
    </>
  );
};
