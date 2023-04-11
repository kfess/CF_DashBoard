import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { OfficialContest } from "@features/contests/official_contest";
import { CF_CONTESTS_URL, CF_PROBLEMS_URL } from "@constants/url";
import type { OfficialProblem } from "@features/problems/official_problem";
import { okContestsApiSchema } from "@features/contests/official_contest";
import { okProblemsApiSchema } from "@features/problems/official_problem";
import { Classification, Contest } from "../contest";

// just for development
const getClassification = (contestName: string): Classification => {
  const classifications = [
    "Div. 1 + Div. 2",
    "Div. 1",
    "Div. 2",
    "Div. 3",
    "Div. 4",
    "ICPC",
    "Kotlin Heroes",
    "Global",
    "Educational",
  ];

  const foundClassification = classifications.find((classification) =>
    contestName.includes(classification)
  );
  return (foundClassification || "Others") as Classification;
};

const fetchOfficialContests = async (): Promise<OfficialContest[]> => {
  try {
    const response = await axios.get(CF_CONTESTS_URL);
    const data = okContestsApiSchema.parse(response.data);
    return data.result;
  } catch (error) {
    console.log(error);
    throw new Error("An Error occurred while fetching official contests");
  }
};

const fetchOfficialProblems = async (): Promise<OfficialProblem[]> => {
  try {
    const response = await axios.get(CF_PROBLEMS_URL);
    const data = okProblemsApiSchema.parse(response.data);
    return data.result.problems;
  } catch (error) {
    throw new Error("An Error occurred while fetching official problems");
  }
};

const fetchOfficialContestsAndProblems = async (): Promise<Contest[]> => {
  const contests = await fetchOfficialContests();
  const problems = await fetchOfficialProblems();

  const problemMap: Record<number, OfficialProblem[]> = problems.reduce(
    (acc: Record<number, OfficialProblem[]>, problem) => {
      return {
        ...acc,
        [problem.contestId]: acc[problem.contestId]
          ? [...acc[problem.contestId], problem]
          : [problem],
      };
    },
    {}
  );

  const mergedData: Contest[] = contests
    .filter((contest) => contest.phase === "FINISHED")
    .map((contest) => {
      const classification = getClassification(contest.name);
      const contestProblems = problemMap[contest.id]
        ?.filter((problem) => !/^\d+$/.test(problem.index))
        .sort((a, b) => (a.index < b.index ? -1 : a.index > b.index ? 1 : 0))
        .map((problem) => ({
          ...problem,
          contestName: contest.name,
          classification,
        }));

      return {
        contestId: contest.id,
        contestName: contest.name,
        type: contest.type,
        phase: contest.phase,
        frozen: contest.frozen,
        durationSeconds: contest.durationSeconds,
        startTimeSeconds: contest.startTimeSeconds,
        relativeTimeSeconds: contest.relativeTimeSeconds,
        preparedBy: contest.preparedBy,
        websiteUrl: contest.websiteUrl,
        description: contest.description,
        difficulty: contest.difficulty,
        kind: contest.kind,
        icpcRegion: contest.icpcRegion,
        country: contest.country,
        city: contest.city,
        classification,
        problems: contestProblems || [],
      };
    })
    .filter((contest) => contest.problems.length > 0);

  return mergedData;
};

// codeforces の contest データの更新頻度は低いため、長めの cache を持たせる
export const useFetchOfficialContests = () => {
  const { data, isError, error, isLoading } = useQuery<Contest[], Error>({
    queryKey: ["official-contests"],
    queryFn: fetchOfficialContestsAndProblems,
    cacheTime: 1000 * 60 * 60 * 24,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 3,
  });

  return { data, isError, error, isLoading };
};

export const useOfficialContestIdNameMap = () => {
  const { data, isError, error, isLoading } = useQuery<
    OfficialContest[],
    Error
  >({
    queryKey: ["official-contests-id-name"],
    queryFn: fetchOfficialContests,
    cacheTime: 1000 * 60 * 60 * 24,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 3,
  });

  const contestIdNameMap: Record<number, string> = {};
  data?.forEach((contest) => {
    contestIdNameMap[contest.id] = contest.name;
  });

  return { contestIdNameMap, isError, error, isLoading };
};
