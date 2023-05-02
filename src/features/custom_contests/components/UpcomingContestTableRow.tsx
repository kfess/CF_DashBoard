import dayjs from "dayjs";
import React from "react";
import { utcISOStringToLocal } from "@helpers/date";
import { NavLink, useNavigate } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { CustomContest } from "@features/custom_contests/customContest";
import { Timer } from "@features/ui/component/Timer";
import { Chip_ } from "@features/ui/component/Chip";

type Props = {
  customContest: CustomContest;
};

export const UpcomingContestTableRow: React.FC<Props> = ({ customContest }) => {
  const localStartDate = utcISOStringToLocal(customContest.startDate);
  const localEndDate = utcISOStringToLocal(customContest.endDate);

  const daysToStart = dayjs(customContest.startDate).diff(dayjs(), "days");
  const length = dayjs(customContest.endDate).diff(
    customContest.startDate,
    "minutes"
  );

  const navigate = useNavigate();

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
        <div>Before Start</div>
        <div>
          {daysToStart > 1 && <span>{daysToStart} days</span>}
          {daysToStart === 1 && <span>{daysToStart} day</span>}
          {daysToStart === 0 && <Timer toDate={customContest.endDate} />}
        </div>
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
