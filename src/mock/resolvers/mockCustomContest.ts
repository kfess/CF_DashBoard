import * as dayjs from "dayjs";
import { MockedRequest, ResponseResolver, restContext } from "msw";
import type { CustomContest } from "@features/custom_contests/customContest";
import { range } from "@helpers/index";

export const mockFetchPublicCustomContest: ResponseResolver<
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
      startDate: dayjs().subtract(1, "day").format("YYYY-MM-DD HH:mm:ss"),
      length: 60,
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
      participants: ["applemelon", "kenkoooo"],
    },
    {
      contestId: "73335ccd-442d-27fd-4697-dca9067094aa",
      title: "For intermediate level contest",
      owner: "applemelon",
      description: "This contest is for intermediate levels",
      penalty: 300,
      startDate: dayjs().subtract(2, "day").format("YYYY-MM-DD HH:mm:ss"),
      length: 60,
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
      participants: ["applemelon", "kenkoooo", "tourist"],
    },
    {
      contestId: "177350d3-28b0-3a26-9fbe-488b930e8174",
      title: "For high level contest",
      owner: "applemelon",
      description: "This contest is for high levels",
      penalty: 300,
      startDate: dayjs().subtract(3, "day").format("YYYY-MM-DD HH:mm:ss"),
      length: 60,
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
      participants: ["applemelon", "kenkoooo", "tourist", "Petr"],
    },
  ];

  const runningContest: CustomContest[] = [
    {
      contestId: "fef8bd04-6b59-40f0-a396-ad68e081a988",
      title: "For beginners contest",
      owner: "testUser",
      description: "This contest is held at the middle of Murch",
      penalty: 200,
      //   startDate: dayjs().subtract(1, "hours").format("YYYY-MM-DD HH:mm:ss"),
      startDate: "2023-03-04 09:00:00",
      length: 60 * 24,
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
      participants: ["applemelon", "kenkoooo"],
    },
    {
      contestId: "a0c59344-b379-88ac-c71f-3dfb1d194937",
      title: "Yellow level",
      owner: "testUser",
      description: "Solve difficult problems in a few days",
      penalty: 200,
      //   startDate: dayjs().subtract(1, "hours").format("YYYY-MM-DD HH:mm:ss"),
      startDate: "2023-03-04 09:00:00",
      length: 60 * 9,
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
      participants: ["applemelon", "kenkoooo"],
    },
    {
      contestId: "fe91569c-0eee-8d56-2ba3-ec25260cfe2f",
      title: "for grandmaster",
      owner: "tourist",
      description: "Solve extremely difficult problems...",
      penalty: 200,
      startDate: dayjs().subtract(1, "hours").format("YYYY-MM-DD HH:mm:ss"),
      length: 60 * 24,
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
      participants: ["applemelon", "kenkoooo"],
    },
  ];

  const upcomingContest: CustomContest[] = [
    {
      contestId: "c4ff7d12-1c63-52b7-d742-aae1c0816b65",
      title: "Enjoy everyone",
      owner: "testUser",
      description: "This contest is held at the middle of Murch",
      penalty: 200,
      //   startDate: dayjs().add(1, "day").format("YYYY-MM-DD HH:mm:ss"),
      startDate: "2023-03-05 18:00:00",
      length: 60,
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
      participants: ["applemelon", "kenkoooo"],
    },
    {
      contestId: "df41a211-39fe-d658-26f9-5bb65ac91e44",
      title: "Yellow level",
      owner: "testUser",
      description: "Solve difficult problems in a few days",
      penalty: 200,
      startDate: dayjs().add(5, "day").format("YYYY-MM-DD HH:mm:ss"),
      length: 120,
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
      participants: ["applemelon", "kenkoooo"],
    },
    {
      contestId: "9779438f-ed9e-a2e4-ea27-a383c5b169d0",
      title: "for grandmaster",
      owner: "tourist",
      description: "Solve extremely difficult problems...",
      penalty: 200,
      startDate: dayjs().add(10, "day").format("YYYY-MM-DD HH:mm:ss"),
      length: 180,
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
      participants: ["applemelon", "kenkoooo"],
    },
  ];

  return res(
    ctx.json([...finishedContests, ...runningContest, ...upcomingContest])
  );
};

export const mockPrivateCustomContest: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(ctx.json([]));
};
