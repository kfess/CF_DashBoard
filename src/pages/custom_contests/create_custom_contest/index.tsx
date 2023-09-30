import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { SubNavigation } from "@features/ui/component/SubNavigation";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useUserProfile } from "@features/authentication/hooks/useUserProfile";
import {
  CreateCustomContest,
  createCustomContestSchema,
} from "@features/custom_contests/customContest";
import { useAddCustomContest } from "@features/custom_contests/hooks/useAddCustomContest";
import { ContestDetailStep } from "@features/custom_contests/components/Form/ContestDetailStep";
import { ProblemStep } from "@features/custom_contests/components/Form/ProblemStep";
import { ViewStep } from "@features/custom_contests/components/Form/ViewStep";
import { getDefaultStartDate, getDefaultEndDate } from "@helpers/date";
import { Snackbar } from "@features/ui/component/Snackbar";

const getDefaultValues = (
  codeforcesUsername?: string,
  githubUserName?: string,
  userTimeZone?: string
): CreateCustomContest => ({
  owner: codeforcesUsername ?? "",
  ownerId: githubUserName ?? "",
  visibility: "Public",
  mode: "Normal",
  title: "",
  description: "",
  penalty: 300,
  startDate: getDefaultStartDate(userTimeZone),
  endDate: getDefaultEndDate(userTimeZone),
  relatedTopics: [],
  participants: [codeforcesUsername ?? ""],
  problems: [],
  problemsFilter: {
    count: 5,
    difficultyFrom: 0,
    difficultyTo: 5000,
    includeTags: [],
    excludeTags: [],
    excludeSolved: false,
    classifization: "All",
  },
  individualProblemAddFilter: {
    difficultyFrom: 0,
    difficultyTo: 5000,
    includeTags: [],
    excludeTags: [],
    classifization: "All",
  },
});

const steps = ["Contest Details", "Select Problems", "Create Contest"];

export const CreateCustomContestPage: React.FC = () => {
  const { codeforcesUsername, githubUserName } = useUserProfile();

  const [userTimeZone] = useLocalStorage("timezone", dayjs.tz.guess());
  const defaultValues: CreateCustomContest = getDefaultValues(
    codeforcesUsername,
    githubUserName,
    userTimeZone
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

  const watchedMode = useWatch({
    control,
    name: "mode",
  });
  const watchedVisibility = useWatch({
    control,
    name: "visibility",
  });

  useEffect(() => {
    reset(defaultValues);
  }, [codeforcesUsername, githubUserName]);

  const { create, isAddSuccess, isAddError } = useAddCustomContest();

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const navigate = useNavigate();
  const onSubmit = async () => {
    const values = getValues();
    // Convert local time to UTC
    values.startDate = dayjs(values.startDate).utc().toISOString();
    values.endDate = dayjs(values.endDate).utc().toISOString();
    const { problemsFilter, ...submitValues } = values;
    const createdContest = await create(submitValues);
    if (createdContest) {
      setIsSnackbarOpen(true);
      setTimeout(() => {
        navigate(`/custom-contest/show/${createdContest.contestId}`);
      }, 2000);
    }
  };

  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <>
      <SubNavigation
        message={
          <Typography variant="h6">Create your own custom contest.</Typography>
        }
        py={1.5}
        textAlign="center"
        sx={{
          color: "info.contrastText",
          backgroundColor: "primary.dark",
        }}
      />
      <Box pt={4} pb={2}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Container maxWidth="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 0 && (
            <ContestDetailStep
              setActiveStep={setActiveStep}
              codeforcesUsername={codeforcesUsername}
              watchedVisibility={watchedVisibility}
              watchedMode={watchedMode}
              control={control}
              errors={errors}
            />
          )}
          {activeStep === 1 && (
            <ProblemStep
              setActiveStep={setActiveStep}
              control={control}
              setValue={setValue}
              errors={errors}
              getValues={getValues}
            />
          )}
          {activeStep === 2 && (
            <ViewStep
              setActiveStep={setActiveStep}
              formData={getValues()}
              control={control}
              errors={errors}
            />
          )}
        </form>
      </Container>
      {isAddSuccess && (
        <Snackbar
          open={isSnackbarOpen}
          message={"You have successfully created a custom contest"}
          onClose={handleCloseSnackbar}
          color="success"
        />
      )}
    </>
  );
};
