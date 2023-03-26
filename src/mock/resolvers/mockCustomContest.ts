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
