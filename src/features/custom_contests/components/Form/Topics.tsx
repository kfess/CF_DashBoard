import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CheckIcon from "@mui/icons-material/Check";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Control, Controller, FieldErrors, useWatch } from "react-hook-form";
import { Button } from "@features/ui/component/Button";
import { Chip } from "@features/ui/component/Chip";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { relatedTopics } from "@features/custom_contests/relatedTopics";
import type { RelatedTopics } from "@features/custom_contests/relatedTopics";
import { HelpToolTip } from "@features/ui/component/HelpToolTip";

type Props = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
};

export const Topics: React.FC<Props> = ({ control, errors }) => {
  const watchedRelatedTopics = useWatch({
    control,
    name: "relatedTopics",
  });

  return (
    <>
      <Controller
        name="relatedTopics"
        control={control}
        render={({ field }) => (
          <>
            <Box width="50%">
              <Box
                component="label"
                display="block"
                htmlFor="related-topics-input"
                fontWeight="bold"
                mb={1}
              >
                Topics <HelpToolTip title="Select Topics" />
              </Box>
              <MultiSelectButton
                options={[...relatedTopics]}
                selectedOptions={field.value}
                selectOption={(option) => {
                  field.onChange([...field.value, option]);
                }}
                removeOption={(option) => {
                  field.onChange(field.value.filter((v) => v !== option));
                }}
              />
              {errors.relatedTopics && (
                <ErrorMessage message={errors.relatedTopics.message} />
              )}
            </Box>
            <Stack direction="row" gap={1}>
              {watchedRelatedTopics.length > 0 &&
                watchedRelatedTopics.map((topic) => (
                  <Chip
                    key={topic}
                    label={topic}
                    onDelete={() => {
                      field.onChange(field.value.filter((v) => v !== topic));
                    }}
                  />
                ))}
            </Stack>
          </>
        )}
      />
    </>
  );
};

const ITEM_HEIGHT = 48;

type MultiSelectButtonProps = {
  readonly options: RelatedTopics[];
  selectedOptions: RelatedTopics[];
  selectOption: (option: RelatedTopics) => void;
  removeOption: (option: RelatedTopics) => void;
};
export const MultiSelectButton: React.FC<MultiSelectButtonProps> = ({
  options,
  selectedOptions,
  selectOption,
  removeOption,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        endIcon={open ? <ArrowDropDownIcon /> : <ArrowLeftIcon />}
        color="secondary"
      >
        Topics{" "}
        {selectedOptions.length > 0 && (
          <Chip label={`${selectedOptions.length}`} />
        )}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 5 } }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => {
              setAnchorEl(null);
              if (selectedOptions.includes(option)) {
                removeOption(option);
              } else {
                selectOption(option);
              }
            }}
            dense
          >
            {selectedOptions.includes(option) ? (
              <CheckIcon fontSize="small" sx={{ pr: 1 }} />
            ) : (
              <SvgIcon fontSize="small" sx={{ pr: 1 }} />
            )}
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
