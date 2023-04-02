import React from "react";
import { css } from "@emotion/react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { LabelsChip } from "@features/bookmark/components/LabelsChip";

const headLineCss = css({
  display: "flex",
  justifyContent: "space-between",
});

type Props = { readonly title: string };

export const HeadLine: React.FC<Props> = ({ title }) => {
  return (
    <>
      <div css={headLineCss}>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        <LabelsChip />
      </div>
      <Divider />
    </>
  );
};
