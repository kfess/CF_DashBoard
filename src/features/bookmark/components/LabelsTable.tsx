import React, { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { labelSelectors } from "@features/bookmark/labelActions";
import type { LabelState } from "@features/bookmark/label.atom";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import { LabelItem } from "@features/bookmark/components/LabelsList";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

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
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 2,
        }}
      >
        <DropDownMenuButton
          title="sort"
          items={sortOrders.map((so) => {
            return { item: so };
          })}
          selectedItem={order}
          setSelectedItem={setOrder}
        />
      </Box>
      <Divider />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                {labels.length} {labels.length > 1 ? "Labels" : "Label"}
              </TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Problems</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortLabels(labels, order).map((label) => (
              <LabelItem key={label.name} label={label} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
