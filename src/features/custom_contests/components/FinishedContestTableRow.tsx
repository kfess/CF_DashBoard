import dayjs from "dayjs";
import React from "react";
import { utcISOStringToLocal } from "@helpers/date";
import { NavLink } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { CustomContest } from "@features/custom_contests/customContest";
import { Chip_ } from "@features/ui/component/Chip";

type Props = {
  customContest: CustomContest;
};

export const FinishedContestTableRow: React.FC<Props> = ({ customContest }) => {
  const localStartDate = utcISOStringToLocal(customContest.startDate);
  const localEndDate = utcISOStringToLocal(customContest.endDate);

  const length = dayjs(customContest.endDate).diff(
    customContest.startDate,
    "minutes"
  );

  return (
    <TableRow hover>
      <TableCell>
        <NavLink to={`/custom-contest/show/${customContest.contestId}`}>
          {customContest.title}
        </NavLink>
        <Chip_ label={customContest.visibility} />
      </TableCell>
      <TableCell>{customContest.owner}</TableCell>
      <TableCell>{customContest.description}</TableCell>
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
          final standings
        </NavLink>
      </TableCell>
    </TableRow>
  );
};
