import React from "react";
import Stack from "@mui/material/Stack";
import type { Classification } from "@features/contests/contest";
import { CF_CONTEST_URL } from "@constants/url";
import { AddLabelButton } from "@features/bookmark/components/contest/AddLabelButton";

type Props = {
  readonly contestId: number;
  readonly contestName: string;
  readonly classification: Classification;
};

export const ContestLink: React.FC<Props> = ({
  contestId,
  contestName,
  classification,
}) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <a
        href={`${CF_CONTEST_URL}/${contestId}`}
        target="_blank"
        rel="noopener noreferrer"
        css={{
          color: "inherit",
          textDecoration: "underline",
        }}
      >
        {contestName}
      </a>
      <AddLabelButton
        contestId={contestId}
        contestName={contestName}
        classification={classification}
      />
    </Stack>
  );
};
