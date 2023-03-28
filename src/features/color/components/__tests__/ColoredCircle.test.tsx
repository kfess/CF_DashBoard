import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ColoredCircle } from "@features/color/components/ColoredCircle";

// test for css property (linear-gradient) is so difficult with jest?
// I have not provided the test for it yet.

describe("ColoredCircle", () => {
  test("renders the circle properly", () => {
    render(<ColoredCircle color="#FF0000" />);
    const circleElement = screen.getByLabelText("colored circle");
    expect(circleElement).toBeInTheDocument();
  });

  test("renders the circle with the specified color", () => {
    render(<ColoredCircle color="#FF0000" />);
    const circleElement = screen.getByLabelText("colored circle");
    expect(circleElement).toHaveStyle({
      borderColor: "#FF0000",
    });
  });

  test("matches the snapshot with the specified fillPercent", () => {
    const { asFragment } = render(
      <ColoredCircle color="#FF0000" fillPercent={0.5} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
