import * as dayjs from "dayjs";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { CustomContest } from "@features/custom_contests/customContest";
import { Timer } from "@features/ui/component/Timer";

type Props = {
  customContest: CustomContest;
};

export const RunningContestTableRow: React.FC<Props> = (props: Props) => {
  const { customContest } = props;
  const [remainingTime, setRemainingTime] = useState<number>(
    dayjs(customContest.startDate)
      .add(customContest.length, "minute")
      .diff(dayjs(), "second")
  );

  return (
    <>
      <TableRow hover>
        <TableCell>
          <NavLink to={`/custom-contest/show/${customContest.contestId}`}>
            {customContest.title}
          </NavLink>
        </TableCell>
        <TableCell>{customContest.owner}</TableCell>
        <TableCell>{customContest.description}</TableCell>
        <TableCell>{customContest.startDate}</TableCell>
        <TableCell>
          {Math.floor(customContest.length / 60)}:
          {(customContest.length % 60).toString().padStart(2, "0")}
        </TableCell>
        <TableCell>
          <Timer
            remainingTime={remainingTime}
            setRemainingTime={setRemainingTime}
          />
        </TableCell>
        <TableCell>
          <NavLink to="">Register</NavLink>
        </TableCell>
      </TableRow>
    </>
  );
};
