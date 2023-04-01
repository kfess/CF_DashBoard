import dayjs from "dayjs";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";
import { useUserProfile } from "@features/authentication/hooks/useUserProfile";
import {
  useAddParticipantToContest,
  useHasUserRegistered,
  useFetchPublicCustomContest,
} from "@features/custom_contests/useFetchCustomContest";

type RouteParams = {
  readonly contestId?: string;
};

export const RegisterButton: React.FC = () => {
  const params = useParams<RouteParams>();
  const contestId = params.contestId ?? "";

  const { loggedIn } = useLoggedIn();
  const { codeforcesUsername } = useUserProfile();
  const { data: isUserRegistered } = useHasUserRegistered(
    contestId,
    codeforcesUsername
  );

  const { mutate } = useAddParticipantToContest();

  const { data: contest } = useFetchPublicCustomContest({
    contestId,
  });

  const isBeforeContestEnd: boolean = useMemo(() => {
    return dayjs().isBefore(contest?.endDate);
  }, [contest?.endDate]);

  return (
    <>
      {isUserRegistered === false && isBeforeContestEnd && (
        <Box sx={{ m: 1, textAlign: "right" }}>
          <Button
            variant="contained"
            color="success"
            size="small"
            css={{ textTransform: "none" }}
            disabled={
              !loggedIn ||
              !codeforcesUsername ||
              !isBeforeContestEnd ||
              isUserRegistered
            }
            onClick={() => {
              mutate(contestId, codeforcesUsername);
            }}
          >
            Register to Participate
          </Button>
        </Box>
      )}
    </>
  );
};