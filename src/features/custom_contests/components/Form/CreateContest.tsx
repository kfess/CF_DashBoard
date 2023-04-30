import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Button } from "@features/ui/component/Button";
import { Chip_ } from "@features/ui/component/Chip";
import { useUserProfile } from "@features/authentication/hooks/useUserProfile";
import {
  CreateCustomContest,
  createCustomContestSchema,
} from "@features/custom_contests/customContest";
import { Problem } from "@features/problems/problem";
import { CreateProblemInfoForm } from "@features/custom_contests/components/Form/CreateProblemInfoForm";
import { Mode } from "@features/custom_contests/components/Form/Mode";
// import { useAddCustomContest } from "@features/custom_contests/hooks/useAddCustomContest";

import { Visibility } from "@features/custom_contests/components/Form/Visibility";
import { Title } from "@features/custom_contests/components/Form/Title";
import { Description } from "@features/custom_contests/components/Form/Description";
import { ContestDate } from "@features/custom_contests/components/Form/ContestDate";
import { Penalty } from "@features/custom_contests/components/Form/Penalty";

export const CreateContest: React.FC = () => {
  const { codeforcesUsername, githubUserName } = useUserProfile();

  const defaultValues: CreateCustomContest = {
    owner: codeforcesUsername ?? "",
    ownerId: githubUserName ?? "",
    visibility: "Public",
    mode: "Normal",
    title: "",
    description: "",
    penalty: 300,
    startDate: dayjs(new Date()).utc().format("YYYY/MM/DD HH:mm"),
    endDate: dayjs(new Date()).utc().format("YYYY/MM/DD HH:mm"),
    participants: [codeforcesUsername ?? ""],
    problems: [],
  };

  const {
    control,
    getValues,
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

  const [selectedProblems, setSelectedProblems] = useState<Problem[]>([]);

  console.log(errors);

  //   const { create } = useAddCustomContest();

  const onSubmit = () => {
    console.log(getValues());
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

        <Divider />
        <CreateProblemInfoForm
          selectedProblems={selectedProblems}
          setSelectedProblems={setSelectedProblems}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Container>
  );
};
