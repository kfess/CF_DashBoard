import React from "react";
import Box from "@mui/material/Box";
import { getColorCodeFromRating } from "@features/color/ratingColor";
import { TopcoderLikeCircle } from "@features/color/TopCoderLikeCircle.component";
import { LabelIcon } from "@features/bookmark/components/LabelIcon";
import { CF_CONTEST_URL, CF_GYM_URL } from "@constants/url";
import { useThemeContext } from "@features/color/themeColor.hook";

type Props = {
  readonly showDifficulty: boolean;
  readonly contestId: number;
  readonly contestName: string;
  readonly problemId: string;
  readonly problemName: string;
  readonly difficulty?: number;
  readonly solvedCount?: number;
};

export const ProblemLink: React.FC<Props> = (props: Props) => {
  const {
    showDifficulty,
    contestId,
    contestName,
    problemId,
    problemName,
    difficulty,
    solvedCount,
  } = props;

  const problemUrl = `${
    contestId >= 100001 ? CF_GYM_URL : CF_CONTEST_URL
  }/${contestId}/problem/${problemId}`;

  const { theme } = useThemeContext();

  return (
    <Box css={{ display: "inline-flex", alignItems: "center" }}>
      {showDifficulty && (
        <TopcoderLikeCircle
          displayPurpose="difficulty"
          rating={difficulty}
          solvedCount={solvedCount}
        />
      )}
      <div>
        <a
          href={problemUrl}
          target="_blank"
          rel="noopener noreferrer"
          css={{
            color: showDifficulty
              ? getColorCodeFromRating(difficulty)
              : theme.colors.fontColor,
            textDecoration: "underline",
            paddingRight: theme.spacing(1),
          }}
        >
          {problemId + ". " + problemName}
        </a>
      </div>
      <LabelIcon
        contestId={contestId}
        contestName={contestName}
        index={problemId}
        name={problemName}
      />
    </Box>
  );
};
