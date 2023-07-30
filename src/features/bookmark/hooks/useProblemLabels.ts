import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@indexedDB/db";

export const useFetchAllLabels = () => {
  const allLabels = useLiveQuery(async () => {
    const labels = await db.getProblemLabels();
    return labels;
  });

  return allLabels;
};
