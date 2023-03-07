import * as dayjs from "dayjs";
import { MockedRequest, ResponseResolver, restContext } from "msw";
import type { CustomContest } from "@features/custom_contests/customContest";
import { range } from "@helpers/index";

export const mockFetchPublicCustomContests: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  const finishedContests: CustomContest[] = [
    {
      contestId: "5a4ed3a1-c4f0-4397-9fc8-e050e88c1f2e",
      title: "For beginners contest",
      owner: "applemelon",
      description: "This contest is for beginners",
      penalty: 200,
      mode: "Normal",
      startDate: dayjs().subtract(2, "day").format("YYYY-MM-DD HH:mm:ss"),
      endDate: dayjs().subtract(1, "day").format("YYYY-MM-DD HH:mm:ss"),
      visibility: "Public",
      problems: range(1, 6).map((n) => {
        return {
          contestId: n,
          contestName: `globalProblem-${n}`,
          problemsetName: "globalTest",
          index: "A",
          name: `global-contest-problem-${n}`,
          type: "PROGRAMMING",
          rating: 1000 + 200 * n,
          tags: ["implementation", "binary search", "brute force"],
          classification: "Global",
        };
      }),
      participants: [{ userId: "applemelon" }, { userId: "kenkoooo" }],
    },
    {
      contestId: "73335ccd-442d-27fd-4697-dca9067094aa",
      title: "For intermediate level contest",
      owner: "applemelon",
      description: "This contest is for intermediate levels",
      penalty: 300,
      mode: "Normal",
      startDate: dayjs().subtract(3, "day").format("YYYY-MM-DD HH:mm:ss"),
      endDate: dayjs().subtract(2, "day").format("YYYY-MM-DD HH:mm:ss"),
      visibility: "Public",
      problems: range(1, 6).map((n) => {
        return {
          contestId: n,
          contestName: `educationalProblem-${n}`,
          problemsetName: "educationalTest",
          index: "A",
          name: `educational-contest-problem-${n}`,
          type: "PROGRAMMING",
          rating: 1000 + 200 * n,
          tags: ["implementation", "bitmasks"],
          classification: "Educational",
        };
      }),
      participants: [{ userId: "applemelon" }, { userId: "kenkoooo" }],
    },
    {
      contestId: "177350d3-28b0-3a26-9fbe-488b930e8174",
      title: "For high level contest",
      owner: "applemelon",
      description: "This contest is for high levels",
      penalty: 300,
      mode: "Normal",
      startDate: dayjs().subtract(4, "day").format("YYYY-MM-DD HH:mm:ss"),
      endDate: dayjs().subtract(3, "day").format("YYYY-MM-DD HH:mm:ss"),
      visibility: "Public",
      problems: range(1, 6).map((n) => {
        return {
          contestId: n,
          contestName: `educationalProblem-${n}`,
          problemsetName: "educationalTest",
          index: "A",
          name: `educational-contest-problem-${n}`,
          type: "PROGRAMMING",
          rating: 1000 + 200 * n,
          tags: ["implementation", "bitmasks"],
          classification: "Educational",
        };
      }),
      participants: [{ userId: "applemelon" }, { userId: "kenkoooo" }],
    },
  ];

  const runningContest: CustomContest[] = [
    {
      contestId: "fef8bd04-6b59-40f0-a396-ad68e081a988",
      title: "For beginners contest",
      owner: "testUser",
      description: "This contest is held at the middle of Murch",
      penalty: 200,
      mode: "Normal",
      startDate: "2023-03-07 09:00:00",
      endDate: "2023-03-09 21:00:00",
      visibility: "Public",
      problems: range(1, 6).map((n) => {
        return {
          contestId: n,
          contestName: `globalProblem-${n}`,
          problemsetName: "globalTest",
          index: "A",
          name: `global-contest-problem-${n}`,
          type: "PROGRAMMING",
          rating: 1000 + 200 * n,
          tags: ["implementation", "binary search", "brute force"],
          classification: "Global",
        };
      }),
      participants: [{ userId: "applemelon" }, { userId: "kenkoooo" }],
    },
    {
      contestId: "a0c59344-b379-88ac-c71f-3dfb1d194937",
      title: "Yellow level",
      owner: "testUser",
      description: "Solve difficult problems in a few days",
      penalty: 200,
      mode: "Normal",
      startDate: "2023-03-07 09:00:00",
      endDate: "2023-03-09 21:00:00",
      visibility: "Public",
      problems: range(1, 6).map((n) => {
        return {
          contestId: n,
          contestName: `globalProblem-${n}`,
          problemsetName: "globalTest",
          index: "A",
          name: `global-contest-problem-${n}`,
          type: "PROGRAMMING",
          rating: 1000 + 200 * n,
          tags: ["implementation", "binary search", "brute force"],
          classification: "Global",
        };
      }),
      participants: [{ userId: "applemelon" }, { userId: "kenkoooo" }],
    },
    {
      contestId: "fe91569c-0eee-8d56-2ba3-ec25260cfe2f",
      title: "for grandmaster",
      owner: "tourist",
      description: "Solve extremely difficult problems...",
      penalty: 200,
      mode: "Normal",
      startDate: "2023-03-07 09:00:00",
      endDate: "2023-03-10 21:00:00",
      visibility: "Public",
      problems: range(1, 6).map((n) => {
        return {
          contestId: n,
          contestName: `globalProblem-${n}`,
          problemsetName: "globalTest",
          index: "A",
          name: `global-contest-problem-${n}`,
          type: "PROGRAMMING",
          rating: 1000 + 200 * n,
          tags: ["implementation", "binary search", "brute force"],
          classification: "Global",
        };
      }),
      participants: [{ userId: "applemelon" }, { userId: "kenkoooo" }],
    },
  ];

  const upcomingContest: CustomContest[] = [
    {
      contestId: "c4ff7d12-1c63-52b7-d742-aae1c0816b65",
      title: "Enjoy everyone",
      owner: "testUser",
      description: "This contest is held at the middle of Murch",
      penalty: 200,
      mode: "Normal",
      startDate: "2023-03-15 18:00:00",
      endDate: "2023-03-16 18:00:00",
      visibility: "Public",
      problems: range(1, 6).map((n) => {
        return {
          contestId: n,
          contestName: `globalProblem-${n}`,
          problemsetName: "globalTest",
          index: "A",
          name: `global-contest-problem-${n}`,
          type: "PROGRAMMING",
          rating: 1000 + 200 * n,
          tags: ["implementation", "binary search", "brute force"],
          classification: "Global",
        };
      }),
      participants: [{ userId: "applemelon" }, { userId: "kenkoooo" }],
    },
    {
      contestId: "df41a211-39fe-d658-26f9-5bb65ac91e44",
      title: "Yellow level",
      owner: "testUser",
      description: "Solve difficult problems in a few days",
      penalty: 200,
      mode: "Normal",
      startDate: dayjs().add(5, "day").format("YYYY-MM-DD HH:mm:ss"),
      endDate: dayjs().add(6, "day").format("YYYY-MM-DD HH:mm:ss"),
      visibility: "Public",
      problems: range(1, 6).map((n) => {
        return {
          contestId: n,
          contestName: `globalProblem-${n}`,
          problemsetName: "globalTest",
          index: "A",
          name: `global-contest-problem-${n}`,
          type: "PROGRAMMING",
          rating: 1000 + 200 * n,
          tags: ["implementation", "binary search", "brute force"],
          classification: "Global",
        };
      }),
      participants: [{ userId: "applemelon" }, { userId: "kenkoooo" }],
    },
    {
      contestId: "9779438f-ed9e-a2e4-ea27-a383c5b169d0",
      title: "for grandmaster",
      owner: "tourist",
      description: "Solve extremely difficult problems...",
      penalty: 200,
      mode: "Normal",
      startDate: dayjs().add(10, "day").format("YYYY-MM-DD HH:mm:ss"),
      endDate: dayjs().add(11, "day").format("YYYY-MM-DD HH:mm:ss"),
      visibility: "Public",
      problems: range(1, 6).map((n) => {
        return {
          contestId: n,
          contestName: `globalProblem-${n}`,
          problemsetName: "globalTest",
          index: "A",
          name: `global-contest-problem-${n}`,
          type: "PROGRAMMING",
          rating: 1000 + 200 * n,
          tags: ["implementation", "binary search", "brute force"],
          classification: "Global",
        };
      }),
      participants: [{ userId: "applemelon" }, { userId: "kenkoooo" }],
    },
  ];

  return res(
    ctx.json([...finishedContests, ...runningContest, ...upcomingContest])
  );
};

export const mockFetchPublicCustomContest: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  const contest: CustomContest = {
    contestId: "randomly-generated UUID",
    title: "for grandmaster",
    owner: "tourist",
    description: "Solve extremely difficult problems...",
    penalty: 200,
    mode: "Normal",
    startDate: "2023-03-04 09:00:00",
    endDate: "2023-03-07 21:00:00",
    visibility: "Public",
    problems: range(1, 6).map((n) => {
      return {
        contestId: n,
        contestName: `globalProblem-${n}`,
        problemsetName: "globalTest",
        index: "A",
        name: `global-contest-problem-${n}`,
        type: "PROGRAMMING",
        rating: 1000 + 200 * n,
        tags: ["implementation", "binary search", "brute force"],
        classification: "Global",
      };
    }),
    participants: [{ userId: "applemelon" }, { userId: "kenkoooo" }],
  };

  return res(ctx.json(contest));
};

export const mockPrivateCustomContest: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(ctx.json([]));
};
