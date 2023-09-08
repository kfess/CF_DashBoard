import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { TagsButton } from "@features/problems/components/TagsButton";
import { DeletableChip } from "@features/ui/component/Chip";
import { Tag } from "@features/problems/problem";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { CreateCustomContest } from "@features/custom_contests/customContest";

type Props = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
};

type TagSectionProps = {
  label: string;
  name: `problemsFilter.${"includeTags" | "excludeTags"}`;
  control: Control<CreateCustomContest>;
  hintText: string;
  errors?: FieldErrors<CreateCustomContest>;
};

const TagSection: React.FC<TagSectionProps> = ({
  label,
  name,
  control,
  hintText,
  errors,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <div css={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
            <span css={{ fontWeight: "bold", marginRight: "1rem" }}>
              {label}
            </span>
            <TagsButton
              selectedTags={field.value}
              onSelectTag={(tag: Tag) => {
                const updatedTags = field.value.includes(tag)
                  ? field.value.filter((t: Tag) => t !== tag)
                  : [...field.value, tag];
                field.onChange(updatedTags);
              }}
              removeAllTags={() => field.onChange([])}
            />
            <div css={{ fontSize: 14, color: "gray", marginLeft: "20px" }}>
              {hintText}
            </div>
          </div>
          <Stack direction="row" sx={{ flexWrap: "wrap" }} spacing={1}>
            {field.value.length > 0 &&
              field.value.map((tag: Tag) => (
                <DeletableChip
                  label={tag}
                  key={tag}
                  onDelete={() =>
                    field.onChange(field.value.filter((t: Tag) => t !== tag))
                  }
                />
              ))}
          </Stack>
          <ErrorMessage
            message={
              name === "problemsFilter.includeTags"
                ? errors?.problemsFilter?.includeTags?.message
                : errors?.problemsFilter?.excludeTags?.message
            }
          />
        </>
      )}
    />
  );
};

export const ProblemsTag: React.FC<Props> = ({ control, errors }) => {
  return (
    <>
      <TagSection
        label="Include tags"
        name="problemsFilter.includeTags"
        control={control}
        hintText="When you select tags, suggested problems are related to the topic."
        errors={errors}
      />
      <TagSection
        label="Exclude tags"
        name="problemsFilter.excludeTags"
        control={control}
        hintText="When you select tags, problems related to the tags will be excluded."
        errors={errors}
      />
    </>
  );
};
