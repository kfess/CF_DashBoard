import React from "react";
import Box from "@mui/material/Box";
import { CF_CONTEST_URL } from "@constants/url";
import type { Classification } from "@features/contests/contest";
import { AddLabelButton } from "@features/bookmark/components/contest/AddLabelButton";

type Props = {
  readonly contestId: number;
  readonly contestName: string;
  readonly classification?: Classification;
};

export const ContestLink: React.FC<Props> = ({
  contestId,
  contestName,
  classification,
}) => {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center" }}>
      <div>
        <a
          href={`${CF_CONTEST_URL}/${contestId}`}
          target="_blank"
          rel="noopener noreferrer"
          css={{
            color: "inherit",
            textDecoration: "underline",
            paddingRight: 8,
          }}
        >
          {contestName}
        </a>
      </div>
      <AddLabelButton
        contestId={contestId}
        contestName={contestName}
        classification={classification}
      />
    </Box>
  );
};
