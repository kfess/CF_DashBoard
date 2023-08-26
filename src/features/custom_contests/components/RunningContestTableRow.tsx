import dayjs from "dayjs";
import React from "react";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material";
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

export const RunningContestTableRow: React.FC<Props> = ({ customContest }) => {
  const localStartDate = utcISOStringToLocal(customContest.startDate);
  const localEndDate = utcISOStringToLocal(customContest.endDate);

  const length = dayjs(customContest.endDate).diff(
    customContest.startDate,
    "minutes"
  );

  const navigate = useNavigate();

  return (
    <TableRow hover>
      <TableCell>
        <Stack direction="row" spacing={0.5} >
          <NavLink to={`/custom-contest/show/${customContest.contestId}`}>
            {customContest.title}
          </NavLink>
          <Chip_
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
