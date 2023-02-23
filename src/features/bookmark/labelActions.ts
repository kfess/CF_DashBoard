import { useCallback } from "react";
import { useRecoilState } from "recoil";
import {
  LabelState,
  labelsState,
  labelStateSchema,
} from "@features/bookmark/label.atom";
import { HexaColor } from "@features/color/labelColor";

type LabelActions = {
  useAddLabel: () => (
    name: string,
    color: HexaColor,
    description?: string
  ) => void;
};

export const labelActions: LabelActions = {
  useAddLabel: () => {
    const [labels, setLabels] = useRecoilState(labelsState);
    const nextId =
      labels.length > 0 ? Math.max(...labels.map((label) => label.id)) + 1 : 0;

    return useCallback(
      (name, color, description) => {
        const newLabel: LabelState = {
          id: nextId,
          name: name,
          color: color,
          description: description,
          problems: [],
        };
        setLabels((prevState) => [
          ...prevState,
          labelStateSchema.parse(newLabel),
        ]);
      },
      [nextId]
    );
  },
};
