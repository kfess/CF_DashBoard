import React from "react";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import { getColorCodeFromRating } from "@features/color/ratingColor";
import { TopcoderLikeCircle } from "@features/color/TopCoderLikeCircle.component";
import { CF_CONTEST_URL, CF_GYM_URL } from "@constants/url";
import { useThemeContext } from "@features/color/themeColor.hook";

type Props = {
  showDifficulty: boolean;
  contestId: number;
  problemId: string;
  problemName: string;
  difficulty?: number;
  solvedCount?: number;
};

export const ProblemLinkCell: React.FC<Props> = (props: Props) => {
  const {
    showDifficulty,
    contestId,
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
    <TableCell key={problemId + "_" + problemName}>
      <Box css={{ display: "flex", alignItems: "center" }}>
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
            }}
          >
            {problemId + ". " + problemName}
          </a>
        </div>
      </Box>
    </TableCell>
  );
};
