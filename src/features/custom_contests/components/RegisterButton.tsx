import dayjs from "dayjs";
import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";
import { useUserProfile } from "@features/authentication/hooks/useUserProfile";
import { useAddParticipantToContest } from "@features/custom_contests/hooks/useAddParticipantToContest";
import { useFetchCustomContestByContestId } from "@features/custom_contests/hooks/useFetchCustomContestByContestId";
import { Button } from "@features/ui/component/Button";
import { Snackbar } from "@features/ui/component/Snackbar";

type RouteParams = {
  readonly contestId?: string;
};

export const RegisterButton: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams<RouteParams>();
  const contestId = params.contestId ?? "";

  const { loggedIn } = useLoggedIn();
  const { codeforcesUsername } = useUserProfile();

  const { mutate, isAddSuccess, isAddError } = useAddParticipantToContest();

  const { data: contest } = useFetchCustomContestByContestId({
    contestId,
  });

  const isUserRegistered =
    codeforcesUsername && contest?.participants.includes(codeforcesUsername);

  const isBeforeContestEnd: boolean = useMemo(() => {
    return dayjs().isBefore(contest?.endDate);
  }, [contest?.endDate]);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const handleClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <>
      {isUserRegistered === false && isBeforeContestEnd && (
        <Box m={1}>
          <Button
            disabled={
              !loggedIn ||
              !codeforcesUsername ||
              !isBeforeContestEnd ||
              isUserRegistered
            }
            onClick={() => {
              mutate(contestId, codeforcesUsername);
              setIsSnackbarOpen(true);
              setTimeout(() => {
                navigate("/custom-contest/");
              }, 2000);
            }}
            size="small"
          >
            Register to Participate
          </Button>
        </Box>
      )}
      {isAddSuccess && (
        <Snackbar
          open={isSnackbarOpen}
          message="You have successfully registered to participate in the contest."
          onClose={handleClose}
        />
      )}
    </>
  );
};
