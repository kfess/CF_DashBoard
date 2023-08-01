import React from "react";
import { useNavigate } from "react-router-dom";
import StarBorderOutlined from "@mui/icons-material/StarBorderOutlined";
import { Chip_ } from "@features/ui/component/Chip";
import { useIndexedDBForContestLabel } from "@features/bookmark/hooks/useIndexedDBForContestLabel";

export const LabelsChip: React.FC = () => {
  const navigate = useNavigate();
  const { labelsCount } = useIndexedDBForContestLabel();

  return (
    <Chip_
      label={<div>{labelsCount || 0} Labels</div>}
      onClick={() => {
        navigate("/labels");
      }}
      icon={<StarBorderOutlined fontSize="small" />}
    />
  );
};
