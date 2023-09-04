import React from "react";
import Stack from "@mui/material/Stack";
import { getColorCodeFromRating } from "@features/color/ratingColor";
import { TopcoderLikeCircle } from "@features/color/components/TopCoderLikeCircle";
import { CF_CONTEST_URL, CF_GYM_URL } from "@constants/url";
import { useTheme } from "@mui/material";
import { AddLabelButton } from "@features/bookmark/components/problem/AddLabelButton";
import { ExternalLink } from "@features/ui/component/ExternalLink";

type Props = {
  readonly showDifficulty: boolean;
  readonly contestId: number;
  readonly contestName: string;
  readonly problemId: string;
  readonly problemName: string;
  readonly difficulty?: number;
  readonly solvedCount?: number;
  readonly showBookmarked?: boolean;
};

export const ProblemLink: React.FC<Props> = ({
  showDifficulty,
  contestId,
  contestName,
  problemId,
  problemName,
  difficulty,
  solvedCount,
  showBookmarked = true,
}) => {
  const problemUrl = `${
    contestId >= 100001 ? CF_GYM_URL : CF_CONTEST_URL
  }/${contestId}/problem/${problemId}`;

  const theme = useTheme();

  return (
    <Stack direction="row" alignItems="center" spacing={1} px={1}>
      {showDifficulty && (
        <TopcoderLikeCircle
          displayPurpose="difficulty"
          rating={difficulty}
          solvedCount={solvedCount}
        />
      )}
      <ExternalLink
        href={problemUrl}
        label={`${problemId}. ${problemName}`}
        color={
          showDifficulty
            ? getColorCodeFromRating(difficulty, theme.palette.mode)
            : ""
        }
      />
      {showBookmarked && (
        <AddLabelButton
          contestId={contestId}
          contestName={contestName}
          index={problemId}
          name={problemName}
          rating={difficulty}
        />
      )}
    </Stack>
  );
};
