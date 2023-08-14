import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { LabelsChip } from "@features/bookmark/components/problem/LabelsChip";
import { useURLQuery } from "@hooks/useQueryParams";
import { DeletableChip } from "@features/ui/component/Chip";

type Props = { readonly title: string };

export const HeadLine: React.FC<Props> = ({ title }) => {
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
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        <Stack direction="row" spacing={1}>
          {queryUserId && (
            <DeletableChip
              label={`userId: ${queryUserId}`}
              onDelete={() => {
                setURLQuery({ userId: undefined });
              }}
              onClick={() => {}}
            />
          )}
          <LabelsChip />
        </Stack>
      </Stack>
      <Divider />
    </>
  );
};
