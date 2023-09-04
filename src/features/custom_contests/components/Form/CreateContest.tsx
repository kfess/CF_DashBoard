import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material";
import { localToUtcISOString } from "@helpers/date";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@mui/material";
import { _Button } from "@features/ui/component/Button";
import { Chip } from "@features/ui/component/Chip";
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
    watch,
    formState: { errors },
    reset,
  } = useForm<CreateCustomContest>({
    resolver: zodResolver(createCustomContestSchema),
    defaultValues: defaultValues,
  });
  const watchedVisibility = watch("visibility");
  const watchedMode = watch("mode");

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography
        variant="h6"
        my={2}
        sx={{
          fontWeight: "bold",
          color: "#9246FF",
          boxSizing: "border-box",
        }}
      >
        Create your own contest with your own problems.
      </Typography>

      <div css={{ marginTop: "1rem", marginBottom: "1rem" }}>
        Organize Custom Contest as <Chip label={codeforcesUsername} />
        <_Button onClick={() => {}}>Change CF user</_Button>
      </div>

      <Box
        sx={{
          p: { xs: 2 },
          my: 2,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: "4px",
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h5" fontWeight="fontWeightBold">
            Contest Details
          </Typography>
          <Chip
            label={watchedVisibility}
            sx={{
              color: "#9246FF",
              borderColor: "black",
              backgroundColor: alpha("#9246FF", 0.15),
            }}
          />
          <Chip
            label={watchedMode}
            sx={{
              color: "#9246FF",
              borderColor: "black",
              backgroundColor: alpha("#9246FF", 0.15),
            }}
          />
        </Stack>

        <Stack>
          <Title control={control} errors={errors} />
          <Description control={control} errors={errors} />
          <ContestDate control={control} errors={errors} />
          <Visibility control={control} errors={errors} />
          <Penalty control={control} errors={errors} />
          <Mode control={control} errors={errors} />
        </Stack>
      </Box>
      <Box
        sx={{
          p: { xs: 2 },
          my: 2,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: "4px",
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        <Typography variant="h5" fontWeight="fontWeightBold">
          Selected Problems
        </Typography>
        <SelectProblems control={control} setValue={setValue} errors={errors} />
      </Box>

      <Stack direction="row" justifyContent="flex-end">
        <_Button type="submit" color="#9246FF">
          Create Contest
        </_Button>
      </Stack>
    </form>
  );
};
