import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { TopcoderLikeCircle } from "@features/color/components/TopCoderLikeCircle";

describe("TopCoderLikeCircle", () => {
  test("renders the circle with the specified rating and displayPurpose", () => {
    render(<TopcoderLikeCircle displayPurpose="rating" rating={1500} />);
    const circleElement = screen.getByLabelText("colored circle");
    expect(circleElement).toBeInTheDocument();
  });

  test("renders the circle with the specified difficulty and displayPurpose", () => {
    render(
      <TopcoderLikeCircle
        displayPurpose="difficulty"
        rating={1500}
        solvedCount={500}
      />
    );
    const circleElement = screen.getByLabelText("colored circle");
    expect(circleElement).toBeInTheDocument();
  });

  test("renders the circle with the correct tooltip", async () => {
    render(<TopcoderLikeCircle displayPurpose="rating" rating={1500} />);
    const circleElement = screen.getByLabelText("colored circle");

    fireEvent.mouseOver(circleElement);
    const tooltipElement = await screen.findByRole("tooltip");
    expect(
      within(tooltipElement).getByText("Rating: 1500")
    ).toBeInTheDocument();
  });

  test("renders the circle with the correct tooltip", async () => {
    render(<TopcoderLikeCircle displayPurpose="difficulty" rating={1500} />);
    const circleElement = screen.getByLabelText("colored circle");

    fireEvent.mouseOver(circleElement);
    const tooltipElement = await screen.findByRole("tooltip");
    expect(
      within(tooltipElement).getByText("Difficulty: 1500, Solved by ?")
    ).toBeInTheDocument();
  });

  test("renders the circle with the correct tooltip", async () => {
    render(
      <TopcoderLikeCircle
        displayPurpose="difficulty"
        rating={1500}
        solvedCount={10000}
      />
    );
    const circleElement = screen.getByLabelText("colored circle");

    fireEvent.mouseOver(circleElement);
    const tooltipElement = await screen.findByRole("tooltip");
    expect(
      within(tooltipElement).getByText("Difficulty: 1500, Solved by 10000")
    ).toBeInTheDocument();
  });
});
