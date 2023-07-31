import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@indexedDB/db";
import type { ProblemLabelState } from "@features/bookmark/problemLabel";

export const useIndexedDBForProblemLabel = () => {
  // 作成した問題ラベルの個数を取得
  const labelsCount = useLiveQuery(async () => db.problemLabels.count());

  // 全ての問題ラベルのみを取得
  const allLabels = useLiveQuery(async () => db.getAllLabels());

  // 全ての問題ラベルとその問題を取得
  const labelsAndProblems = useLiveQuery(async () => db.getLabelsAndProblems());

  // 特定の問題ラベルとその問題を取得
  const fetchLabelAndProblemsById = async (labelId: number) =>
    useLiveQuery(() => db.getLabelAndProblems(labelId));

  // ラベル名から特定の問題ラベルとその問題を取得
  const fetchLabelAndProblemsByName = (name: string) => {
    try {
      return useLiveQuery(() => db.getLabelAndProblemsByName(name));
    } catch (error) {
      return undefined;
    }
  };

  // ラベルを作成
  const createLabel = async (label: ProblemLabelState) => db.createLabel(label);

  // ラベルを削除
  const deleteLabel = async (labelId: number) => db.deleteLabel(labelId);

  // ラベルを更新
  const updateLabel = async (
    labelId: number,
    label: Omit<ProblemLabelState, "id" | "problems">
  ) => db.updateLabel(labelId, label);

  // 問題をラベルに追加
  const addProblemToLabel = async (
    labelId: number,
    problem: {
      contestId: number;
      contestName: string;
      index: string;
      name: string;
      rating?: number;
    }
  ) => db.addProblemToLabel(labelId, problem);

  // 問題をラベルから削除
  const deleteProblemFromLabel = async (
    labelId: number,
    problem: {
      contestId: number;
      index: string;
    }
  ) => db.deleteProblemFromLabel(labelId, problem);

  return {
    labelsCount,
    allLabels,
    labelsAndProblems,
    fetchLabelAndProblemsById,
    fetchLabelAndProblemsByName,
    createLabel,
    deleteLabel,
    updateLabel,
    addProblemToLabel,
    deleteProblemFromLabel,
  };
};
