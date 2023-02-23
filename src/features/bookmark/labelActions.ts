import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { z } from "zod";
import {
  LabelState,
  labelsState,
  labelStateSchema,
} from "@features/bookmark/label.atom";
import { HexaColor } from "@features/color/labelColor";
import { Problem } from "@features/problems/problem";

type LabelActions = {
  useAddLabel: () => (
    name: string,
    color: HexaColor,
    description?: string
  ) => void;
  useDeleteLabel: () => (id: number) => void;
  useEditLabel: () => (
    id: number,
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

  useDeleteLabel: () => {
    const [labels, setLabels] = useRecoilState(labelsState);

    return useCallback((id: number) => {
      setLabels(labels.filter((l) => l.id !== id));
    }, []);
  },

  useEditLabel: () => {
    const setLabels = useSetRecoilState(labelsState);

    return useCallback(
      (id: number, name: string, color: HexaColor, description?: string) => {
        try {
          setLabels((oldLabels) =>
            [...oldLabels].map((label) => {
              if (label.id === id) {
                return labelStateSchema.parse({
                  id: label.id,
                  name: name,
                  description: description,
                  color: color,
                  problems: label.problems,
                });
              } else {
                return label;
              }
            })
          );
        } catch (err) {
          if (err instanceof z.ZodError) {
          }
        }
      },
      []
    );
  },
};
