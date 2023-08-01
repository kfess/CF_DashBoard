import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@indexedDB/db";
import type { ProblemLabel } from "@features/bookmark/problemLabel";

export const useIndexedDBForProblemLabel = () => {
  // 作成した問題ラベルの個数を取得
  const labelsCount = useLiveQuery(async () => db.problemLabels.count());

  // 全ての問題ラベルのみを取得
  const allLabels = useLiveQuery(async () => db.getAllProblemLabels());

  // 全てのラベルの名前のみを取得
  const allLabelNames = useLiveQuery(async () => {
    const allLabels = await db.getAllProblemLabels();
    return allLabels.map((label) => label.name);
  });

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
  const createLabel = async (label: ProblemLabel) =>
    db.createProblemLabel(label);

  // ラベルを削除
  const deleteLabel = async (labelId: number) => db.deleteProblemLabel(labelId);

  // ラベルを更新
  const updateLabel = async (
    labelId: number,
    label: Omit<ProblemLabel, "id" | "problems">
  ) => db.updateProblemLabel(labelId, label);

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

  // 特定の問題が、特定のラベルに含まれているかどうかを判定
  const isProblemAddedToLabel = async (
    labelId: number,
    problem: {
      contestId: number;
      index: string;
    }
  ) => db.isProblemAddedToLabel(labelId, problem);

  return {
    labelsCount,
    allLabels,
    allLabelNames,
    labelsAndProblems,
    fetchLabelAndProblemsById,
    fetchLabelAndProblemsByName,
    createLabel,
    deleteLabel,
    updateLabel,
    addProblemToLabel,
    deleteProblemFromLabel,
    isProblemAddedToLabel,
  };
};
