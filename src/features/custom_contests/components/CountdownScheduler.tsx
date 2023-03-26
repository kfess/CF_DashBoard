import dayjs from "dayjs";
import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import { AddToGoogleCalendarLink } from "@features/ui/component/AddToGoogleCalendar";
import { Timer } from "@features/ui/component/Timer";

type Props = {
  readonly title: string;
  readonly description?: string;
  readonly startDate: string;
  readonly endDate: string;
};

export const CountdownScheduler: React.FC<Props> = (props: Props) => {
  const { title, description, startDate, endDate } = props;

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
        flexWrap: "wrap",
        fontSize: "1.1rem",
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
        <div>
          <AddToGoogleCalendarLink
            title={title}
            description={description}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      )}
    </Box>
  );
};

const UpcomingContestMessage: React.FC<Pick<Props, "startDate">> = ({
  startDate,
}) => (
  <>
    <span>The contest will start in </span>
    <span>
      {dayjs(startDate).diff(dayjs(), "hours") >= 24 ? (
        <span css={{ marginLeft: "6px" }}>
          {dayjs(startDate).diff(dayjs(), "days")} days
        </span>
      ) : (
        <Timer toDate={startDate} />
      )}
    </span>
  </>
);

const RunningContestMessage: React.FC<Pick<Props, "endDate">> = ({
  endDate,
}) => (
  <>
    The contest has started. It will end in
    <Timer toDate={endDate} />
  </>
);

const FinishedContestMessage: React.FC = () => (
  <span>The contest has ended.</span>
);
