import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { TimeZone } from "../TimeZone";

jest.mock("dayjs", () => {
  const originalDayjs = jest.requireActual("dayjs");
  originalDayjs.tz = {
    ...originalDayjs.tz,
    guess: jest.fn(() => "Asia/Tokyo"), // 任意のタイムゾーンを返すように設定
  };
  return originalDayjs;
});

describe("TimeZone Component", () => {
  it("should renders correctly", () => {
    const { getByLabelText } = render(<TimeZone />);
    expect("Time Zone").toBeInTheDocument();
  });
});
