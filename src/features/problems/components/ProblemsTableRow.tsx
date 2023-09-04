import React from "react";
import Stack from "@mui/material/Stack";
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
import { Chip } from "@features/ui/component/Chip";
import { useTheme } from "@mui/material";
import { CF_CONTEST_URL } from "@constants/url";
import { ExternalLink } from "@features/ui/component/ExternalLink";

type Props = {
  readonly problem: Problem;
  readonly showTags: boolean;
  readonly isSolved: boolean;
  readonly isAttempted: boolean;
};

export const ProblemsTableRow: React.FC<Props> = ({
  problem,
  showTags,
  isSolved,
  isAttempted,
}) => {
  const theme = useTheme();
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
            <TaskAltOutlinedIcon fontSize="small" color="success" />
          </Tooltip>
        ) : isAttempted ? (
          <Tooltip title="Attempting">
            <HourglassEmptyOutlinedIcon fontSize="small" />
          </Tooltip>
        ) : null}
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
        <Stack
          direction="row"
          flexWrap="wrap"
          gap="0.5rem"
          sx={{
            marginTop: "0.5rem",
          }}
        >
          {showTags &&
            problem.tags.length > 0 &&
            problem.tags.map((tag) => (
              <Chip key={tag} label={tag} onClick={() => {}} />
            ))}
        </Stack>
      </TableCell>
      <TableCell>
        <ContestLink
          contestId={problem.contestId ?? 0} // need to change!
          contestName={problem.contestName ?? "unknown"} // need to change!
          classification={problem.classification || "Others"}
        />
      </TableCell>
      <TableCell>
        <span css={{ color: getColorCodeFromRating(problem.rating) }}>
          {problem.rating ?? "no data"}
        </span>
      </TableCell>
      <TableCell>
        <Chip
          label={
            problem.solvedCount ? (
              <ExternalLink
                href={`${CF_CONTEST_URL}/${problem.contestId}/status`}
                label={problem.solvedCount.toLocaleString()}
              />
            ) : (
              <div>no data</div>
            )
          }
        />
      </TableCell>
      <TableCell>
        <SolutionLink />
      </TableCell>
    </TableRow>
  );
};
