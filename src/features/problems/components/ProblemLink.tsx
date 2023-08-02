import React from "react";
import Box from "@mui/material/Box";
import { getColorCodeFromRating } from "@features/color/ratingColor";
import { TopcoderLikeCircle } from "@features/color/components/TopCoderLikeCircle";
import { CF_CONTEST_URL, CF_GYM_URL } from "@constants/url";
import { useThemeContext } from "@features/color/themeColor.hook";
import { AddLabelButton } from "@features/bookmark/components/problem/AddLabelButton";

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

  const { theme } = useThemeContext();

  return (
    <Box sx={{ display: "inline-flex", alignItems: "center" }}>
      {showDifficulty && (
        <TopcoderLikeCircle
          displayPurpose="difficulty"
          rating={difficulty}
          solvedCount={solvedCount}
        />
      )}
      <a
        href={problemUrl}
        target="_blank"
        rel="noopener noreferrer"
        css={{
          color: showDifficulty
            ? getColorCodeFromRating(difficulty)
            : theme.colors.fontColor,
          textDecoration: "none",
          paddingRight: theme.spacing(1),
        }}
      >
        {problemId + ". " + problemName}
      </a>
      {showBookmarked && (
        <AddLabelButton
          contestId={contestId}
          contestName={contestName}
          index={problemId}
          name={problemName}
          rating={difficulty}
        />
      )}
    </Box>
  );
};
