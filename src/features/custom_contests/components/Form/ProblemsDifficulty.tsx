import React from "react";
import { FormControl } from "@features/ui/component/FormControl";
import { Input } from "@features/ui/component/Input";

type Props = {
  difficultyFrom: number;
  setDifficultyFrom: (val: number) => void;
  difficultyTo: number;
  setDifficultyTo: (val: number) => void;
};

export const ProblemsDifficulty: React.FC<Props> = ({
  difficultyFrom,
  setDifficultyFrom,
  difficultyTo,
  setDifficultyTo,
}) => {
  return (
    <>
      <FormControl>
        <label
          htmlFor="difficulty-from-input"
          css={{ fontWeight: "bold", paddingBottom: "0.3rem" }}
        >
          Difficulty From
        </label>
        <Input
          id="difficulty-from-input"
          type="number"
          defaultValue={0}
          value={difficultyFrom}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value === "" ? 0 : e.target.valueAsNumber;
            setDifficultyFrom(val);
          }}
        />
      </FormControl>
      <FormControl>
        <label
          htmlFor="difficulty-to-input"
          css={{ fontWeight: "bold", paddingBottom: "0.3rem" }}
        >
          Difficulty To
        </label>
        <Input
          id="difficulty-to-input"
          type="number"
          defaultValue={5000}
          value={difficultyTo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value === "" ? 0 : e.target.valueAsNumber;
            setDifficultyTo(val);
          }}
        />
      </FormControl>
    </>
  );
};
