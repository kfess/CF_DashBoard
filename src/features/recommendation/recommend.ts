export const recommendLevels = ["Easy", "Medium", "Hard"] as const;
export type RecommendLevel = (typeof recommendLevels)[number];

// Easy 60 ~ 80%, Normal 40~60%, Hard: 30~40%
// 解ける程度の難易度の問題からランダムに選択
const EASY_LOW_SOLVE_PROB = 0.6;
const EASY_UPPER_SOLVE_PROB = 0.8;

const MEDIUM_LOW_SOLVE_PROB = 0.4;
const MEDIUM_UPPER_SOLVE_PROB = 0.6;

const HARD_LOW_SOLVE_PROB = 0.3;
const HARD_UPPER_SOLVE_PROB = 0.4;

// user 指定なしの場合、recommend が内部的に使用する rating は
// 全アクティブユーザーの rating の中央値 (1450 で固定する)
export const MEDIAN_RATING = 1450;

export const solveProbability: {
  [K in RecommendLevel]: { lowerProb: number; upperProb: number };
} = {
  Easy: { lowerProb: EASY_LOW_SOLVE_PROB, upperProb: EASY_UPPER_SOLVE_PROB },
  Medium: {
    lowerProb: MEDIUM_LOW_SOLVE_PROB,
    upperProb: MEDIUM_UPPER_SOLVE_PROB,
  },
  Hard: {
    lowerProb: HARD_LOW_SOLVE_PROB,
    upperProb: HARD_UPPER_SOLVE_PROB,
  },
};
