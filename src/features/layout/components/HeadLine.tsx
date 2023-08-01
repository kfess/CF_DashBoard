import React from "react";
import { css } from "@emotion/react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { LabelsChip } from "@features/bookmark/components/problem/LabelsChip";
import { useQueryParams, QueryParamKeys } from "@hooks/useQueryParams";
import { DeletableChip } from "@features/ui/component/Chip";

const headLineCss = css({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "0.5rem",
});

type Props = { readonly title: string };

export const HeadLine: React.FC<Props> = ({ title }) => {
  const queryUserId = useQueryParams(QueryParamKeys.USERID);

  return (
    <>
      <div css={headLineCss}>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        <div css={{ display: "flex" }}>
          {queryUserId && (
            <DeletableChip
              label={`query: ${queryUserId}`}
              onDelete={() => {}}
            />
          )}
          <LabelsChip />
        </div>
      </div>
      <Divider />
    </>
  );
};
