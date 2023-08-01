import React, { useState, useEffect } from "react";
import Box from "@mui/system/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { ColoredCircle } from "@features/color/components/ColoredCircle";
import { useIndexedDBForContestLabel } from "@features/bookmark/hooks/useIndexedDBForContestLabel";
import { _Button } from "@features/ui/component/Button";
import { Classification } from "@features/contests/contest";

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

  const [isAddedToLabel, setIsAddedToLabel] = useState<boolean[]>([]);

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
        (allLabels ?? []).map((label) =>
          isContestAddedToLabel(label.id as number, contestId)
        )
      );
      setIsAddedToLabel(checks);
    };
    fetch();
  }, [open]);

  const handleAdd = async (labelId: number, idx: number) => {
    await addContestToLabel(labelId, {
      contestId,
      contestName,
      classification,
    });
    setIsAddedToLabel((prev) => {
      const next = [...prev];
      next[idx] = !prev[idx];
      return next;
    });
  };

  const handleRemove = async (labelId: number, idx: number) => {
    await deleteContestFromLabel(labelId, { contestId });
    setIsAddedToLabel((prev) => {
      const next = [...prev];
      next[idx] = !prev[idx];
      return next;
    });
  };

  return (
    <div>
      <Box
        sx={{
          cursor: "pointer",
          borderRadius: "50%",
          display: "inline-block",
          pt: "3px",
          pl: "4px",
          pr: "4px",
          backgroundColor: "#EFEFEF",
          color: "#93A1B0",
          "&:hover": {
            color: "#666",
          },
        }}
        id="label-button"
        onClick={handleClick}
      >
        <StarIcon fontSize="inherit" />
      </Box>
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
        <Typography variant="body2" sx={{ p: 1.5 }}>
          Add or Remove contest
        </Typography>
        <Divider />
        {allLabels &&
          allLabels.length > 0 &&
          allLabels.map((label, i) => (
            <Box key={label.name} sx={{ p: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ColoredCircle color={label.color} />
                {label.name}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ flex: 1, ml: 1, mr: 1, maxWidth: 300 }}
                >
                  {label.description || "No description provided"}
                </Typography>
                <_Button
                  color={isAddedToLabel[i] ? "#E55B66" : ""}
                  size="small"
                  onClick={() => {
                    if (isAddedToLabel[i]) {
                      handleRemove(label.id as number, i);
                    } else {
                      handleAdd(label.id as number, i);
                    }
                  }}
                >
                  {isAddedToLabel[i] ? "Delete" : "Add"}
                </_Button>
              </Box>
              <Divider />
            </Box>
          ))}
        <Typography variant="body2" sx={{ p: 1, textAlign: "center" }}>
          <Link to="/labels">view all labels</Link>
        </Typography>
      </Popover>
    </div>
  );
};
