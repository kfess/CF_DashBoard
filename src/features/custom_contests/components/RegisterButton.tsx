import dayjs from "dayjs";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";
import { useUserProfile } from "@features/authentication/hooks/useUserProfile";
import { useAddParticipantToContest } from "@features/custom_contests/hooks/useAddParticipantToContest";
import { useFetchCustomContestByContestId } from "@features/custom_contests/hooks/useFetchCustomContestByContestId";
import { Button } from "@features/ui/component/Button";

type RouteParams = {
  readonly contestId?: string;
};

export const RegisterButton: React.FC = () => {
  const params = useParams<RouteParams>();
  const contestId = params.contestId ?? "";

  const { loggedIn } = useLoggedIn();
  const { codeforcesUsername } = useUserProfile();

  const { mutate } = useAddParticipantToContest();

  const { data: contest } = useFetchCustomContestByContestId({
    contestId,
  });

  const isUserRegistered =
    codeforcesUsername && contest?.participants.includes(codeforcesUsername);

  const isBeforeContestEnd: boolean = useMemo(() => {
    return dayjs().isBefore(contest?.endDate);
  }, [contest?.endDate]);

  return (
    <>
      {isUserRegistered === false && isBeforeContestEnd && (
        <Box sx={{ m: 1, textAlign: "right" }}>
          <Button
            disabled={
              !loggedIn ||
              !codeforcesUsername ||
              !isBeforeContestEnd ||
              isUserRegistered
            }
            onClick={() => {
              mutate(contestId, codeforcesUsername);
            }}
            size="small"
          >
            Register to Participate
          </Button>
        </Box>
      )}
    </>
  );
};
