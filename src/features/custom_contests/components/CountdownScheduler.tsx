import dayjs from "dayjs";
import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { AddToGoogleCalendarLink } from "@features/ui/component/AddToGoogleCalendar";
import { Timer } from "@features/ui/component/Timer";
import Typography from "@mui/material/Typography";

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
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        fontSize: "1.1rem",
        backgroundColor: "#ffffff",
        borderStyle: "solid",
        borderRadius: "4px",
        borderColor: "#c0c0c0",
        borderWidth: "0.8px",
        borderLeftColor: borderColor,
        borderLeftWidth: "5px",
      }}
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
    </Box>
  );
};

const UpcomingContestMessage: React.FC<Pick<Props, "startDate">> = ({
  startDate,
}) => (
  <>
    <Typography>The contest will start in </Typography>
    <Typography>
      {dayjs(startDate).diff(dayjs(), "hours") >= 24 ? (
        <span css={{ marginLeft: "6px" }}>
          {dayjs(startDate).diff(dayjs(), "days")} days
        </span>
      ) : (
        <Timer toDate={startDate} />
      )}
    </Typography>
  </>
);

const RunningContestMessage: React.FC<Pick<Props, "endDate">> = ({
  endDate,
}) => (
  <Stack direction="row" flexWrap="wrap">
    <Typography color="text.secondary">
      The contest has started. It will end in
    </Typography>
    <Typography fontWeight="fontWeightBold">
      <Timer toDate={endDate} />
    </Typography>
  </Stack>
);

const FinishedContestMessage: React.FC = () => (
  <Typography color="text.secondary">The contest has ended.</Typography>
);
