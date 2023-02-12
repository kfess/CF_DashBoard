import React from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import type { Submission } from "@features/submission/submission";
import {
  isACSubmission,
  filterUniqueSubmissions,
} from "@features/achievement/processSubmission";

type Props = { submissions: Submission[] };

export const ContestPieChart: React.FC<Props> = (props: Props) => {
  const { submissions } = props;

  const ACSubmissions = submissions.filter(isACSubmission);
  const uniqueACSubmissions = filterUniqueSubmissions(ACSubmissions);

  return <></>;
};
