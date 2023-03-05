import * as dayjs from "dayjs";
import React from "react";
import { NavLink } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { CustomContest } from "@features/custom_contests/customContest";

type Props = {
  customContest: CustomContest;
};

export const FinishedContestTableRow: React.FC<Props> = (props: Props) => {
  const { customContest } = props;
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
      </TableCell>
      <TableCell>{customContest.owner}</TableCell>
      <TableCell>{customContest.description}</TableCell>
      <TableCell>{customContest.startDate}</TableCell>
      <TableCell>{customContest.endDate}</TableCell>
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
