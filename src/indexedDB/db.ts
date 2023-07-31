import Dexie, { Table } from "dexie";
import type { Problem } from "@features/problems/problem";
import type { Contest } from "@features/contests/contest";
import type { ProblemLabelState } from "@features/bookmark/problemLabel";
import type { ContestLabelState } from "@features/bookmark/_contestLabel.atom";

export class CFDashboardDB extends Dexie {
  problemLabels!: Table<ProblemLabelState, number>;
  contestLabels!: Table<ContestLabelState, number>;
  labelProblemMapping!: Table<
    {
      labelId: number;
      contestId: number;
      contestName: string;
      index: string;
      name: string;
      rating?: number;
    },
    [number, number, string]
  >;

  constructor() {
    super("CFDashboardDB");
    this.version(1).stores({
      problemLabels: "++id, name, description, color",
      labelProblemMapping: "[labelId+contestId+index]",
    });
  }

  private async deleteRelatedProblems(labelId: number): Promise<void> {
    await this.labelProblemMapping.where("labelId").equals(labelId).delete();
  }

  private async attachProblemsToLabel(
    label: ProblemLabelState
  ): Promise<ProblemLabelState> {
    if (!label.id) {
      throw new Error("Label id is not defined");
    }
    const problems = await this.getProblemsByLabelId(label.id);
    label.problems = problems;
    return label;
  }

  async createLabel(label: ProblemLabelState): Promise<void> {
    await this.problemLabels.add(label);
  }

  async deleteLabel(labelId: number): Promise<void> {
    await this.problemLabels.delete(labelId);
    await this.deleteRelatedProblems(labelId);
  }

  async updateLabel(
    labelId: number,
    label: Omit<ProblemLabelState, "id" | "problems">
  ): Promise<void> {
    await this.problemLabels.update(labelId, label);
  }

  async addProblemToLabel(
    labelId: number,
    problem: {
      contestId: number;
      contestName: string;
      index: string;
      name: string;
      rating?: number;
    }
  ): Promise<void> {
    await this.labelProblemMapping.add({
      labelId: labelId,
      ...problem,
    });
  }

  async deleteProblemFromLabel(
    labelId: number,
    problem: {
      contestId: number;
      index: string;
    }
  ): Promise<void> {
    await this.labelProblemMapping
      .where("[labelId+contestId+index]")
      .equals([labelId, problem.contestId, problem.index])
      .delete();
  }

  async getAllLabels(): Promise<ProblemLabelState[]> {
    return await this.problemLabels.toArray();
  }

  async getLabelsAndProblems(): Promise<ProblemLabelState[]> {
    const labels = await this.getAllLabels();
    return Promise.all(
      labels.map((label) => this.attachProblemsToLabel(label))
    );
  }

  async getLabelAndProblems(labelId: number): Promise<ProblemLabelState> {
    const label = await this.problemLabels.get(labelId);
    if (!label) throw new Error("Label not found");
    return await this.attachProblemsToLabel(label);
  }

  async getProblemsByLabelId(labelId: number): Promise<
    Array<{
      contestId: number;
      contestName: string;
      index: string;
      name: string;
      rating?: number;
    }>
  > {
    return await this.labelProblemMapping
      .where("labelId")
      .equals(labelId)
      .toArray();
  }

  async getLabelAndProblemsByName(name: string): Promise<ProblemLabelState | undefined> {
    const label = await this.problemLabels.where("name").equals(name).first();
    return label ? this.attachProblemsToLabel(label) : undefined;
  }
}

export const db = new CFDashboardDB();
