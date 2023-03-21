import dayjs from "dayjs";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CF_USER_SUBMISSION_URL } from "@constants/url";
import type { Submission } from "@features/submission/submission";
import { okSubmissionApiSchema } from "@features/submission/submission";
import type { Problem } from "@features/problems/problem";

type UserSubmissions = Record<string, Submission[]>;

const createProblemSet = (problems: Problem[]): Set<string> => {
  return new Set(
    problems.map(({ contestId, index }) => `${contestId}-${index}`)
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
        problemSet.has(`${submission.contestId}-${submission.problem.index}`)
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

const fetchSubmissions = async (
  users: { userId: string }[],
  problems: Problem[],
  startDate: string,
  endDate: string
): Promise<UserSubmissions> => {
  try {
    const problemSet = createProblemSet(problems);

    const responses = await Promise.all(
      users.map(({ userId }) => fetchUserSubmissions(userId))
    );

    const allSubmissions = responses.flat();
    const submissionsByUser: UserSubmissions = users.reduce(
      (acc, { userId }) => {
        const submissionsForUser = filterSubmissions(
          allSubmissions,
          problemSet,
          startDate,
          endDate
        ).filter((submission) =>
          submission.author.members.some((member) => member.handle === userId)
        );
        return { ...acc, [userId]: submissionsForUser };
      },
      {} as Record<string, Submission[]>
    );

    return submissionsByUser;
  } catch (error) {
    throw new Error("Error fetching submissions");
  }
};

export const useFetchSubmissions = (
  users: { userId: string }[],
  problems: Problem[],
  startDate: string,
  endDate: string,
  shouldRefetch: boolean
) => {
  const { data, isError, error, isLoading } = useQuery<UserSubmissions>({
    queryKey: ["custom-contest-submissions"],
    queryFn: () => fetchSubmissions(users, problems, startDate, endDate),
    enabled: !!users.length,
    refetchInterval: shouldRefetch ? 60000 : false,
  });

  return { data, isError, error, isLoading };
};
