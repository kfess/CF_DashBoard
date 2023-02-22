import React from "react";

export const recommendLevels = ["Easy", "Medium", "Hard"] as const;
type RecommendLevel = typeof recommendLevels[number];

type Props = {
  level: RecommendLevel;
  userRating?: number;
};

export const RecommendProblemsTable: React.FC<Props> = (props: Props) => {
  const { level, userRating } = props;

  return <>{userRating}</>;
};
