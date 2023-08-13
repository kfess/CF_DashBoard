import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import { useURLQuery } from "@hooks/useQueryParams";

const solvedStatuses = [
  "All Problems",
  "Solved",
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
        />
      ) : (
        <Tooltip title="To enable this Solved Status button, you need to enter the user name.">
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
