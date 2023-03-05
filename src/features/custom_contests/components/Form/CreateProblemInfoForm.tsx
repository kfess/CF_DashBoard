import React, { useState, Dispatch, SetStateAction } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Problem, Tag } from "@features/problems/problem";
import { useToggle } from "@hooks/index";
import { Input } from "@features/ui/component/Input";
import { TagsButton } from "@features/problems/components/TagsButton";
import { DeletableChip } from "@features/ui/component/Chip";
import { Checkbox } from "@features/ui/component/Checkbox";
import { useFetchProblems } from "@features/problems/useFetchProblem";
import { useTags } from "@features/problems/useTags";
import { SelectedProblemsTable } from "./SelectedProblemsTable";

type Props = {
  selectedProblems: Problem[];
  setSelectedProblems: Dispatch<SetStateAction<Problem[]>>;
};

export const CreateProblemInfoForm: React.FC<Props> = (props: Props) => {
  const { selectedProblems, setSelectedProblems } = props;
  const { data } = useFetchProblems();

  const [count, setCount] = useState<number>(0);
  const [difficultyFrom, setDifficultyFrom] = useState(0);
  const [difficultyTo, setDifficultyTo] = useState(5000);

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

  const [randomize, toggleRandomize] = useToggle(false);
  const [excludeSolved, toggleExcludeSolved] = useToggle(false);

  const selectProblems = (problems: Problem[]) => {
    const filteredProblems = problems
      .filter(
        (problem) =>
          (problem.rating ?? 0) >= difficultyFrom &&
          (problem.rating ?? 0) <= difficultyTo &&
          includeTags.every((includeTag) =>
            (problem.tags as Tag[]).includes(includeTag)
          ) &&
          excludeTags.every(
            (excludeTag) => !(problem.tags as Tag[]).includes(excludeTag)
          )
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, count);

    return randomize
      ? filteredProblems
      : filteredProblems.sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0));
  };

  return (
    <>
      <h3>Problems Form</h3>
      <FormControl variant="standard">
        <InputLabel shrink>Number of Problems</InputLabel>
        <Input
          placeholder="6"
          type="number"
          defaultValue={0}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val = Number(e.target.value);
            if (Number.isInteger(val) && val >= 0) {
              setCount(val);
            }
          }}
        />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel shrink>Difficulty From</InputLabel>
        <Input
          placeholder="1100"
          type="number"
          defaultValue={0}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val = Number(e.target.value);
            if (Number.isInteger(val) && val >= 0) {
              setDifficultyFrom(val);
            }
          }}
        />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel shrink>Difficulty To</InputLabel>
        <Input
          placeholder="1900"
          type="number"
          defaultValue={5000}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val = Number(e.target.value);
            if (Number.isInteger(val) && val >= 0) {
              setDifficultyTo(val);
            }
          }}
        />
      </FormControl>
      <div>
        Include tags
        <TagsButton
          selectedTags={includeTags}
          addOrRemoveTag={addOrRemoveIncludeTag}
          removeAllTags={removeAllIncludeTags}
        />
      </div>
      <div css={{ fontSize: 14 }}>
        When you select tags, suggested problems are related to the topic.
      </div>
      <Stack direction="row" sx={{ flexWrap: "wrap" }}>
        {includeTags.length > 0 &&
          includeTags.map((includeTag) => (
            <DeletableChip
              label={includeTag}
              key={includeTag}
              onDelete={() => removeIncludeTag(includeTag)}
            />
          ))}
      </Stack>
      <div>
        Exclude tags
        <TagsButton
          selectedTags={excludeTags}
          addOrRemoveTag={addOrRemoveExcludeTag}
          removeAllTags={removeAllExcludeTags}
        />
      </div>
      <div css={{ fontSize: 14 }}>
        When you select tags, problems related to the tags will be excluded
      </div>
      <Stack direction="row" sx={{ flexWrap: "wrap" }}>
        {excludeTags.length > 0 &&
          excludeTags.map((excludeTag) => (
            <DeletableChip
              label={excludeTag}
              key={excludeTag}
              onDelete={() => removeExcludeTag(excludeTag)}
            />
          ))}
      </Stack>
      <Checkbox
        label="Randomize the order of problems"
        toggle={toggleRandomize}
        description={
          <>
            <div>
              When you check this, the order of the problems will be randomized
              regardless of the difficulty.
            </div>
            <div>
              Othewise, problems are arranged in ascending order of difficulty.
            </div>
          </>
        }
      />
      <Checkbox
        label="Don't suggest problems solved by expected participants"
        toggle={toggleExcludeSolved}
        description="When you check this, "
      />
      <div css={{ textAlign: "right" }}>
        <Button
          onClick={() => {
            data && setSelectedProblems(selectProblems(data));
          }}
          variant="contained"
          color="success"
          css={{ textTransform: "none" }}
        >
          Generate Problems
        </Button>
        <SelectedProblemsTable
          selectedProblems={selectedProblems}
          setSelectedProblems={setSelectedProblems}
        />
      </div>
    </>
  );
};
