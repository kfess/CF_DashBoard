import React from "react";
import type { CreatedContestType } from "@features/custom_contests/customContest";
import { useFetchPublicCustomContest } from "@features/custom_contests/useFetchCustomContest";

type Props = { contestType: CreatedContestType };

export const PublicContestList: React.FC<Props> = (props: Props) => {
  const { contestType } = props;
  const { data, error } = useFetchPublicCustomContest();

  return (
    <>
      {data?.map((d) => {
        return <>{d.description}</>;
      })}
    </>
  );
};
