import { renderHook, act } from "@testing-library/react";
import { useToggle } from "@hooks/useToggle";

describe("useToggle", () => {
  it("should toggle between initial and alternative values", () => {
    const initialValue = "initial value";
    const alternativeValue = "alternative value";

    const { result } = renderHook(() =>
      useToggle(initialValue, alternativeValue)
    );
    const [state, toggle] = result.current;

    expect(state).toEqual(initialValue);

    act(() => {
      toggle();
    });

    expect(result.current[0]).toEqual(alternativeValue);

    act(() => {
      toggle();
    });

    expect(result.current[0]).toEqual(initialValue);
  });
});
