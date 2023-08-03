import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { localToUtcISOString } from "@helpers/date";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Typography } from "@mui/material";
import { _Button } from "@features/ui/component/Button";
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

export const _CreateContest: React.FC = () => {
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
  const navigate = useNavigate();

  const onSubmit = async () => {
    const values = getValues();
    const { problemsFilter, ...submitValues } = values;
    const createdContest = await create(submitValues);
    if (createdContest) {
      navigate(`/custom-contest/show/${createdContest.contestId}`);
    }
  };

  return (
    <>
      <Stack
        padding={2}
        sx={{
          mx: { sm: 0, md: 2 },
          border: 1,
          borderColor: "divider",
          borderRadius: "4px",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#9246FF",
          }}
        >
          Create your own contest with your own problems.
        </Typography>
        <Title control={control} errors={errors} />
        <Description control={control} errors={errors} />
      </Stack>
      <></>
      <_Button type="submit" color="#9246FF">
        Submit
      </_Button>
    </>
  );
};
