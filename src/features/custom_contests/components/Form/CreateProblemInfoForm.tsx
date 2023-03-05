import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import { Tag } from "@features/problems/problem";
import { useToggle } from "@hooks/index";
import { Input } from "@features/ui/component/Input";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import { TagsButton } from "@features/problems/components/TagsButton";
import { DeletableChip } from "@features/ui/component/Chip";

export const CreateProblemInfoForm: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [difficultyFrom, setDifficultyFrom] = useState(0);
  const [difficultyTo, setDifficultyTo] = useState(5000);
  const [includeTags, setIncludeTags] = useState<Tag[]>([]);

  const removeIncludeTag = (tag: Tag) => {
    setIncludeTags([...includeTags.filter((includeTag) => includeTag !== tag)]);
  };
  const addOrRemoveIncludeTag = (tag: Tag) => {
    includeTags.includes(tag)
      ? setIncludeTags([
          ...includeTags.filter((includeTag) => includeTag !== tag),
        ])
      : setIncludeTags([...includeTags, tag]);
  };
  const removeAllIncludeTags = () => {
    setIncludeTags([]);
  };

  const [excludeTags, setExcludeTags] = useState<Tag[]>([]);

  const removeExcludeTag = (tag: Tag) => {
    setExcludeTags([...excludeTags.filter((excludeTag) => excludeTag !== tag)]);
  };
  const addOrRemoveExcludeTag = (tag: Tag) => {
    includeTags.includes(tag)
      ? setExcludeTags([
          ...excludeTags.filter((excludeTag) => excludeTag !== tag),
        ])
      : setExcludeTags([...excludeTags, tag]);
  };
  const removeAllExcludeTags = () => {
    setExcludeTags([]);
  };

  const [randomize, toggleRandomize] = useToggle(false);
  const [excludeSolved, toggleExcludeSolved] = useToggle(false);

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
      <FormControlLabel
        control={<Checkbox size="small" onChange={toggleRandomize} />}
        label="Randomize the order of problems"
      />
      <div css={{ fontSize: 14 }}>
        When you check this button, the order of the problems will be randomized
        regardless of the difficulty. Othewise, problems are arranged in
        ascending order of difficulty.
      </div>
      <FormControlLabel
        control={<Checkbox size="small" onChange={toggleExcludeSolved} />}
        label="Don't suggest problems solved by expected participants"
      />
    </>
  );
};
