import dayjs from "dayjs";
import React from "react";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material";
import { utcISOStringToLocal } from "@helpers/date";
import { NavLink } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { CustomContest } from "@features/custom_contests/customContest";
import { Chip } from "@features/ui/component/Chip";
import { InternalLink } from "@features/ui/component/InternalLink";

type Props = {
  customContest: CustomContest;
  timeZone?: string;
};

export const FinishedContestTableRow: React.FC<Props> = ({
  customContest,
  timeZone,
}) => {
  const localStartDate = utcISOStringToLocal(customContest.startDate, timeZone);
  const localEndDate = utcISOStringToLocal(customContest.endDate, timeZone);

  const length = dayjs(customContest.endDate).diff(
    customContest.startDate,
    "minutes"
  );

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
              color: "#9246FF",
              borderColor: "black",
              backgroundColor: alpha("#9246FF", 0.15),
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
        <NavLink to={`/custom-contest/show/${customContest.contestId}`}>
          results
        </NavLink>
      </TableCell>
    </TableRow>
  );
};
