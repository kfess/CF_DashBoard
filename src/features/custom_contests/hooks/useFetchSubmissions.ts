import dayjs from "dayjs";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CF_USER_SUBMISSION_URL } from "@constants/url";
import type { Submission } from "@features/submission/submission";
import { okSubmissionApiSchema } from "@features/submission/submission";
import type { Problem } from "@features/problems/problem";
import { getProblemKey } from "@features/problems/utils";

type UserSubmissions = Record<string, Submission[]>;

const createProblemSet = (problems: Problem[]): Set<string> => {
  return new Set(
    problems.map(({ contestId, index, name }) =>
      getProblemKey(contestId, index, name)
    )
  );
};

const filterSubmissions = (
  submissions: Submission[],
  problemSet: Set<string>,
  startDate: string,
  endDate: string
): Submission[] => {
  return submissions
    .filter(
      (submission) =>
        dayjs.unix(submission.creationTimeSeconds).isAfter(startDate) &&
        dayjs.unix(submission.creationTimeSeconds).isBefore(endDate) &&
        problemSet.has(
          getProblemKey(
            submission.contestId,
            submission.problem.index,
            submission.problem.name
          )
        )
    )
    .sort((a, b) => a.creationTimeSeconds - b.creationTimeSeconds);
};

const fetchUserSubmissions = async (userId: string): Promise<Submission[]> => {
  try {
    const response = await axios.get(
      `${CF_USER_SUBMISSION_URL}?handle=${userId}`
    );
    return okSubmissionApiSchema.parse(response.data).result;
  } catch (error) {
    console.error(`Error fetching submissions for user ${userId}`);
    return [];
  }
};

// gpt-4 generated
const fetchSubmissions = async (
  users: string[],
  problems: Problem[],
  startDate: string,
  endDate: string
): Promise<UserSubmissions> => {
  try {
    const problemSet = createProblemSet(problems);

    const results = await Promise.all(
      users.map(async (userId) => {
        const submissionsForUser = await fetchUserSubmissions(userId);
        return {
          userId,
          submissions: filterSubmissions(
            submissionsForUser,
            problemSet,
            startDate,
            endDate
          ),
        };
      })
    );

    const submissionsByUser: UserSubmissions = results.reduce(
      (acc, { userId, submissions }) => ({
        ...acc,
        [userId]: submissions,
      }),
      {}
    );

    return submissionsByUser;
  } catch (error) {
    throw new Error("Error fetching submissions");
  }
};

export const useFetchSubmissions = (
  users: string[],
  problems: Problem[],
  startDate: string,
  endDate: string,
  shouldRefetch: boolean
) => {
  const { data, isError, error, isLoading } = useQuery<UserSubmissions>({
    queryKey: ["custom-contest-submissions"],
    queryFn: () => fetchSubmissions(users, problems, startDate, endDate),
    enabled: !!users.length,
    // refetchInterval: shouldRefetch ? 60000 : false,
    refetchInterval: false,
  });

  return { submissionsByUser: data, isError, error, isLoading };
};
