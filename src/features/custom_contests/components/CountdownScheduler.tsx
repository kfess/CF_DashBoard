import dayjs from "dayjs";
import React, { useMemo } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AddToGoogleCalendarLink } from "@features/ui/component/AddToGoogleCalendar";
import { Timer } from "@features/ui/component/Timer";

type Props = {
  readonly title: string;
  readonly description?: string;
  readonly startDate: string;
  readonly endDate: string;
};

export const CountdownScheduler: React.FC<Props> = ({
  title,
  description,
  startDate,
  endDate,
}) => {
  const [isUpcoming, isRunning, isFinished] = useMemo(() => {
    const now = dayjs();
    return [
      now.isBefore(startDate),
      now.isAfter(dayjs(startDate)) && now.isBefore(dayjs(endDate)),
      now.isAfter(dayjs(endDate)),
    ];
  }, [startDate, endDate]);

  const borderColor = useMemo(() => {
    if (isUpcoming) {
      return "green";
    }
    if (isRunning) {
      return "red";
    }
    return "gray";
  }, [isUpcoming, isRunning]);

  return (
    <Paper
      elevation={0}
      sx={{
        px: 3,
        py: 2,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderLeft: `5px solid ${borderColor}`,
      }}
    >
      <Stack
        direction={{ sm: "column", md: "row" }}
        justifyContent="space-between"
      >
        {isUpcoming && <UpcomingContestMessage startDate={startDate} />}
        {isRunning && <RunningContestMessage endDate={endDate} />}
        {isFinished && <FinishedContestMessage />}
        {!isFinished && (
          <AddToGoogleCalendarLink
            title={title}
            description={description}
            startDate={startDate}
            endDate={endDate}
          />
        )}
      </Stack>
    </Paper>
  );
};

const UpcomingContestMessage: React.FC<Pick<Props, "startDate">> = ({
  startDate,
}) => (
  <Typography>
    The contest will start in{" "}
    {dayjs(startDate).diff(dayjs(), "hours") >= 24 ? (
      `${dayjs(startDate).diff(dayjs(), "days")} days`
    ) : (
      <Timer toDate={startDate} />
    )}
  </Typography>
);

const RunningContestMessage: React.FC<Pick<Props, "endDate">> = ({
  endDate,
}) => (
  <Stack direction="row" flexWrap="wrap">
    <Typography color="text.secondary">
      The contest has started. It will end in
    </Typography>
    <Typography fontWeight="fontWeightBold" component="div" sx={{ ml: 1 }}>
      <Timer toDate={endDate} />
    </Typography>
  </Stack>
);

const FinishedContestMessage: React.FC = () => (
  <Typography color="text.secondary">The contest has ended.</Typography>
);
