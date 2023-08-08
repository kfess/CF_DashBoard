import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Submission } from "@features/submission/submission";
import { getACTagMap } from "@features/achievement/processSubmission";
import { tags } from "@features/problems/problem";
import { Chip_ } from "@features/ui/component/Chip";
import { useToggle } from "@hooks/index";
import { TagACCountPie } from "@features/achievement/components/TagACCountPie";
import { ReadMoreLess } from "@features/ui/component/ReadMoreLess";

// 各タグごとの AC 数をカウント
export type Count = {
  readonly name: string;
  readonly count: number;
};

const TagStats: React.FC<Count> = ({ name, count }) => (
  <Stack direction="row" spacing={1} alignItems="center">
    <Chip_ label={name} />
    <Typography variant="body2" color="text.secondary">
      ×
    </Typography>
    <Typography variant="body2" color="#9246FF" fontWeight="fontWeightBold">
      {count.toLocaleString()}
    </Typography>
  </Stack>
);

// 全タグの AC 数をカウント
type Props = { readonly submissions: Submission[] };

export const TagACCount: React.FC<Props> = ({ submissions }) => {
  const [isReadMore, toggleReadMore] = useToggle(true, false);

  const tagMap = useMemo(() => getACTagMap(submissions), [submissions]);

  const tagCounts: Count[] = useMemo(
    () =>
      [...tags]
        .sort((a, b) => (tagMap.get(b) ?? 0) - (tagMap.get(a) ?? 0))
        .filter((tag) => (tagMap.get(tag) ?? 0) > 0)
        .map((tag) => ({
          name: tag,
          count: tagMap.get(tag) ?? 0,
        })),
    [tagMap]
  );

  const displayedTagCounts = isReadMore ? tagCounts : tagCounts.slice(0, 5);

  return (
    <Box sx={{ marginTop: 1, marginBottom: 1 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" gutterBottom>
          Problem Tags
        </Typography>
        <TagACCountPie tagACCounts={tagCounts} />
      </Stack>
      <Stack spacing={1}>
        {displayedTagCounts.map((tag) => (
          <TagStats key={tag.name} {...tag} />
        ))}
      </Stack>
      <ReadMoreLess
        expanded={isReadMore}
        toggleExpanded={toggleReadMore}
        threshold={5}
        itemsCount={tagCounts.length}
      />
      {tagCounts.length === 0 && (
        <Typography variant="body1" color="text.secondary" align="center">
          No problems solved
        </Typography>
      )}
    </Box>
  );
};
