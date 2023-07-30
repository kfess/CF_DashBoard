import React from "react";
import { useNavigate } from "react-router-dom";
import StarBorderOutlined from "@mui/icons-material/StarBorderOutlined";
import { Chip_ } from "@features/ui/component/Chip";
import { useLabelsCount } from "../hooks/useProblemLabels";

export const LabelsChip: React.FC = () => {
  const navigate = useNavigate();
  const count = useLabelsCount();

  return (
    <Chip_
      label={<div>{count || 0} Labels</div>}
      onClick={() => {
        navigate("/labels");
      }}
      icon={<StarBorderOutlined fontSize="small" />}
    />
  );
};
