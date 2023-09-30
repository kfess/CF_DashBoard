import React from "react";
import { render, fireEvent } from "@testing-library/react";
import dayjs from "dayjs";
import { TimeZone } from "../TimeZone";

describe("TimeZone Component", () => {
  it("sould renders correctly", () => {
    const { getByLabelText } = render(<TimeZone />);
    expect("Time Zone").toBeInTheDocument();
  });
});
