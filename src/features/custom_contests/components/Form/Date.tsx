import dayjs from "dayjs";
import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { DatePicker } from "@features/ui/component/DatePicker";
import { TimeSelect } from "@features/ui/component/Select";
import { Typography } from "@mui/material";
import { useLocalStorage } from "@hooks/useLocalStorage";

type Props = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
};

const DateTimePicker: React.FC<{
  label: string;
  name: "startDate" | "endDate";
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
}> = ({ label, name, control, errors }) => {
  const [userTimezone] = useLocalStorage("timezone", dayjs.tz.guess());
  const userOffset = dayjs().tz(userTimezone).format("Z");

  return (
    <Box>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <Box
              component="label"
              display="block"
              htmlFor={`${name}-input`}
              fontWeight="bold"
              mb={0.5}
            >
              {label}
              <Typography
                component="span"
                color="text.secondary"
                sx={{ ml: 1 }}
              >
                (UTC{userOffset})
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} pt={0.5}>
              <Box flexGrow={2}>
                <DatePicker
                  {...field}
                  value={
                    field.value ? dayjs(field.value).tz(userTimezone) : null
                  }
                  onChange={(newValue) =>
                    field.onChange(
                      dayjs(newValue).tz(userTimezone).toISOString()
                    )
                  }
                  format="YYYY/MM/DD"
                />
              </Box>
              <Box flexGrow={1}>
                <TimeSelect
                  label={label}
                  unit="hour"
                  step={1}
                  onChange={(value) => {
                    const currentDateTime = dayjs(field.value).tz(userTimezone);
                    const updatedDateTime = currentDateTime.hour(value);
                    field.onChange(updatedDateTime.toISOString());
                  }}
                  defaultValue={dayjs(field.value).tz(userTimezone).hour()}
                />
              </Box>
              <Box flexGrow={1}>
                <TimeSelect
                  label={label}
                  unit="minute"
                  step={5}
                  onChange={(value) => {
                    const currentDateTime = dayjs(field.value).tz(userTimezone);
                    const updatedDateTime = currentDateTime.minute(value);
                    field.onChange(updatedDateTime.toISOString());
                  }}
                  defaultValue={dayjs(field.value).tz(userTimezone).minute()}
                />
              </Box>
            </Stack>
          </>
        )}
      />
      {errors[name] && <ErrorMessage message={errors[name]?.message} />}
    </Box>
  );
};

export const Date: React.FC<Props> = ({ control, errors }) => {
  return (
    <>
      <DateTimePicker
        label="Start Date"
        name="startDate"
        control={control}
        errors={errors}
      />
      <DateTimePicker
        label="End Date"
        name="endDate"
        control={control}
        errors={errors}
      />
    </>
  );
};
