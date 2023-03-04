import * as dayjs from "dayjs";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { CustomContest } from "@features/custom_contests/customContest";
import { Timer } from "@features/ui/component/Timer";
import { Chip_ } from "@features/ui/component/Chip";

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

  const navigate = useNavigate();

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
      <TableCell>
        {Math.floor(customContest.length / 60)
          .toString()
          .padStart(2, "0")}
        :{(customContest.length % 60).toString().padStart(2, "0")}
      </TableCell>
      <TableCell>
        <Timer
          remainingTime={remainingTime}
          setRemainingTime={setRemainingTime}
        />
      </TableCell>
      <TableCell>
        <Chip_
          label="Register"
          onClick={() => {
            navigate(`/custom-contest/show/${customContest.contestId}`);
          }}
        />
      </TableCell>
    </TableRow>
  );
};
