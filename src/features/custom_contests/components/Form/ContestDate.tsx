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
                Start Date{" "}
                {field.value
                  ? dayjs(field.value).local().format("YYYY-MM-DD HH:mm:ss")
                  : ""}
              </label>
              <Stack direction="row" spacing={1} pt={0.5}>
                <Box flexGrow="2">
                  <DatePicker
                    {...field}
                    value={field.value ? dayjs(field.value).local() : null}
                    onChange={(newValue) => {
                      field.onChange(dayjs(newValue).toString());
                    }}
                    format="YYYY/MM/DD"
                  />
                </Box>
                <Box flexGrow="1">
                  <Select
                    label="Start Date"
                    options={Array.from({ length: 24 }, (_, i) => i)}
                    onChange={(value) => {
                      const currentDateTime = dayjs(field.value).local();
                      const updatedDateTime = currentDateTime.hour(value);
                      field.onChange(updatedDateTime.toISOString());
                    }}
                    defaultValue={dayjs(field.value).hour()}
                    autoWidth
                  />
                </Box>
                <Box flexGrow="1">
                  <Select
                    label="Start Date"
                    options={Array.from({ length: 12 }, (_, i) => i * 5)}
                    onChange={(value) => {
                      const currentDateTime = dayjs(field.value).local();
                      const updatedDateTime = currentDateTime.minute(value);
                      field.onChange(updatedDateTime.toISOString());
                    }}
                    defaultValue={dayjs(field.value).minute()}
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
                End Date{" "}
                {field.value
                  ? dayjs(field.value).local().format("YYYY-MM-DD HH:mm:ss")
                  : ""}
              </label>
              <Stack direction="row" spacing={1} pt={0.5}>
                <Box flexGrow="2">
                  <DatePicker
                    {...field}
                    value={field.value ? dayjs(field.value).local() : null}
                    onChange={(newValue) => {
                      field.onChange(dayjs(newValue).toString());
                    }}
                    format="YYYY/MM/DD"
                  />
                </Box>
                <Box flexGrow="1">
                  <Select
                    label="End Date"
                    options={Array.from({ length: 24 }, (_, i) => i)}
                    onChange={(value) => {
                      const currentDateTime = dayjs(field.value).local();
                      const updatedDateTime = currentDateTime.hour(value);
                      field.onChange(updatedDateTime.toISOString());
                    }}
                    defaultValue={dayjs(field.value).hour()}
                    autoWidth
                  />
                </Box>
                <Box flexGrow="1">
                  <Select
                    label="End Date"
                    options={Array.from({ length: 12 }, (_, i) => i * 5)}
                    onChange={(value) => {
                      const currentDateTime = dayjs(field.value).local();
                      const updatedDateTime = currentDateTime.minute(value);
                      field.onChange(updatedDateTime.toISOString());
                    }}
                    defaultValue={dayjs(field.value).minute()}
                    autoWidth
                  />
                </Box>
                <ErrorMessage message={errors.endDate?.message} />
              </Stack>
            </>
          )}
        />
      </Box>
    </>
  );
};
