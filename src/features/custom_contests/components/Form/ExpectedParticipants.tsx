import React from "react";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
} from "react-hook-form";
import { FormControl } from "@features/ui/component/FormControl";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { Checkbox } from "@features/ui/component/Checkbox";
import { Input } from "@features/ui/component/Input";
import { Button } from "@features/ui/component/Button";

type Props = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
  excludeSolved: boolean;
};

export const ExpectedParticipants: React.FC<Props> = ({
  control,
  errors,
  excludeSolved,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "problemsFilter.expectedParticipants",
  });

  return (
    <>
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
          </>
        )}
      />
      {excludeSolved && (
        <>
          <span>
            <label
              htmlFor="title-input"
              css={{ fontWeight: "bold", paddingBottom: "0.3rem" }}
            >
              Expected Participants
            </label>
            <Button
              onClick={() => append({ name: "" })}
              sx={{ ml: 1 }}
              size="small"
            >
              <AddIcon />
            </Button>
          </span>
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
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="User ID"
                      id="user-name-input"
                      type="text"
                    />
                    <ErrorMessage
                      message={
                        errors.problemsFilter?.expectedParticipants?.[index]
                          ?.name?.message
                      }
                    />
                  </FormControl>
                )}
              />
              <Button onClick={() => remove(index)}>
                <RemoveIcon />
              </Button>
            </Stack>
          ))}
        </>
      )}
    </>
  );
};
