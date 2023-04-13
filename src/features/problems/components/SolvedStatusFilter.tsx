import React from "react";
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
    <DropDownMenuButton
      title="Solved Status"
      items={solvedStatuses.map((ss) => {
        return { item: ss };
      })}
      selectedItem={solvedStatus}
      setSelectedItem={setSolvedStatus}
      disabled={!searchUserId}
    />
  );
};
