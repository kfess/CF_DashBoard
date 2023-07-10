import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import { useQueryParams, QueryParamKeys } from "@hooks/useQueryParams";

const solvedStatuses = [
  "All Problems",
  "Solved",
  "Attempting",
  "Not Solved yet",
] as const;
export type SolvedStatus = typeof solvedStatuses[number];

type Props = {
  solvedStatus: SolvedStatus;
  setSolvedStatus: (arg: SolvedStatus) => void;
};

export const SolvedStatusFilter: React.FC<Props> = (props: Props) => {
  const { solvedStatus, setSolvedStatus } = props;
  const searchUserId = useQueryParams(QueryParamKeys.USERID);

  return (
    <>
      {searchUserId ? (
        <DropDownMenuButton
          title="Solved Status"
          items={solvedStatuses.map((ss) => {
            return { item: ss };
          })}
          selectedItem={solvedStatus}
          setSelectedItem={setSolvedStatus}
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
              setSelectedItem={setSolvedStatus}
              disabled={!searchUserId}
            />
          </div>
        </Tooltip>
      )}
    </>
  );
};
