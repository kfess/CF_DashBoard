import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@mui/material";
import { Button } from "@features/ui/component/Button";
import { Checkbox } from "@features/ui/component/Checkbox";
import { RadioButton } from "@features/ui/component/RadioButton";
import { Chip_ } from "@features/ui/component/Chip";
import { useUserProfile } from "@features/authentication/hooks/useUserProfile";
import { CustomContest } from "@features/custom_contests/customContest";
import { modes } from "@features/custom_contests/customContest";

export const CreateContest: React.FC = () => {
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
    // resolver: zodResolver(customContestSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [codeforcesUsername, githubUserName]);

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
          )}
        />
        <Controller
          name="mode"
          control={control}
          render={({ field }) => (
            <RadioButton
              title="Mode"
              items={modes}
              selectedItem={field.value}
              setSelectedItem={(selectedMode) => {
                setValue("mode", selectedMode);
              }}
            />
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Container>
  );
};
