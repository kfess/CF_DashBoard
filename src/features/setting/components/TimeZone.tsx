import dayjs from "dayjs";
import { listTimeZones } from "timezone-support";
import React from "react";
import Box from "@mui/material/Box";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { Select } from "@features/ui/component/Select";

export const TimeZone: React.FC = () => {
  const [state, set] = useLocalStorage("timezone", dayjs.tz.guess());

  return (
    <>
      <Box
        component="label"
        display="block"
        htmlFor="timezone"
        fontWeight="bold"
        mb={0.5}
      >
        Time Zone
      </Box>
      <Select
        sx={{ width: "50%" }}
        label={"Time Zone"}
        options={listTimeZones().map((tz) => {
          return { label: tz, value: tz };
        })}
        value={state}
        onChange={(e) => {
          set(e);
        }}
      />
    </>
  );
};
