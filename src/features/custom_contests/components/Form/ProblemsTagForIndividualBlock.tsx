import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { TagsButton } from "@features/problems/components/TagsButton";
import { DeletableChip } from "@features/ui/component/Chip";
import { Tag } from "@features/problems/problem";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { HelpToolTip } from "@features/ui/component/HelpToolTip";

type Props = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
};

export const ProblemsTagForIndividualBlock: React.FC<Props> = ({
  control,
  errors,
}) => {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} gap={1}>
      <Box width={{ xs: "100%", sm: "50%" }}>
        <TagSection
          label="Include tags"
          name="individualProblemAddFilter.includeTags"
          control={control}
          hintText="When you select tags, suggested problems are related to the topic."
          errors={errors}
        />
      </Box>
      <Box width={{ xs: "100%", sm: "50%" }}>
        <TagSection
          label="Exclude tags"
          name="individualProblemAddFilter.excludeTags"
          control={control}
          hintText="When you select tags, problems related to the tags will be excluded."
          errors={errors}
        />
      </Box>
    </Stack>
  );
};

type TagSectionProps = {
  label: string;
  name: `individualProblemAddFilter.${"includeTags" | "excludeTags"}`;
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
          <Box mb={1.5}>
            <Box my={0.5} fontWeight="bold">
              <Box
                component="label"
                display="block"
                htmlFor="problems-tags-input"
                fontWeight="bold"
                mb={0.5}
              >
                {label} <HelpToolTip title={hintText} />
              </Box>
            </Box>
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
          </Box>
          <Stack direction="row" sx={{ flexWrap: "wrap" }} gap={1}>
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
              name === "individualProblemAddFilter.includeTags"
                ? errors?.problemsFilter?.includeTags?.message
                : errors?.problemsFilter?.excludeTags?.message
            }
          />
        </>
      )}
    />
  );
};
