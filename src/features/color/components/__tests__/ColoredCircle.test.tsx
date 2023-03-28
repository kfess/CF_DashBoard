import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ColoredCircle } from "@features/color/ColoredCircle";

describe("ColoredCircle", () => {
  test("renders the circle with the specified color", () => {
    render(<ColoredCircle color="#FF0000" />);
    const circleElement = screen.getByLabelText("colored circle");
    expect(circleElement).toHaveStyle({
      borderColor: "#FF0000",
    });
  });
});
