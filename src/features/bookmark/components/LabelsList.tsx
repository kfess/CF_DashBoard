import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { labelsState } from "@features/bookmark/label.atom";
import type { LabelState } from "@features/bookmark/label.atom";
import { LabelNameChip } from "@features/bookmark/components/LabelIcon";
import { LabelEditor } from "@features/bookmark/components/LabelEditer";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import { ButtonWithAlertDialog } from "@features/ui/component/AlertDialog";
import { HexaColor } from "@features/color/labelColor";

type Props = {
  label: LabelState;
};

const LabelItem: React.FC<Props> = (props: Props) => {
  const { label } = props;

  const navigate = useNavigate();
  const [labels, setLabels] = useRecoilState(labelsState);

  const [name, setName] = useState({
    value: label.name,
    errorMsg: "",
  });

  const [description, setDescription] = useState({
    value: label.description,
    errorMsg: "",
  });

  const [color, setColor] = useState(label.color);

  const [defaultName, defaultDescription, defaultColor] = [
    label.name,
    label.description,
    label.color,
  ];

  const [showBlock, setShowBlock] = useState<boolean>(false);
  const toggleShowBlock = () => setShowBlock(!showBlock);

  const deleteLabel = (id: number) => {
    setLabels(labels.filter((l) => l.id !== id));
  };

  return (
    <>
      {!showBlock ? (
        <Box sx={{ p: 1, display: "flex" }}>
          <Box sx={{ width: "25%", textAlign: "left" }}>
            <LabelNameChip name={name.value} color={label.color} mode="View" />
          </Box>
          <Box sx={{ width: "40%", textAlign: "left" }}>
            {label.description}
          </Box>
          <Box
            sx={{
              width: "10%",
              textAlign: "left",
            }}
          >
            <Button
              onClick={() => {
                navigate(`/bookmark/labels/${label.name}`);
              }}
            >
              <CreateOutlinedIcon />
              {label.problems.length}
            </Button>
          </Box>
          <Box sx={{ width: "25%" }}>
            <Button variant="text" onClick={toggleShowBlock}>
              Edit
            </Button>
            <ButtonWithAlertDialog
              title="Delete"
              dialogText="Are you sure? Deleting a label will remove it from relevant problems."
              dialogTitle="Confirmation"
              deleteTarget={label.id}
              deleteFn={deleteLabel}
            />
          </Box>
        </Box>
      ) : (
        <Box sx={{ p: 1 }}>
          <LabelNameChip name={name.value} color={color} mode="View" />
          <LabelEditor
            id={label.id}
            name={name}
            setName={setName}
            defaultName={defaultName}
            description={description}
            setDescription={setDescription}
            defaultDescription={defaultDescription}
            color={color as HexaColor}
            setColor={setColor}
            defaultColor={defaultColor as HexaColor}
            toggleShowBlock={toggleShowBlock}
          />
        </Box>
      )}
    </>
  );
};

const sortOrders = [
  "Alphabetically",
  "Reverse Alphabetically",
  "Most Problems",
  "Fewest Problems",
] as const;
type SortOrder = typeof sortOrders[number];

const sortLabels = (labels: LabelState[], order: SortOrder) => {
  return [...labels].sort((a, b) => {
    switch (order) {
      case "Alphabetically":
        return a.name.localeCompare(b.name);
      case "Reverse Alphabetically":
        return b.name.localeCompare(a.name);
      case "Most Problems":
        return b.problems.length - a.problems.length;
      case "Fewest Problems":
        return a.problems.length - b.problems.length;
    }
  });
};

export const LabelItems: React.FC = () => {
  const labels = useRecoilValue(labelsState);
  const [order, setOrder] = useState<SortOrder>("Alphabetically");

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          p: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>{labels.length} labels</Box>
        <Box>
          <DropDownMenuButton
            title="sort"
            items={sortOrders}
            selectedItem={order}
            setSelectedItem={setOrder}
          />
        </Box>
      </Box>
      {sortLabels(labels, order).map((label) => (
        <LabelItem key={label.name} label={label} />
      ))}
    </Box>
  );
};
