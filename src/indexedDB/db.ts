import Dexie, { Table } from "dexie";
import type { Problem } from "@features/problems/problem";
import type { Contest } from "@features/contests/contest";
import type {
  ProblemLabelState,
  // PartialProblem,
} from "@features/bookmark/_problemLabel.atom";
import type { ContestLabelState } from "@features/bookmark/_contestLabel.atom";

export class CFDashboardDB extends Dexie {
  problemLabels!: Table<ProblemLabelState, number>;
  contestLabels!: Table<ContestLabelState, number>;
  labelProblemMapping!: Table<
    {
      labelId: number;
      contestId: number;
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

  async createLabel(label: ProblemLabelState): Promise<number> {
    return await this.problemLabels.add(label);
  }

  async deleteLabel(labelId: number): Promise<void> {
    await this.problemLabels.delete(labelId);
    await this.labelProblemMapping.where("labelId").equals(labelId).delete();
  }

  async updateLabel(
    labelId: number,
    label: Omit<ProblemLabelState, "id">
  ): Promise<void> {
    await this.problemLabels.update(labelId, label);
  }

  async addProblemLabel(
    labelId: number,
    problem: {
      contestId: number;
      index: string;
      name: string;
      rating?: number;
    }
  ): Promise<void> {
    await this.labelProblemMapping.add({
      labelId: labelId,
      contestId: problem.contestId,
      index: problem.index,
      name: problem.name,
      rating: problem.rating,
    });
  }

  async deleteProblemLabel(
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

  async getProblemLabels(): Promise<ProblemLabelState[]> {
    const labels = await this.problemLabels.toArray();
    return labels;
  }
}

export const db = new CFDashboardDB();
