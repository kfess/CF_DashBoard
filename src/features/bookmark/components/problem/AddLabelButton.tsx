import React, { useState, useEffect, useCallback } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/system/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { ColoredCircle } from "@features/color/components/ColoredCircle";
import { useIndexedDBForProblemLabel } from "@features/bookmark/hooks/useIndexedDBForProblemLabel";
import { _Button } from "@features/ui/component/Button";
import type { ProblemLabel } from "@features/bookmark/problemLabel";
import { IconButton } from "@features/ui/component/IconButton";

type LabelRowProps = {
  readonly label: ProblemLabel;
  readonly isAdded: boolean;
  readonly handleRemove: (labelId: number) => void;
  readonly handleAdd: (labelId: number) => void;
};

const LabelRow: React.FC<LabelRowProps> = React.memo(
  ({ label, isAdded, handleRemove, handleAdd }) => (
    <Box key={label.name} sx={{ p: 1 }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <ColoredCircle color={label.color} />
        {label.name}
      </Stack>
      <Stack direction="row" alignItems="center" px={1} py={0.75} spacing={2}>
        <Typography
          variant="body2"
          color={label.description ? "initial" : "text.secondary"}
          sx={{ flex: 1, ml: 1, mr: 1, maxWidth: 300 }}
        >
          {label.description || "No description provided"}
        </Typography>
        <_Button
          color={isAdded ? "#E55B66" : ""}
          size="small"
          onClick={() => {
            if (isAdded) {
              handleRemove(label.id as number);
            } else {
              handleAdd(label.id as number);
            }
          }}
        >
          {isAdded ? "Delete" : "Add"}
        </_Button>
      </Stack>
      <Divider />
    </Box>
  )
);

type Props = {
  readonly contestId: number;
  readonly contestName: string;
  readonly index: string;
  readonly name: string;
  readonly rating?: number;
};

export const AddLabelButton: React.FC<Props> = ({
  contestId,
  contestName,
  index,
  name,
  rating,
}) => {
  const {
    allLabels,
    addProblemToLabel,
    deleteProblemFromLabel,
    isProblemAddedToLabel,
  } = useIndexedDBForProblemLabel();

  const [isAdded, setIsAdded] = useState<Record<number, boolean>>(
    {} as Record<number, boolean>
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!open) return;

    const fetch = async () => {
      const checks = await Promise.all(
        (allLabels ?? []).map(async (label) => {
          const isAdded = await isProblemAddedToLabel(label.id as number, {
            contestId,
            index,
          });
          return { id: label.id, isAdded };
        })
      );
      setIsAdded(
        checks.reduce(
          (acc, { id, isAdded }) => ({ ...acc, [id as number]: isAdded }),
          {}
        )
      );
    };
    fetch();
  }, [open]);

  const handleAdd = useCallback(async (labelId: number) => {
    await addProblemToLabel(labelId, {
      contestId,
      contestName,
      index,
      name,
      rating,
    });
    setIsAdded((prev) => ({ ...prev, [labelId]: true }));
  }, []);

  const handleRemove = useCallback(async (labelId: number) => {
    await deleteProblemFromLabel(labelId, { contestId, index });
    setIsAdded((prev) => ({ ...prev, [labelId]: false }));
  }, []);

  return (
    <Box>
      <IconButton
        icon={<StarIcon sx={{ fontSize: "1.0rem" }} />}
        id="label-button"
        onClick={handleClick}
        disableRipple
        sx={{
          padding: "0.2rem",
          color: open ? "#FFB700" : "#93A1B0",
          backgroundColor: "#EFEFEF",
        }}
      />
      {open && (
        <Popover
          id="label-popover"
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography variant="body2" p={1.5}>
            Add or Remove problem
          </Typography>
          <Divider />
          {(allLabels ?? []).map((label) => (
            <LabelRow
              key={label.id}
              label={label}
              isAdded={isAdded[label.id as number]}
              handleRemove={handleRemove}
              handleAdd={handleAdd}
            />
          ))}
          <Typography variant="body2" p={1} textAlign="center">
            <Link to="/labels">
              <Typography sx={{ color: (theme) => theme.palette.primary.main }}>
                view all labels
              </Typography>
            </Link>
          </Typography>
        </Popover>
      )}
    </Box>
  );
};
