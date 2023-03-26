import * as dayjs from "dayjs";
import { MockedRequest, ResponseResolver, restContext } from "msw";
import {
  APIFilterType,
  CustomContest,
  apiFilterTypes,
} from "@features/custom_contests/customContest";
import { customContestSchema } from "@features/custom_contests/customContest";
import { range } from "@helpers/index";

const CUSTOM_CONTEST_KEY = "_mock_custom_contest";
const initialCustomContestsData: CustomContest[] = [
  {
    contestId: "5a4ed3a1-c4f0-4397-9fc8-e050e88c1f2e",
    title: "For beginners contest",
    owner: "applemelon",
    ownerId: "12345",
    description: "This contest is for beginners",
    penalty: 200,
    mode: "Normal",
    startDate: "2023-01-01 12:00:00",
    endDate: "2023-01-01 14:00:00",
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

const initializeCustomContests = () => {
  const serializedData = JSON.stringify(initialCustomContestsData);
  localStorage.setItem(CUSTOM_CONTEST_KEY, serializedData);
};

if (!localStorage.getItem(CUSTOM_CONTEST_KEY)) {
  initializeCustomContests();
}

const getContestsFromLocalStorage = (): CustomContest[] => {
  const storedContests = localStorage.getItem(CUSTOM_CONTEST_KEY);
  return storedContests ? JSON.parse(storedContests) : [];
};

const setContestsToLocalStorage = (contests: CustomContest[]) => {
  localStorage.setItem(CUSTOM_CONTEST_KEY, JSON.stringify(contests));
};

const isFilterType = (value: string): value is APIFilterType => {
  return apiFilterTypes.includes(value as APIFilterType);
};

// use to authenticate msw
const myAccount = { userId: "12345", username: "kfess" };

// get all public custom contests
export const mockFetchContests: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  const filter = req.url.searchParams.get("filter");

  if (!filter || !isFilterType(filter)) {
    res(ctx.status(400), ctx.json({ message: "Invalid filter type" }));
  }

  const contests = getContestsFromLocalStorage();
  let selectedContests: CustomContest[] = [];

  switch (filter as APIFilterType) {
    case "public":
      selectedContests = [
        ...contests.filter((contest) => contest.visibility === "Public"),
      ];
      break;
    case "private":
      selectedContests = [
        ...contests.filter(
          (contest) =>
            contest.visibility === "Private" &&
            myAccount.userId === contest.ownerId
        ),
      ];
      break;
    case "createdbyme":
      selectedContests = [
        ...contests.filter((contest) => contest.ownerId === "12345"),
      ];
      break;
    case "joined":
      selectedContests = [
        ...contests.filter((contest) =>
          contest.participants.some(
            (participant) => participant.userId === myAccount.username
          )
        ),
      ];
      break;
    default:
      return res(
        ctx.status(400),
        ctx.json({ message: "Invalid filter parameter" })
      );
  }

  return res(ctx.status(200), ctx.json(selectedContests));
};

// get all public custom contests
export const mockFetchContest: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  const pathRegex = /\/custom-contest\/(.+)/;
  const matchResult = req.url.pathname.match(pathRegex);
  const contestId = matchResult ? matchResult[1] : "";

  const contests = getContestsFromLocalStorage();

  const contestIdx = contests.findIndex(
    (contest) => contest.contestId === contestId
  );

  if (contestIdx === -1) {
    return res(ctx.status(400), ctx.json({ errors: "Contest Not Found" }));
  }
  const selectedContest = contests.find(
    (contest) => contest.contestId === contestId
  );

  return res(ctx.status(200), ctx.json(selectedContest));
};

// add custom contest (the visibility of the contest is both public and private)
export const mockAddContest: ResponseResolver<
  MockedRequest,
  typeof restContext
> = async (req, res, ctx) => {
  const contest = JSON.parse(await req.text());
  const validationResult = customContestSchema.safeParse(contest);

  if (!validationResult.success) {
    return res(ctx.status(400), ctx.json({ errors: validationResult.error }));
  }

  const contests = getContestsFromLocalStorage();
  setContestsToLocalStorage([...contests, customContestSchema.parse(contest)]);
  return res(ctx.status(201));
};

// edit contest
export const mockEditContest: ResponseResolver<
  MockedRequest,
  typeof restContext
> = async (req, res, ctx) => {
  const contestId = req.url.searchParams.get("contestId");
  const updatedCountest = JSON.parse(await req.text());
  const validationResult = customContestSchema.safeParse(updatedCountest);

  if (!validationResult.success) {
    return res(ctx.status(400), ctx.json({ errors: validationResult.error }));
  }

  const contests = getContestsFromLocalStorage();
  const contestIdx = contests.findIndex(
    (contest) => contest.contestId === contestId
  );

  if (contestIdx === -1) {
    return res(ctx.status(400), ctx.json({ errors: "Contest Not Found" }));
  }

  contests[contestIdx] = updatedCountest;
  setContestsToLocalStorage(contests);

  return res(ctx.status(204));
};

// delete contest if any
export const mockDeleteContest: ResponseResolver<
  MockedRequest,
  typeof restContext
> = async (req, res, ctx) => {
  const contestId = req.url.searchParams.get("contestId");
  const contests = getContestsFromLocalStorage();
  const contestIdx = contests.findIndex(
    (contest) => contest.contestId === contestId
  );

  if (contestIdx === -1) {
    return res(ctx.status(400), ctx.json({ errors: "Contest Not Found" }));
  }

  setContestsToLocalStorage([
    ...contests.filter((contest) => contest.contestId !== contestId),
  ]);

  return res(ctx.status(204));
};

// コンテストへの参加者を追加する
export const mockAddParticipantToContest: ResponseResolver<
  MockedRequest,
  typeof restContext
> = async (req, res, ctx) => {
  const pathRegex = /\/custom-contest\/(.+)\/participants/;
  const matchResult = req.url.pathname.match(pathRegex);
  const contestId = matchResult ? matchResult[1] : "";

  const requestBody = JSON.parse(await req.text());
  const { userId } = requestBody;

  if (!userId) {
    res(ctx.status(400), ctx.json({ errors: "User ID is missing." }));
  }

  const contests = getContestsFromLocalStorage();

  const contestIdx = contests.findIndex(
    (contest) => contest.contestId === contestId
  );

  if (contestIdx === -1) {
    return res(ctx.status(400), ctx.json({ errors: "Contest Not Found" }));
  }

  // Check if the user is already a participant
  const existingParticipant = contests[contestIdx].participants.find(
    (participant) => participant.userId === userId
  );

  if (existingParticipant) {
    return res(ctx.status(400), ctx.json({ errors: "User already exists" }));
  }

  const updatedContest: CustomContest = {
    ...contests[contestIdx],
    participants: [...contests[contestIdx].participants, { userId: userId }],
  };

  contests[contestIdx] = updatedContest;
  setContestsToLocalStorage(contests);

  return res(ctx.status(204));
};

// コンテストに既に参加済みかどうかを判断するための API
export const mockHasUserRegistered: ResponseResolver<
  MockedRequest,
  typeof restContext
> = async (req, res, ctx) => {
  console.log("hehah");

  const url = req.url.pathname;
  const uuidRegex = /[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}/;
  const match = url.match(uuidRegex);
  const contestId = match ? match[0] : "";

  const userId = req.url.searchParams.get("userId");

  const contests = getContestsFromLocalStorage();
  const contest = contests.find((c) => c.contestId === contestId);

  if (!contest) {
    return res(ctx.status(404), ctx.json({ errors: "Contest Not Found" }));
  }

  const hasUserRegistered = contest.participants.some(
    (participant) => participant.userId === userId
  );

  return res(ctx.status(200), ctx.json({ hasUserRegistered }));
};

//////////////////////////////////////////////
// lines below is to be removed in the future.
//////////////////////////////////////////////
export const mockFetchPublicCustomContests: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  const finishedContests: CustomContest[] = [
    {
      contestId: "5a4ed3a1-c4f0-4397-9fc8-e050e88c1f2e",
      title: "For beginners contest",
      owner: "applemelon",
      ownerId: "12345",
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
      ownerId: "12345",
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
      ownerId: "12345",
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
      ownerId: "12345",
      description: "This contest is held at the middle of Murch",
      penalty: 200,
      mode: "Normal",
      startDate: "2023-03-14 09:00:00",
      endDate: "2023-03-15 21:00:00",
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
      ownerId: "12345",
      description: "Solve difficult problems in a few days",
      penalty: 200,
      mode: "Normal",
      startDate: "2023-03-14 09:00:00",
      endDate: "2023-03-17 21:00:00",
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
      ownerId: "12345",
      description: "Solve extremely difficult problems...",
      penalty: 200,
      mode: "Normal",
      startDate: "2023-03-14 09:00:00",
      endDate: "2023-03-19 21:00:00",
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
      ownerId: "12345",
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
      ownerId: "12345",
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
      ownerId: "12345",
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
    owner: "applemelon",
    ownerId: "12345",
    description: "Solve extremely difficult problems...",
    penalty: 200,
    mode: "Normal",
    startDate: "2016-06-14 19:00:00",
    endDate: "2024-01-01 09:00:00",
    visibility: "Public",
    problems: [
      {
        contestId: 1684,
        contestName: "contest-1684",
        problemsetName: "",
        index: "A",
        name: "Digit Minimization",
        type: "PROGRAMMING",
        rating: 800,
        tags: ["constructive algorithms", "games", "math", "strings"],
        classification: "All",
      },
      {
        contestId: 817,
        contestName: "contest-817",
        problemsetName: "",
        index: "C",
        name: "Really Big Numbers",
        type: "PROGRAMMING",
        rating: 1600,
        tags: ["binary search", "brute force", "dp", "math"],
        classification: "All",
      },
      {
        contestId: 678,
        contestName: "contest-678",
        problemsetName: "",
        index: "E",
        name: "Another Sith Tournament",
        type: "PROGRAMMING",
        rating: 2200,
        tags: ["bitmasks", "dp", "math", "probabilities"],
        classification: "All",
      },
      {
        contestId: 621,
        contestName: "contest-621",
        problemsetName: "",
        index: "C",
        name: "Wet Shark and Flowers",
        type: "PROGRAMMING",
        rating: 1700,
        tags: ["combinatorics", "math", "number theory", "probabilities"],
        classification: "All",
      },
      {
        contestId: 617,
        contestName: "contest-617",
        problemsetName: "",
        index: "C",
        name: "Watering Flowers",
        type: "PROGRAMMING",
        rating: 1600,
        tags: ["implementation"],
        classification: "All",
      },
    ],
    participants: [
      { userId: "kenkoooo" },
      // { userId: "Petr" },
      { userId: "applemelon" },
      { userId: "tourist" },
    ],
  };

  return res(ctx.json(contest));
};

export const mockPrivateCustomContest: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(ctx.json([]));
};
