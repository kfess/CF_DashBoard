import React, { useMemo } from "react";
import { css } from "@emotion/react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const linkStyles = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
});

const iconStyle = css({ marginLeft: "6px", marginRight: "6px" });

type Props = {
  readonly title: string;
  readonly description?: string;
  readonly startDate: string;
  readonly endDate: string;
};

export const AddToGoogleCalendarLink: React.FC<Props> = (props: Props) => {
  const { title, description, startDate, endDate } = props;

  const googleCalendarUrl: string = useMemo(() => {
    const titleParam = encodeURIComponent(title);
    const descriptionParam = encodeURIComponent(description ?? "");
    const startDateParam = encodeURIComponent(startDate);
    const endDateParam = encodeURIComponent(endDate);
    return `https://www.google.com/calendar/render?action=&text=${titleParam}&details=${descriptionParam}&dates=${startDateParam}/${endDateParam}`;
  }, [title, description, startDate, endDate]);

  return (
    <a
      href={googleCalendarUrl}
      target="_blank"
      rel="noopener noreferrer"
      css={linkStyles}
    >
      <CalendarMonthIcon css={iconStyle} aria-label="Add to Google Calendar" />
      <span>Add to Google Calendar</span>
    </a>
  );
};
