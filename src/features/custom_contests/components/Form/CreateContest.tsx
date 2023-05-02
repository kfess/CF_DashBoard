import React, { useEffect } from "react";
import { localToUtcISOString } from "@helpers/date";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@mui/material";
import { Button } from "@features/ui/component/Button";
import { Chip_ } from "@features/ui/component/Chip";
import { useUserProfile } from "@features/authentication/hooks/useUserProfile";
import {
  CreateCustomContest,
  createCustomContestSchema,
} from "@features/custom_contests/customContest";
import { useAddCustomContest } from "@features/custom_contests/hooks/useAddCustomContest";
import { Visibility } from "@features/custom_contests/components/Form/Visibility";
import { Mode } from "@features/custom_contests/components/Form/Mode";
import { Title } from "@features/custom_contests/components/Form/Title";
import { Description } from "@features/custom_contests/components/Form/Description";
import { ContestDate } from "@features/custom_contests/components/Form/ContestDate";
import { Penalty } from "@features/custom_contests/components/Form/Penalty";
import { SelectProblems } from "./SelectProblems";

const getDefaultValues = (
  codeforcesUsername?: string,
  githubUserName?: string
): CreateCustomContest => ({
  owner: codeforcesUsername ?? "",
  ownerId: githubUserName ?? "",
  visibility: "Public",
  mode: "Normal",
  title: "",
  description: "",
  penalty: 300,
  startDate: localToUtcISOString(new Date()),
  endDate: localToUtcISOString(new Date()),
  participants: [codeforcesUsername ?? ""],
  problems: [],
  problemsFilter: {
    count: 5,
    difficultyFrom: 0,
    difficultyTo: 5000,
    includeTags: [],
    excludeTags: [],
    excludeSolved: false,
    expectedParticipants: [],
  },
});

export const CreateContest: React.FC = () => {
  const { codeforcesUsername, githubUserName } = useUserProfile();

  const defaultValues: CreateCustomContest = getDefaultValues(
    codeforcesUsername,
    githubUserName
  );

  const {
    control,
    getValues,
    setValue,
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

  const { create } = useAddCustomContest();

  const onSubmit = () => {
    const values = getValues();
    const { problemsFilter, ...submitValues } = values;
    console.log(submitValues);
    create(submitValues);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div css={{ marginTop: "1rem", marginBottom: "1rem" }}>
          Organize Custom Contest as <Chip_ label={codeforcesUsername} />
          <Button onClick={() => {}}>Change CF user</Button>
        </div>

        <Visibility control={control} errors={errors} />
        <Mode control={control} errors={errors} />
        <Title control={control} errors={errors} />
        <Description control={control} errors={errors} />
        <ContestDate control={control} errors={errors} />
        <Penalty control={control} errors={errors} />
        <SelectProblems control={control} setValue={setValue} errors={errors} />

        <Button type="submit">Submit</Button>
      </form>
    </Container>
  );
};
