import React from "react";
import Stack from "@mui/material/Stack";
import type { Classification } from "@features/contests/contest";
import { CF_CONTEST_URL } from "@constants/url";
import { AddLabelButton } from "@features/bookmark/components/contest/AddLabelButton";

type Props = {
  readonly contestId: number;
  readonly contestName: string;
  readonly classification: Classification;
  readonly showBookmarked?: boolean;
};

export const ContestLink: React.FC<Props> = ({
  contestId,
  contestName,
  classification,
  showBookmarked = true,
}) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <a
        href={`${CF_CONTEST_URL}/${contestId}`}
        target="_blank"
        rel="noopener noreferrer"
        css={{
          color: "#9246FF",
          ":hover": {
            color: "#9246FF",
            textDecoration: "underline",
          },
        }}
      >
        {contestName}
      </a>
      {showBookmarked && (
        <AddLabelButton
          contestId={contestId}
          contestName={contestName}
          classification={classification}
        />
      )}
    </Stack>
  );
};
