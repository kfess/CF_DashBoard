import dayjs from "dayjs";
import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { DatePicker } from "@features/ui/component/DatePicker";
import { Select } from "@features/ui/component/Select";

type Props = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
};

export const ContestDate: React.FC<Props> = ({ control, errors }) => {
  return (
    <>
      <Box>
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <>
              <label
                htmlFor="description-input"
                css={{ fontWeight: "bold", paddingBottom: "0.5rem" }}
              >
                Start Date {field.value}
              </label>
              <Stack direction="row" spacing={1} pt={0.5}>
                <Box flexGrow="2">
                  <DatePicker
                    {...field}
                    value={field.value ? dayjs.utc(field.value).local() : null}
                    onChange={(newValue) => {
                      const utcValue = dayjs(newValue).utc().toISOString();
                      field.onChange(utcValue);
                    }}
                    format="YYYY/MM/DD"
                  />
                </Box>
                <Box flexGrow="1">
                  <Select
                    label="Start Time"
                    options={Array.from({ length: 24 }, (_, i) => i)}
                    onChange={(value) => {
                      const currentDateTime = dayjs.utc(field.value);
                      const updatedDateTime = currentDateTime.hour(value);
                      field.onChange(updatedDateTime.toISOString());
                    }}
                    defaultValue={0}
                    autoWidth
                  />
                </Box>
                <Box flexGrow="1">
                  <Select
                    label="Start Time"
                    options={Array.from({ length: 12 }, (_, i) => i * 5)}
                    onChange={(value) => {
                      const currentDateTime = dayjs.utc(field.value);
                      const updatedDateTime = currentDateTime.minute(value);
                      field.onChange(updatedDateTime.toISOString());
                    }}
                    defaultValue={0}
                    autoWidth
                  />
                </Box>
                <ErrorMessage message={errors.startDate?.message} />
              </Stack>
            </>
          )}
        />
      </Box>
      <Box py={2}>
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <>
              <label
                htmlFor="description-input"
                css={{ fontWeight: "bold", paddingBottom: "0.3rem" }}
              >
                End Date
              </label>
              <Stack direction="row" spacing={1} pt={0.5}>
                <Box flexGrow="2">
                  <DatePicker
                    {...field}
                    value={field.value ? dayjs.utc(field.value).local() : null}
                    onChange={(newValue) => {
                      const utcValue = dayjs(newValue).utc().toISOString();
                      field.onChange(utcValue);
                    }}
                    format="YYYY/MM/DD"
                  />
                </Box>
                <Box flexGrow="1">
                  <Select
                    label="Start Time"
                    options={Array.from({ length: 24 }, (_, i) => i)}
                    onChange={(value) => {
                      const currentDateTime = dayjs.utc(field.value);
                      const updatedDateTime = currentDateTime.hour(value);
                      field.onChange(updatedDateTime.toISOString());
                    }}
                    defaultValue={0}
                    autoWidth
                  />
                </Box>
                <Box flexGrow="1">
                  <Select
                    label="Start Time"
                    options={Array.from({ length: 12 }, (_, i) => i * 5)}
                    onChange={(value) => {
                      const currentDateTime = dayjs.utc(field.value);
                      const updatedDateTime = currentDateTime.minute(value);
                      field.onChange(updatedDateTime.toISOString());
                    }}
                    defaultValue={0}
                    autoWidth
                  />
                </Box>
                <ErrorMessage message={errors.startDate?.message} />
              </Stack>
            </>
          )}
        />
      </Box>
    </>
  );
};
