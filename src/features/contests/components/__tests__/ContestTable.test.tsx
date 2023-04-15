import React from "react";
import { render, screen } from "@testing-library/react";
import { ContestsTable } from "@features/contests/components/ContestsTable";
import { ReshapedContest } from "@features/contests/contest";

describe("ContestsTable", () => {
  const problemIdxes = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const mockContests: ReshapedContest[] = [
    {
      id: 1,
      name: "Test Contest 1",
      type: "CF",
      phase: "FINISHED",
      frozen: false,
      durationSeconds: 3600,
      relativeTimeSeconds: 3600,
      startTimeSeconds: 1622385300,
      classification: "Div. 1",
      problems: [],
    },
  ];

  beforeEach(() => {
    render(
      <ContestsTable
        contests={mockContests}
        problemIdxes={problemIdxes}
        showDifficulty={false}
      />
    );
  });

  it("should render successfully", () => {
    expect(screen.getByText("Test Contest 1")).toBeInTheDocument();
  });
});
