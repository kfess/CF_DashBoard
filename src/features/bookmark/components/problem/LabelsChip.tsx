import React from "react";
import { useNavigate } from "react-router-dom";
import StarBorderOutlined from "@mui/icons-material/StarBorderOutlined";
import { Chip } from "@features/ui/component/Chip";
import { useIndexedDBForProblemLabel } from "@features/bookmark/hooks/useIndexedDBForProblemLabel";

export const LabelsChip: React.FC = () => {
  const navigate = useNavigate();
  const { labelsCount } = useIndexedDBForProblemLabel();

  return (
    <Chip
      icon={<StarBorderOutlined fontSize="small" />}
      label={<div>{labelsCount || 0} Problem Labels</div>}
      onClick={() => {
        navigate("/labels");
      }}
    />
  );
};
