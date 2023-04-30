import React from "react";
import { FormControl } from "@features/ui/component/FormControl";
import { Input } from "@features/ui/component/Input";

type Props = {
  count: number;
  setCount: (val: number) => void;
};

export const ProblemsCount: React.FC<Props> = ({ count, setCount }) => {
  return (
    <FormControl>
      <label
        htmlFor="problems-number-input"
        css={{ fontWeight: "bold", paddingBottom: "0.3rem" }}
      >
        Number of Problems
      </label>
      <Input
        id="problems-number-input"
        type="number"
        value={count}
        defaultValue={count}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const val = e.target.value === "" ? 0 : e.target.valueAsNumber;
          setCount(val);
        }}
      />
    </FormControl>
  );
};
