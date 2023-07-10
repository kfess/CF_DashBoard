import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Problem } from "@features/problems/problem";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import Tooltip from "@mui/material/Tooltip";
import { ContestLink } from "@features/contests/components/ContestLink";
import { ProblemLink } from "@features/problems/components/ProblemLink";
import { SolutionLink } from "./SolutionLink";
import { getColorCodeFromRating } from "@features/color/ratingColor";
import { Chip_ } from "@features/ui/component/Chip";
import { useThemeContext } from "@features/color/themeColor.hook";

type Props = {
  problem: Problem;
  showTags: boolean;
  isSolved: boolean;
  isAttempted: boolean;
};

export const ProblemsTableRow: React.FC<Props> = (props: Props) => {
  const { problem, showTags, isSolved, isAttempted } = props;

  const { theme } = useThemeContext();
  const backgroundColor = isSolved
    ? theme.colors.acColor
    : isAttempted
    ? theme.colors.waColor
    : "";

  return (
    <TableRow css={{ backgroundColor: backgroundColor }}>
      <TableCell>
        {isSolved ? (
          <Tooltip title="Solved">
            <TaskAltOutlinedIcon fontSize="small" />
          </Tooltip>
        ) : isAttempted ? (
          <Tooltip title="Attempting">
            <HourglassEmptyOutlinedIcon fontSize="small" />
          </Tooltip>
        ) : (
          <></>
        )}
      </TableCell>
      <TableCell>
        <ProblemLink
          contestId={problem.contestId ?? 0} // need to change!
          contestName={problem.contestName ?? "unknown"} // need to change!
          problemId={problem.index}
          problemName={problem.name}
          difficulty={problem.rating}
          showDifficulty={true}
          solvedCount={problem.solvedCount}
        />
        <div>
          {showTags &&
            problem.tags.length > 0 &&
            problem.tags.map((tag) => <Chip_ label={tag} />)}
        </div>
      </TableCell>
      <TableCell>
        <ContestLink
          contestId={problem.contestId ?? 0} // need to change!
          contestName={problem.contestName ?? "unknown"} // need to change!
        />
      </TableCell>
      <TableCell>
        <span css={{ color: getColorCodeFromRating(problem.rating) }}>
          {problem.rating ?? "no data"}
        </span>
      </TableCell>
      <TableCell>{problem.solvedCount ?? "no data"}</TableCell>
      <TableCell>
        <SolutionLink />
      </TableCell>
    </TableRow>
  );
};
