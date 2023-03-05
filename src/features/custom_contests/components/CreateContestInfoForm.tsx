import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import { Chip_ } from "@features/ui/component/Chip";
import { CustomContest, customContestSchema } from "../customContest";
import { Input } from "@features/ui/component/Input";
import { generateUUIDv4 } from "@helpers/index";

const globalCFUserId = "applemelon" as const;

export const CreateContestInfoForm: React.FC = () => {
  const { control, setValue, handleSubmit } = useForm<CustomContest>({
    resolver: zodResolver(customContestSchema),
    defaultValues: {
      contestId: generateUUIDv4(),
      owner: globalCFUserId,
      visibility: "Public",
      participants: [{ userId: globalCFUserId }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "participants",
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
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
          <>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  onChange={() => {
                    switch (field.value) {
                      case "Private":
                        setValue("visibility", "Public");
                      case "Public":
                        setValue("visibility", "Private");
                    }
                  }}
                />
              }
              label="Make the contest Private"
            />
            <div>Private Contest is invisible to every except you.</div>
          </>
        )}
      />
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <div>
            <FormControl variant="standard">
              <InputLabel shrink>Title</InputLabel>
              <Input placeholder="Contest Title" value={field.value} />
            </FormControl>
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
              <Input placeholder="Description" value={field.value} fullWidth />
            </FormControl>
          </div>
        )}
      />
      <Controller
        name="penalty"
        control={control}
        render={({ field }) => (
          <div>
            <FormControl variant="standard">
              <InputLabel shrink>Penalty (seconds)</InputLabel>
              <Input placeholder="300" value={field.value} fullWidth />
            </FormControl>
          </div>
        )}
      />

      {fields.map((field, index) => (
        <Controller
          name="participants"
          control={control}
          render={({ field }) => <Chip_ label={field.value[index].userId} />}
        />
      ))}
      <Button onClick={() => {}} size="small" css={{ textTransform: "none" }}>
        +
      </Button>
    </form>
  );
};
