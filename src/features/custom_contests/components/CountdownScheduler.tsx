import dayjs from "dayjs";
import React from "react";
import Box from "@mui/material/Box";
import { css } from "@emotion/react";
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

  const [hoursToStart, daysToStart]: [number, number] = [
    dayjs(startDate).diff(dayjs(), "hours"),
    dayjs(startDate).diff(dayjs(), "days"),
  ];
  const isUpcoming = dayjs().isBefore(startDate);
  const isRuuning =
    dayjs().isAfter(dayjs(startDate)) && dayjs().isBefore(dayjs(endDate));
  const isFinished = dayjs().isAfter(dayjs(endDate));

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
        borderLeftColor: isUpcoming ? "green" : isRuuning ? "red" : "gray",
        borderLeftWidth: "5px",
      }}
    >
      {isFinished && <span>The contest has ended.</span>}
      {isUpcoming && (
        <>
          <span>The contest will start in </span>
          <span>
            {hoursToStart >= 24 ? (
              <span css={{ marginLeft: "6px" }}>{daysToStart} days</span>
            ) : (
              <Timer toDate={startDate} />
            )}
          </span>
        </>
      )}
      {isRuuning && (
        <>
          The contest has started. It will end in
          <Timer toDate={endDate} />
        </>
      )}
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
