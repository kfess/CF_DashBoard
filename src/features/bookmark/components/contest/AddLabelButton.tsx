import React, { useState, useEffect, useCallback } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/system/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { ColoredCircle } from "@features/color/components/ColoredCircle";
import { useIndexedDBForContestLabel } from "@features/bookmark/hooks/useIndexedDBForContestLabel";
import { _Button } from "@features/ui/component/Button";
import { Classification } from "@features/contests/contest";
import type { ContestLabel } from "@features/bookmark/contestLabel";

type LabelRowProps = {
  readonly label: ContestLabel;
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
  contestId: number;
  contestName: string;
  classification: Classification;
};

export const AddLabelButton: React.FC<Props> = ({
  contestId,
  contestName,
  classification,
}) => {
  const {
    allLabels,
    addContestToLabel,
    deleteContestFromLabel,
    isContestAddedToLabel,
  } = useIndexedDBForContestLabel();

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
          const isAdded = await isContestAddedToLabel(
            label.id as number,
            contestId
          );
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
    await addContestToLabel(labelId, {
      contestId,
      contestName,
      classification,
    });
    setIsAdded((prev) => ({ ...prev, [labelId]: true }));
  }, []);

  const handleRemove = useCallback(async (labelId: number) => {
    await deleteContestFromLabel(labelId, { contestId });
    setIsAdded((prev) => ({ ...prev, [labelId]: false }));
  }, []);

  return (
    <Box>
      <IconButton
        id="label-button"
        onClick={handleClick}
        disableRipple
        sx={{
          padding: "0.2rem",
          color: open ? "#FFB700" : "#93A1B0",
          backgroundColor: "#EFEFEF",
        }}
      >
        <StarIcon sx={{ fontSize: "1rem" }} />
      </IconButton>
      {open && (
        <Popover
          id="label-button"
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography variant="body2" sx={{ p: 1.5, color: "#9246FF" }}>
            Add or Remove contest
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
          <Typography variant="body2" sx={{ p: 1, textAlign: "center" }}>
            <Link to="/labels">view all labels</Link>
          </Typography>
        </Popover>
      )}
    </Box>
  );
};
