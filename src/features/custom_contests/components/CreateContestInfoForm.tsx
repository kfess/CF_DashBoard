import * as dayjs from "dayjs";
import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DeletableChip, Chip_ } from "@features/ui/component/Chip";
import { CustomContest, customContestSchema } from "../customContest";
import { Input } from "@features/ui/component/Input";
import { generateUUIDv4 } from "@helpers/index";
import { CreateProblemInfoForm } from "./Form/CreateProblemInfoForm";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import { modes } from "../customContest";
import { Checkbox } from "@features/ui/component/Checkbox";
import { Problem } from "@features/problems/problem";

const globalCFUserId = "applemelon" as const;

export const CreateContestInfoForm: React.FC = () => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<CustomContest>({
    resolver: zodResolver(customContestSchema),
    defaultValues: {
      contestId: generateUUIDv4(),
      owner: globalCFUserId,
      visibility: "Public",
      mode: "Normal",
      participants: [{ userId: globalCFUserId }],
      problems: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "participants",
  });

  const [selectedProblems, setSelectedProblems] = useState<Problem[]>([]);

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <h3>Contest Form</h3>
      <div>
        Organize Custom Contest as <Chip_ label={globalCFUserId} />
        <Button
          onClick={() => {}} // change global CF user ID
          variant="contained"
          color="inherit"
          size="small"
          disableRipple
          css={{ textTransform: "none" }}
        >
          Change CF User Id
        </Button>
      </div>
      <Controller
        name="visibility"
        control={control}
        render={({ field }) => (
          <Checkbox
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
      {/* <Controller
        name="mode"
        control={control}
        render={({ field }) => (
          <>
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
      /> */}
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <div>
            <FormControl variant="standard">
              <InputLabel shrink>Title</InputLabel>
              <Input {...field} placeholder="Contest Title" type="text" />
            </FormControl>
            {errors.title?.message && <p>{errors.title?.message}</p>}
          </div>
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <div>
            <FormControl variant="standard">
              <InputLabel shrink>Description</InputLabel>
              <Input {...field} placeholder="Description" type="text" />
            </FormControl>
          </div>
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
            <FormControl variant="standard">
              <InputLabel shrink>Penalty (seconds)</InputLabel>
              <Input {...field} placeholder="300" type="number" fullWidth />
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
      <CreateProblemInfoForm
        selectedProblems={selectedProblems}
        setSelectedProblems={setSelectedProblems}
      />
      <div css={{ textAlign: "right" }}>
        <Button
          onClick={() => {
            setValue("problems", selectedProblems);
            console.log(getValues());
          }}
          type="submit"
          variant="contained"
          color="success"
          size="small"
          css={{ textTransform: "none" }}
        >
          Create New Contest
        </Button>
      </div>
    </form>
  );
};
