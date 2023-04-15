import React from "react";
import { render, screen } from "@testing-library/react";
import { ContestLink } from "@features/contests/components/ContestLink";

describe("ContestLink", () => {
  const contestId = 12345;
  const contestName = "Sample Contest";
  const contestUrl = "https://codeforces.com/contest";

  beforeEach(() => {
    render(<ContestLink contestId={contestId} contestName={contestName} />);
  });

  it("renders the correct contest link", () => {
    const link = screen.getByText(contestName);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", `${contestUrl}/${contestId}`);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
