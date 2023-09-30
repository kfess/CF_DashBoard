import dayjs from "dayjs";
import React from "react";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material";
import { utcISOStringToLocal } from "@helpers/date";
import { useNavigate } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { CustomContest } from "@features/custom_contests/customContest";
import { Timer } from "@features/ui/component/Timer";
import { Chip } from "@features/ui/component/Chip";
import { InternalLink } from "@features/ui/component/InternalLink";

type Props = {
  customContest: CustomContest;
  timeZone?: string;
};

export const RunningContestTableRow: React.FC<Props> = ({
  customContest,
  timeZone,
}) => {
  const localStartDate = utcISOStringToLocal(customContest.startDate, timeZone);
  const localEndDate = utcISOStringToLocal(customContest.endDate, timeZone);

  const length = dayjs(customContest.endDate).diff(
    customContest.startDate,
    "minutes"
  );

  const navigate = useNavigate();

  return (
    <TableRow hover>
      <TableCell>
        <Stack direction="row" spacing={0.5}>
          <InternalLink
            to={`/custom-contest/show/${customContest.contestId}`}
            title={customContest.title}
          />
          <Chip
            label={customContest.visibility}
            sx={{
              color: (theme) => theme.palette.primary.dark,
              backgroundColor: (theme) =>
                alpha(theme.palette.primary.light, 0.2),
              "&:hover": {
                backgroundColor: (theme) =>
                  alpha(theme.palette.primary.main, 0.25),
              },
            }}
          />
        </Stack>
      </TableCell>
      <TableCell>{customContest.owner}</TableCell>
      <TableCell>{customContest.description}</TableCell>
      <TableCell>
        <Stack direction="row" gap={1} sx={{ overflow: "auto" }}>
          {customContest.relatedTopics.map((topic) => (
            <Chip key={topic} label={topic} />
          ))}
        </Stack>
      </TableCell>
      <TableCell>{localStartDate}</TableCell>
      <TableCell>{localEndDate}</TableCell>
      <TableCell>
        {Math.floor(length / 60)
          .toString()
          .padStart(2, "0")}
        :{(length % 60).toString().padStart(2, "0")}
      </TableCell>
      <TableCell>
        <Timer toDate={customContest.endDate} />
      </TableCell>
      <TableCell>
        <Chip
          label="Register"
          onClick={() => {
            navigate(`/custom-contest/show/${customContest.contestId}`);
          }}
        />
      </TableCell>
    </TableRow>
  );
};
