import React from "react";
import Stack from "@mui/material/Stack";
import type { Classification } from "@features/contests/contest";
import { CF_CONTEST_URL } from "@constants/url";
import { AddLabelButton } from "@features/bookmark/components/contest/AddLabelButton";
import { ExternalLink } from "@features/ui/component/ExternalLink";

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
      <ExternalLink
        href={`${CF_CONTEST_URL}/${contestId}`}
        label={contestName}
      />
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
