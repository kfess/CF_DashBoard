import React, { useState, useCallback } from "react";
import { Control, Controller, FieldErrors, useWatch } from "react-hook-form";
import { Button } from "@features/ui/component/Button";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { useFetchProblems } from "@features/problems/hooks/useFetchProblem";
import { useTags } from "@features/problems/hooks/useTags";
import { useToggle } from "@hooks/index";
import { Problem, Tag } from "@features/problems/problem";
import { SelectedProblemsTable } from "./SelectedProblemsTable";
import { ProblemsCount } from "@features/custom_contests/components/Form/ProblemsCount";
import { ProblemsDifficulty } from "@features/custom_contests/components/Form/ProblemsDifficulty";
import { ProblemsTag } from "@features/custom_contests/components/Form/ProblemsTag";
import { ExpectedParticipants } from "@features/custom_contests/components/Form/ExpectedParticipants";

type Props = {
  control: Control<CreateCustomContest>;
  setValue: (name: keyof CreateCustomContest, value: any) => void;
  errors: FieldErrors<CreateCustomContest>;
};

export const SelectProblems: React.FC<Props> = ({
  control,
  setValue,
  errors,
}) => {
  const { data } = useFetchProblems();

  const count = useWatch({ control, name: "problemsFilter.count" });
  const difficultyFrom = useWatch({
    control,
    name: "problemsFilter.difficultyFrom",
  });
  const difficultyTo = useWatch({
    control,
    name: "problemsFilter.difficultyTo",
  });

  const {
    selectedTags: includeTags,
    removeTag: removeIncludeTag,
    removeAllTags: removeAllIncludeTags,
    addOrRemoveTag: addOrRemoveIncludeTag,
  } = useTags();

  const {
    selectedTags: excludeTags,
    removeTag: removeExcludeTag,
    removeAllTags: removeAllExcludeTags,
    addOrRemoveTag: addOrRemoveExcludeTag,
  } = useTags();

  const [excludeSolved, toggleExcludeSolved] = useToggle(false, true);

  const selectProblems = useCallback(
    (problems: Problem[]) => {
      return problems
        .filter(
          (problem) =>
            (problem.rating ?? 0) >= (difficultyFrom ?? 0) &&
            (problem.rating ?? 0) <= (difficultyTo ?? 0) &&
            includeTags.every((includeTag) =>
              (problem.tags as Tag[]).includes(includeTag)
            ) &&
            excludeTags.every(
              (excludeTag) => !(problem.tags as Tag[]).includes(excludeTag)
            )
        )
        .sort(() => Math.random() - 0.5)
        .slice(0, count ?? 0)
        .sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0));
    },
    [difficultyFrom, difficultyTo, includeTags, excludeTags, count]
  );

  return (
    <>
      <h3>Problems Form</h3>
      <ProblemsCount control={control} errors={errors} />
      <ProblemsDifficulty control={control} errors={errors} />

      <ProblemsTag
        includeTags={includeTags}
        removeIncludeTag={removeIncludeTag}
        removeAllIncludeTags={removeAllIncludeTags}
        addOrRemoveIncludeTag={addOrRemoveIncludeTag}
        excludeTags={excludeTags}
        removeExcludeTag={removeExcludeTag}
        removeAllExcludeTags={removeAllExcludeTags}
        addOrRemoveExcludeTag={addOrRemoveExcludeTag}
      />
      <ExpectedParticipants
        control={control}
        errors={errors}
        excludeSolved={excludeSolved}
        toggleExcludeSolved={toggleExcludeSolved}
      />
      <Button
        onClick={() => {
          data && setValue("problems", selectProblems(data));
        }}
        disabled={!data}
      >
        Generate Problems
      </Button>

      <Controller
        name="problems"
        control={control}
        render={({ field }) => (
          <SelectedProblemsTable
            selectedProblems={field.value}
            setSelectedProblems={field.onChange}
          />
        )}
      />
    </>
  );
};
