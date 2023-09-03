import React from "react";
import Stack from "@mui/material/Stack";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

type Props = {
  readonly expanded: boolean;
  readonly toggleExpanded: () => void;
  readonly threshold: number;
  readonly itemsCount: number;
  readonly expandedText?: string;
  readonly collapsedText?: string;
};

export const ReadMoreLess: React.FC<Props> = ({
  expanded,
  toggleExpanded,
  threshold,
  itemsCount,
  expandedText = "Show Less",
  collapsedText = "Show More",
}) => {
  if (itemsCount <= threshold) return null;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      onClick={toggleExpanded}
      sx={{
        cursor: "pointer",
        color: (theme) => theme.palette.primary.main,
        p: 1,
        "&:hover": {
          color: (theme) => theme.palette.primary.dark,
        },
      }}
      fontWeight="fontWeightBold"
      spacing={1}
    >
      <div>{expanded ? expandedText : collapsedText}</div>
      {expanded ? (
        <KeyboardDoubleArrowUpIcon />
      ) : (
        <KeyboardDoubleArrowDownIcon />
      )}
    </Stack>
  );
};
