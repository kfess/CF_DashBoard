import Dexie, { Table } from "dexie";
import type { Problem } from "@features/problems/problem";
import type { Contest } from "@features/contests/contest";
import type { ProblemLabel } from "@features/bookmark/problemLabel";
import type { ContestLabel } from "@features/bookmark/contestLabel";
import type { Classification } from "@features/contests/contest";

export class CFDashboardDB extends Dexie {
  problemLabels!: Table<ProblemLabel, number>;
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

  contestLabels!: Table<ContestLabel, number>;
  labelContestMapping!: Table<
    {
      labelId: number;
      contestId: number;
      contestName: string;
      classification: Classification;
    },
    [number, number]
  >;

  constructor() {
    super("CFDashboardDB");
    this.version(2).stores({
      problemLabels: "++id, name, description, color",
      labelProblemMapping: "[labelId+contestId+index]",

      contestLabels: "++id, name, description, color",
      labelContestMapping: "[labelId+contestId]",
    });
  }

  // for problem labels
  private async deleteRelatedProblems(labelId: number): Promise<void> {
    await this.labelProblemMapping.where("labelId").equals(labelId).delete();
  }

  private async attachProblemsToLabel(
    label: ProblemLabel
  ): Promise<ProblemLabel> {
    if (!label.id) {
      throw new Error("Label id is not defined");
    }
    const problems = await this.getProblemsByLabelId(label.id);
    label.problems = problems;
    return label;
  }

  async createProblemLabel(label: ProblemLabel): Promise<void> {
    await this.problemLabels.add(label);
  }

  async deleteProblemLabel(labelId: number): Promise<void> {
    await this.problemLabels.delete(labelId);
    await this.deleteRelatedProblems(labelId);
  }

  async updateProblemLabel(
    labelId: number,
    label: Omit<ProblemLabel, "id" | "problems">
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

  async getAllProblemLabels(): Promise<ProblemLabel[]> {
    return await this.problemLabels.toArray();
  }

  async getLabelsAndProblems(): Promise<ProblemLabel[]> {
    const labels = await this.getAllProblemLabels();
    return Promise.all(
      labels.map((label) => this.attachProblemsToLabel(label))
    );
  }

  async getLabelAndProblems(labelId: number): Promise<ProblemLabel> {
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

  async getLabelAndProblemsByName(
    name: string
  ): Promise<ProblemLabel | undefined> {
    const label = await this.problemLabels.where("name").equals(name).first();
    return label ? this.attachProblemsToLabel(label) : undefined;
  }

  // for contest labels
  private async deleteRelatedContests(labelId: number): Promise<void> {
    await this.labelContestMapping.where("labelId").equals(labelId).delete();
  }

  private async attachContestsToLabel(
    label: ContestLabel
  ): Promise<ContestLabel> {
    if (!label.id) {
      throw new Error("Label id is not defined");
    }
    const contests = await this.getContestsByLabelId(label.id);
    label.contests = contests.map((contest) => ({
      id: contest.contestId,
      name: contest.contestName,
      classification: contest.classification,
    }));
    return label;
  }

  async createContestLabel(label: ContestLabel): Promise<void> {
    await this.contestLabels.add(label);
  }

  async deleteContestLabel(labelId: number): Promise<void> {
    await this.contestLabels.delete(labelId);
    await this.deleteRelatedContests(labelId);
  }

  async updateContestLabel(
    labelId: number,
    label: Omit<ContestLabel, "id" | "contests">
  ): Promise<void> {
    await this.contestLabels.update(labelId, label);
  }

  async addContestToLabel(
    labelId: number,
    contest: {
      contestId: number;
      contestName: string;
      classification: Classification;
    }
  ): Promise<void> {
    await this.labelContestMapping.add({
      labelId: labelId,
      ...contest,
    });
  }

  async deleteContestFromLabel(
    labelId: number,
    contest: {
      contestId: number;
    }
  ): Promise<void> {
    await this.labelContestMapping
      .where("[labelId+contestId]")
      .equals([labelId, contest.contestId])
      .delete();
  }

  async getAllContestLabels(): Promise<ContestLabel[]> {
    return await this.contestLabels.toArray();
  }

  async getLabelsAndContests(): Promise<ContestLabel[]> {
    const labels = await this.getAllContestLabels();
    return Promise.all(
      labels.map((label) => this.attachContestsToLabel(label))
    );
  }

  async getLabelAndContests(labelId: number): Promise<ContestLabel> {
    const label = await this.contestLabels.get(labelId);
    if (!label) throw new Error("Label not found");
    return await this.attachContestsToLabel(label);
  }

  async getContestsByLabelId(labelId: number): Promise<
    Array<{
      contestId: number;
      contestName: string;
      classification: Classification;
    }>
  > {
    return await this.labelContestMapping
      .where("labelId")
      .equals(labelId)
      .toArray();
  }

  async getLabelAndContestsByName(
    name: string
  ): Promise<ContestLabel | undefined> {
    const label = await this.contestLabels.where("name").equals(name).first();
    return label ? this.attachContestsToLabel(label) : undefined;
  }
}

export const db = new CFDashboardDB();
