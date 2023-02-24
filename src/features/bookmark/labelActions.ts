import { useCallback } from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { z } from "zod";
import {
  LabelState,
  labelsState,
  labelStateSchema,
  labelsSelector,
  labelSelector,
} from "@features/bookmark/label.atom";
import { HexaColor } from "@features/color/labelColor";

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

  useAddProblem: () => (
    id: number,
    contestId: number,
    contestName: string,
    index: string,
    name: string
  ) => void;

  useDeleteProblem: () => (
    labelName: string,
    contestId: number,
    index: string,
    name: string
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

  useAddProblem: () => {
    const setLabels = useSetRecoilState(labelsState);

    return useCallback(
      (
        id: number,
        contestId: number,
        contestName: string,
        index: string,
        name: string
      ) => {
        try {
          const newProblem = { contestId, contestName, index, name };
          setLabels((oldLabels) =>
            oldLabels.map((label) => {
              if (label.id === id) {
                // this is ugly, Map is better
                const alreadyAdded =
                  label.problems.filter(
                    (p) =>
                      p.contestId === contestId &&
                      p.contestName === contestName &&
                      p.index === index &&
                      p.name === name
                  ).length > 0;

                return labelStateSchema.parse({
                  ...label,
                  problems: alreadyAdded
                    ? [...label.problems]
                    : [...label.problems, newProblem],
                });
              } else {
                return label;
              }
            })
          );
        } catch (err) {
          if (err instanceof z.ZodError) {
            console.log(err);
          }
        }
      },
      []
    );
  },

  useDeleteProblem: () => {
    const setLabels = useSetRecoilState(labelsState);

    return useCallback(
      (labelName: string, contestId: number, index: string, name: string) => {
        setLabels((oldLabels) => [
          ...oldLabels.map((label) => {
            if (label.name === labelName) {
              return labelStateSchema.parse({
                ...label,
                problems: label.problems.filter(
                  (p) =>
                    p.contestId !== contestId ||
                    p.index !== index ||
                    p.name !== name
                ),
              });
            } else {
              return label;
            }
          }),
        ]);
      },
      []
    );
  },
};

type LabelSelectors = {
  useLabels: () => LabelState[];
  useLabel: (name: string) => LabelState | undefined;
};

export const labelSelectors: LabelSelectors = {
  useLabels: () => useRecoilValue(labelsSelector),
  useLabel: (name: string) => useRecoilValue(labelSelector(name)),
};
