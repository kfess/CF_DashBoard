export {};
// import { useLocalStorage } from "@hooks/useLocalStorage";
// import { getRandomElements, seedBasedRandom } from "@helpers/random";
// import type { RecommendLevel } from "@features/recommendation/recommend";
// import { recommendDifficultyRange } from "@features/recommendation/helper";
// import type { Problem } from "@features/problems/problem";
// import { useFetchUserInfo } from "@features/layout/useUserInfo";
// import { useFetchProblems } from "@features/problems/hooks/useFetchProblem";
// import { useSolvedStatus } from "@features/submission/hooks/useSolvedStatus";

// type DailyRecommendation = { seed: number } & {
//   [key in RecommendLevel]: Problem[];
// };

// // 日ごとに、レコメンドすべき問題を求める
// // user がセットされていない場合は、デフォルトのレコメンドを返す

// // user がセットされている場合は、日付を seed として random に選択し、まだ解いていない問題を、
// // Easy, Normal, Hard それぞれ 50 問ずつ選択して localStorage に保存しておく
// // 2 度目以降は、localStorage に保存してある問題を返せば良い
// // localStorage に保存しておくことで、問題を解いた後も、日付が変わるまでは保持しておくことができる
// export const useRecommendation = (userId: string) => {
//   const { data: problems } = useFetchProblems();
//   const { solvedSet } = useSolvedStatus();

//   const { data: userData } = useFetchUserInfo({ userId: userId });
//   const userRating = userData?.rating;

//   const seed =
//     new Date().getFullYear() * 10000 +
//     (new Date().getMonth() + 1) * 100 +
//     new Date().getDate();
//   const rng = seedBasedRandom(seed);

//   if (!userId) {
//   }
// };
