import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import StarBorderOutlined from "@mui/icons-material/StarBorderOutlined";
import { labelsState } from "@features/bookmark/label.atom";
import { Chip_ } from "@features/ui/component/Chip";

export const LabelsChip: React.FC = () => {
  const labels = useRecoilValue(labelsState);
  const navigate = useNavigate();

  return (
    <Chip_
      label={<div>{labels.length} Labels</div>}
      onClick={() => {
        navigate("/labels");
      }}
      icon={<StarBorderOutlined fontSize="small" />}
    />
  );
};
