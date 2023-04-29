import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Chip_ } from "@features/ui/component/Chip";
import { CustomContest, customContestSchema } from "../customContest";
import { Input } from "@features/ui/component/Input";
import { Container } from "@mui/material";
import { CreateProblemInfoForm } from "./Form/CreateProblemInfoForm";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import { modes } from "../customContest";
import { Checkbox } from "@features/ui/component/Checkbox";
import { Problem } from "@features/problems/problem";
import { useUserProfile } from "@features/authentication/hooks/useUserProfile";
import { useAddCustomContest } from "@features/custom_contests/hooks/useAddCustomContest";
import { Button } from "@features/ui/component/Button";
import { TextArea } from "@features/ui/component/TextArea";
import { FormControl } from "@features/ui/component/FormControl";

export const CreateContestInfoForm: React.FC = () => {
  const { codeforcesUsername, githubUserName } = useUserProfile();

  const defaultValues: Pick<
    CustomContest,
    | "owner"
    | "ownerId"
    | "participants"
    | "visibility"
    | "mode"
    | "penalty"
    | "problems"
  > = {
    owner: codeforcesUsername ?? "",
    ownerId: githubUserName ?? "",
    visibility: "Public",
    mode: "Normal",
    penalty: 300,
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
  } = useForm<CustomContest>({
    resolver: zodResolver(customContestSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [codeforcesUsername, githubUserName]);

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "participants",
  // });

  const [selectedProblems, setSelectedProblems] = useState<Problem[]>([]);

  const { create } = useAddCustomContest();

  const onSubmit = (data: CustomContest) => {
    console.log(data);
    const updatedData: CustomContest = { ...data, problems: selectedProblems };
    console.log(updatedData);
    create(updatedData);
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
            <Checkbox
              title="Contest Visibility"
              label="Make the contest Private"
              toggle={() => {
                switch (field.value) {
                  case "Private":
                    setValue("visibility", "Public");
                  case "Public":
                    setValue("visibility", "Private");
                }
              }}
              description="Private Contest is invisible to everyone except you."
            />
          )}
        />
        <Controller
          name="mode"
          control={control}
          render={({ field }) => (
            <>
              <div css={{ fontWeight: "bold", paddingBottom: "0.3rem" }}>
                Mode
              </div>
              <DropDownMenuButton
                title="Contest Mode"
                selectedItem={field.value}
                setSelectedItem={() => {
                  setValue("mode", field.value);
                }}
                items={modes.map((mode) => {
                  return { item: mode };
                })}
              />
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
              {errors.title?.message && <p>{errors.title?.message}</p>}
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
            </FormControl>
          )}
        />
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem label="Start Time">
                <DateTimePicker
                  {...field}
                  onChange={(newValue) => {
                    setValue(
                      "startDate",
                      dayjs(newValue).format("YYYY/MM/DD HH:mm")
                    );
                  }}
                  format="YYYY/MM/DD HH:mm"
                />
              </DemoItem>
            </LocalizationProvider>
          )}
        />
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem label="End Time">
                <DateTimePicker
                  {...field}
                  onChange={(newValue) => {
                    setValue(
                      "endDate",
                      dayjs(newValue).format("YYYY/MM/DD HH:mm")
                    );
                  }}
                  format="YYYY/MM/DD HH:mm"
                />
              </DemoItem>
            </LocalizationProvider>
          )}
        />
        <Controller
          name="penalty"
          control={control}
          render={({ field }) => (
            <div>
              <FormControl>
                <label htmlFor="penalty-input" css={{ fontWeight: "bold" }}>
                  Penalty
                </label>
                <Input
                  {...field}
                  id="penalty-input"
                  placeholder="300"
                  type="number"
                />
              </FormControl>
            </div>
          )}
        />
        {/* {fields.map((field, index) => (
        <Controller
          name="participants"
          control={control}
          render={({ field }) => (
            <>
              <FormControl variant="standard">
                <div css={{ display: "inline-block" }}>
                  <InputLabel shrink>Expected Participants</InputLabel>
                  <Input />
                </div>
              </FormControl>
              <Button
                onClick={() => {
                  append({ userId: field.value[index].userId });
                }}
                size="small"
                css={{ textTransform: "none" }}
              >
                +
              </Button>
            </>
          )}
        />
      ))}
      <div>
        {fields.map((field) => (
          <DeletableChip label={field.userId} onDelete={() => {}} />
        ))}
      </div> */}
        <Divider />
        <CreateProblemInfoForm
          selectedProblems={selectedProblems}
          setSelectedProblems={setSelectedProblems}
        />
        <div css={{ textAlign: "right" }}>
          <Button type="submit">Create New Contest</Button>
        </div>
      </form>
    </Container>
  );
};
