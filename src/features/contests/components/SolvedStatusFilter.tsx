import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import { useURLQuery } from "@hooks/useQueryParams";

const solvedStatuses = [
  "All Contests",
  "Completed",
  "Attempting",
  "Not Solved yet",
] as const;
export type SolvedStatus = typeof solvedStatuses[number];

type Props = {
  solvedStatus: SolvedStatus;
  onSelectSolvedStatus: (arg: SolvedStatus) => void;
};

export const SolvedStatusFilter: React.FC<Props> = ({
  solvedStatus,
  onSelectSolvedStatus,
}) => {
  const { queryParams } = useURLQuery();
  const searchUserId = queryParams["userId"];

  return (
    <>
      {searchUserId ? (
        <DropDownMenuButton
          title="Solved Status"
          items={solvedStatuses.map((ss) => {
            return { item: ss };
          })}
          selectedItem={solvedStatus}
          onSelect={onSelectSolvedStatus}
          disabled={!searchUserId}
        />
      ) : (
        <Tooltip
          title={
            <Typography variant="body2">
              To enable Solved Status button, you must first enter the
              codeforces user ID in the navigation bar.
            </Typography>
          }
        >
          <div>
            <DropDownMenuButton
              title="Solved Status"
              items={solvedStatuses.map((ss) => {
                return { item: ss };
              })}
              selectedItem={solvedStatus}
              onSelect={onSelectSolvedStatus}
              disabled={!searchUserId}
            />
          </div>
        </Tooltip>
      )}
    </>
  );
};
