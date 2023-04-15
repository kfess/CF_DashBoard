import React, { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { labelSelectors } from "@features/bookmark/labelActions";
import type { LabelState } from "@features/bookmark/label.atom";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import { LabelItem } from "@features/bookmark/components/LabelsList";

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

export const LabelsTable: React.FC = () => {
  const labels = labelSelectors.useLabels();
  const [order, setOrder] = useState<SortOrder>("Alphabetically");

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>{labels.length} labels</Box>
        <Box>
          <DropDownMenuButton
            title="sort"
            items={sortOrders.map((so) => {
              return { item: so };
            })}
            selectedItem={order}
            setSelectedItem={setOrder}
          />
        </Box>
      </Box>
      <Divider />
      {sortLabels(labels, order).map((label) => (
        <div key={label.name}>
          <LabelItem label={label} />
          <Divider />
        </div>
      ))}
    </Box>
  );
};
