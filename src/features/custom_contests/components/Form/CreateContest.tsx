import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@mui/material";
import { Button } from "@features/ui/component/Button";
import { Checkbox } from "@features/ui/component/Checkbox";
import { RadioButton } from "@features/ui/component/RadioButton";
import { FormControl } from "@features/ui/component/FormControl";
import { Input } from "@features/ui/component/Input";
import { TextArea } from "@features/ui/component/TextArea";
import { Chip_ } from "@features/ui/component/Chip";
import { useUserProfile } from "@features/authentication/hooks/useUserProfile";
import {
  CreateCustomContest,
  createCustomContestSchema,
} from "@features/custom_contests/customContest";
import { modes } from "@features/custom_contests/customContest";
// import { useAddCustomContest } from "@features/custom_contests/hooks/useAddCustomContest";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
dayjs.extend(utc);

export const CreateContest: React.FC = () => {
  const { codeforcesUsername, githubUserName } = useUserProfile();

  const defaultValues: Pick<
    CreateCustomContest,
    | "title"
    | "description"
    | "owner"
    | "ownerId"
    | "participants"
    | "startDate"
    | "endDate"
    | "visibility"
    | "mode"
    | "penalty"
    | "problems"
  > = {
    title: "",
    description: "",
    owner: codeforcesUsername ?? "",
    ownerId: githubUserName ?? "",
    visibility: "Public",
    mode: "Normal",
    penalty: 300,
    startDate: dayjs(new Date()).utc().format("YYYY/MM/DD HH:mm"),
    endDate: dayjs(new Date()).utc().format("YYYY/MM/DD HH:mm"),
    participants: [codeforcesUsername ?? ""],
    problems: [],
  };

  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCustomContest>({
    resolver: zodResolver(createCustomContestSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [codeforcesUsername, githubUserName]);

  console.log(errors);

  //   const { create } = useAddCustomContest();

  const onSubmit = () => {
    console.log(getValues());
    console.log("wow");
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div css={{ marginTop: "1rem", marginBottom: "1rem" }}>
          Organize Custom Contest as <Chip_ label={codeforcesUsername} />
          <Button onClick={() => {}}>Change CF user</Button>
        </div>
        <Controller
          name="visibility"
          control={control}
          render={({ field }) => (
            <>
              <Checkbox
                title="Contest Visibility"
                label="Make the contest Private"
                toggle={() => {
                  switch (field.value) {
                    case "Private":
                      setValue("visibility", "Public");
                      break;
                    case "Public":
                      setValue("visibility", "Private");
                      break;
                  }
                }}
                description="Private Contest is invisible to everyone except you."
              />
              {errors.visibility?.message && (
                <p css={{ color: "red" }}>{errors.visibility?.message}</p>
              )}
            </>
          )}
        />
        <Controller
          name="mode"
          control={control}
          render={({ field }) => (
            <>
              <RadioButton
                title="Mode"
                items={modes}
                selectedItem={field.value}
                setSelectedItem={(selectedMode) => {
                  setValue("mode", selectedMode);
                }}
              />
              {errors.mode?.message && (
                <p css={{ color: "red" }}>{errors.mode?.message}</p>
              )}
            </>
          )}
        />
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <FormControl>
              <label
                htmlFor="title-input"
                css={{ fontWeight: "bold", paddingBottom: "0.3rem" }}
              >
                Title
              </label>
              <Input
                {...field}
                placeholder="Contest Title"
                id="title-input"
                type="text"
              />
              {errors.title?.message && (
                <p css={{ color: "red" }}>{errors.title?.message}</p>
              )}
            </FormControl>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <FormControl>
              <label
                htmlFor="description-input"
                css={{ fontWeight: "bold", paddingBottom: "0.3rem" }}
              >
                Description
              </label>
              <TextArea {...field} placeholder="Description" />
              {errors.description?.message && (
                <p css={{ color: "red" }}>{errors.description?.message}</p>
              )}
            </FormControl>
          )}
        />
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <>
              <label
                htmlFor="description-input"
                css={{ fontWeight: "bold", paddingBottom: "0.3rem" }}
              >
                Start Date
              </label>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    {...field}
                    value={field.value ? dayjs.utc(field.value).local() : null} // without this line, error occurs
                    onChange={(newValue) => {
                      const utcValue = dayjs(newValue).utc().format();
                      setValue("startDate", utcValue);
                    }}
                    format="YYYY/MM/DD HH:mm"
                    css={{ backgroundColor: "white" }}
                  />
                </LocalizationProvider>
                {errors.startDate?.message && (
                  <p css={{ color: "red" }}>{errors.startDate?.message}</p>
                )}
              </div>
            </>
          )}
        />
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
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    {...field}
                    value={field.value ? dayjs.utc(field.value).local() : null} // without this line, error occurs
                    onChange={(newValue) => {
                      const utcValue = dayjs(newValue).utc().format();
                      setValue("endDate", utcValue);
                    }}
                    format="YYYY/MM/DD HH:mm"
                    css={{ backgroundColor: "white" }}
                  />
                </LocalizationProvider>
              </div>
            </>
          )}
        />
        <Controller
          name="penalty"
          control={control}
          render={({ field }) => (
            <div>
              <FormControl>
                <label
                  htmlFor="penalty-input"
                  css={{ fontWeight: "bold", paddingBottom: "0.3rem" }}
                >
                  Penalty
                </label>
                <Input
                  {...field}
                  value={field.value}
                  id="penalty-input"
                  placeholder="300"
                  type="number"
                  onChange={(e) => {
                    const val =
                      e.target.value === "" ? null : e.target.valueAsNumber;
                    field.onChange(val);
                  }}
                />
                {errors.penalty?.message && (
                  <p css={{ color: "red" }}>{errors.penalty?.message}</p>
                )}
              </FormControl>
            </div>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Container>
  );
};
