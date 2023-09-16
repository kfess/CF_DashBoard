import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  type Control,
  type FieldErrors,
  Controller,
  useFieldArray,
FieldArrayWithId
} from "react-hook-form";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { Checkbox } from "@features/ui/component/Checkbox";
import { Input } from "@features/ui/component/Input";
import { Button } from "@features/ui/component/Button";

type Props = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
};

export const ExpectedParticipants: React.FC<Props> = ({ control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "problemsFilter.expectedParticipants",
  });

  return (
      <Controller
        control={control}
        name="problemsFilter.excludeSolved"
        render={({ field }) => (
          <>
            <Checkbox
              title="Restriction"
              label="Don't suggest problems solved by expected participants"
              toggle={() => {
                field.onChange(!field.value);
              }}
              description="When you check this, problems solved by expected participants are excluded"
            />
            {field.value && (
              <>
                <span>
                  <Box
                    component="label"
                    htmlFor="expected-participants-input"
                    fontWeight="bold"
                    mb={0.5}
                  >
                    Expected Participants
                  </Box>
                  <Button
                    onClick={() => append({ name: "" })}
                    sx={{ ml: 1 }}
                    size="small"
                  >
                    <AddIcon />
                  </Button>
                </span>
                <ParticipantsList
                  control={control}
                  fields={fields}
                  errors={errors}
                  remove={remove}
                />
              </>
            )}
          </>
        )}
      />
  );
};



type ParticipantsListProps = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
  fields: FieldArrayWithId<CreateCustomContest, "problemsFilter.expectedParticipants", "id">[];
  remove: (index: number) => void;
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({ control, fields, errors, remove }) => {
  return (
    <>
      {fields.map((field, index) => (
        <Stack
          key={field.id}
          direction="row"
          alignItems="flex-start"
          gap={1}
          my={0.5}
        >
          <Controller
            name={`problemsFilter.expectedParticipants.${index}.name`}
            control={control}
            render={({ field }) => (
              <Box flexGrow="1">
                <Input
                  {...field}
                  placeholder="User ID"
                  id="user-name-input"
                  type="text"
                />
                {errors.problemsFilter?.expectedParticipants?.[index] && (
                  <ErrorMessage
                    message={
                      errors.problemsFilter?.expectedParticipants?.[index]?.name?.message
                    }
                  />
                )}
              </Box>
            )}
          />
          <Button onClick={() => remove(index)}>
            <RemoveIcon />
          </Button>
        </Stack>
      ))}
    </>
  );
};
