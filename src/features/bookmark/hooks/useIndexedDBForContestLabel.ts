import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@indexedDB/db";
import type { ContestLabel } from "@features/bookmark/contestLabel";
import type { Classification } from "@features/contests/contest";

export const useIndexedDBForContestLabel = () => {
  // 作成したコンテストラベルの個数を取得
  const labelsCount = useLiveQuery(async () => db.contestLabels.count());

  // 全てのコンテストラベルのみを取得
  const allLabels = useLiveQuery(async () => db.getAllContestLabels());

  // 全てのコンテストラベルとそのコンテストを取得
  const labelsAndContests = useLiveQuery(async () => db.getLabelsAndContests());

  // 特定のコンテストラベルとそのコンテストを取得
  const fetchLabelAndContestsById = async (labelId: number) =>
    useLiveQuery(() => db.getLabelAndContests(labelId));

  // ラベル名から特定のコンテストラベルとそのコンテストを取得
  const fetchLabelAndContestsByName = (name: string) => {
    try {
      return useLiveQuery(() => db.getLabelAndContestsByName(name));
    } catch (error) {
      return undefined;
    }
  };

  // ラベルを作成
  const createLabel = async (label: ContestLabel) =>
    db.createContestLabel(label);

  // ラベルを削除
  const deleteLabel = async (labelId: number) => db.deleteContestLabel(labelId);

  // ラベルを更新
  const updateLabel = async (
    labelId: number,
    label: Omit<ContestLabel, "id" | "contests">
  ) => db.updateContestLabel(labelId, label);

  // コンテストをラベルに追加
  const addContestToLabel = async (
    labelId: number,
    contest: {
      contestId: number;
      contestName: string;
      classification: Classification;
    }
  ) => db.addContestToLabel(labelId, contest);

  // コンテストをラベルから削除
  const deleteContestFromLabel = async (
    labelId: number,
    contest: {
      contestId: number;
    }
  ) => db.deleteContestFromLabel(labelId, contest);

  return {
    labelsCount,
    allLabels,
    labelsAndContests,
    fetchLabelAndContestsById,
    fetchLabelAndContestsByName,
    createLabel,
    deleteLabel,
    updateLabel,
    addContestToLabel,
    deleteContestFromLabel,
  };
};
