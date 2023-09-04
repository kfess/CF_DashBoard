import React, { useMemo } from "react";
import Stack from "@mui/material/Stack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { ExternalLink } from "@features/ui/component/ExternalLink";

type Props = {
  readonly title: string;
  readonly description?: string;
  readonly startDate: string;
  readonly endDate: string;
};

export const AddToGoogleCalendarLink: React.FC<Props> = ({
  title,
  description,
  startDate,
  endDate,
}) => {
  const googleCalendarUrl: string = useMemo(() => {
    const titleParam = encodeURIComponent(title);
    const descriptionParam = encodeURIComponent(description ?? "");
    const startDateParam = encodeURIComponent(startDate);
    const endDateParam = encodeURIComponent(endDate);
    return `https://www.google.com/calendar/render?action=&text=${titleParam}&details=${descriptionParam}&dates=${startDateParam}/${endDateParam}`;
  }, [title, description, startDate, endDate]);

  return (
    <ExternalLink
      href={googleCalendarUrl}
      label={
        <Stack direction="row" alignItems="center" spacing={1}>
          <CalendarMonthIcon aria-label="Add to Google Calendar" />
          <span>Add to Google Calendar</span>
        </Stack>
      }
    />
  );
};
