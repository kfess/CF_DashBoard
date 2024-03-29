import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useLocation } from "react-router-dom";
import { LabelsChip as ProblemLabelsChip } from "@features/bookmark/components/problem/LabelsChip";
import { LabelsChip as ContestLabelsChip } from "@features/bookmark/components/contest/LabelsChip";
import { useURLQuery } from "@hooks/useQueryParams";
import { Chip, DeletableChip } from "@features/ui/component/Chip";

type Props = { readonly title: string };

export const HeadLine: React.FC<Props> = ({ title }) => {
  const location = useLocation();

  const { queryParams, setURLQuery } = useURLQuery();
  const queryUserId = queryParams["userId"];

  return (
    <>
      <Stack
        direction="row"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="0.5rem"
      >
        <Typography variant="h4" component="h1" mb={{ xs: 1, sm: 0 }}>
          {title}
        </Typography>
        <Stack direction="row" gap={1} flexWrap="wrap">
          {queryUserId && (
            <>
              {location.pathname !== "/achievement" ? (
                <DeletableChip
                  label={`userId: ${queryUserId}`}
                  onDelete={() => {
                    setURLQuery({ userId: undefined });
                  }}
                />
              ) : (
                <Chip label={`userId: ${queryUserId}`} />
              )}
            </>
          )}
          <ProblemLabelsChip />
          <ContestLabelsChip />
        </Stack>
      </Stack>
      <Divider />
    </>
  );
};
