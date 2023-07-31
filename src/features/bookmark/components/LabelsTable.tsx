import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import type { ProblemLabel } from "@features/bookmark/problemLabel";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import { LabelItem } from "@features/bookmark/components/LabelItem";
import { useIndexedDBForProblemLabel } from "../hooks/useProblemLabels";

const sortOrders = [
  "Alphabetically",
  "Reverse Alphabetically",
  "Most Problems",
  "Fewest Problems",
] as const;

type SortOrder = typeof sortOrders[number];

const sortLabels = (labels: ProblemLabel[], order: SortOrder) => {
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
  const { labelsAndProblems } = useIndexedDBForProblemLabel();
  const [order, setOrder] = useState<SortOrder>("Alphabetically");

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          paddingBottom: 1,
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {labelsAndProblems && (
                <TableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {`${labelsAndProblems.length} ${
                      labelsAndProblems.length > 1 ? "Labels" : "Label"
                    }`}
                  </Typography>
                </TableCell>
              )}
              <TableCell>
                <Typography variant="body2" fontWeight="bold">
                  Description
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight="bold">
                  Problems
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight="bold">
                  Actions{" "}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {labelsAndProblems &&
              sortLabels(labelsAndProblems, order).map((label) => (
                <LabelItem key={label.name} label={label} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
