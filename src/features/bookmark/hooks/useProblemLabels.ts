import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@indexedDB/db";

export const useLabelsCount = () => {
  const labelsCount = useLiveQuery(async () => {
    const count = await db.problemLabels.count();
    return count;
  });
  return labelsCount;
};

export const useFetchAllLabels = () => {
  const allLabels = useLiveQuery(async () => {
    const labels = await db.getAllLabels();
    return labels;
  });

  return allLabels;
};

export const useFetchLabelsAndProblems = () => {
  const labelsAndProblems = useLiveQuery(async () => {
    const labels = await db.getLabelsAndProblems();
    return labels;
  });

  return labelsAndProblems;
};

export const useFetchLabelAndProblems = (labelId: number) => {
  const labelAndProblems = useLiveQuery(async () => {
    const label = await db.getLabelAndProblems(labelId);
    return label;
  });

  return labelAndProblems;
};
