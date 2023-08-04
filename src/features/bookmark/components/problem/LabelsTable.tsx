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
  Stack,
} from "@mui/material";
import type { ProblemLabel } from "@features/bookmark/problemLabel";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import { LabelItem } from "@features/bookmark/components/problem/LabelItem";
import { useIndexedDBForProblemLabel } from "@features/bookmark/hooks/useIndexedDBForProblemLabel";
import { NoDataMessage } from "@features/ui/component/NoDataBlock";
import { HelpToolTip } from "@features/ui/component/HelpToolTip";

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

  const noDataTitle = "Welcome to Problem Labels!";
  const noDataMessage = `
    Problem Labels are used to manage and classify problems.
    As labels are created, they’ll appear here in a searchable
    and filterable list. To get started, you should create a problem label.
  `;

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
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2" fontWeight="bold" noWrap={true}>
                      {`${labelsAndProblems.length} ${
                        labelsAndProblems.length > 1 ? "Labels" : "Label"
                      }`}
                    </Typography>
                    <div>
                      <HelpToolTip title="Labels are saved in your browser. If you clear your browser's cache, your labels will be deleted. This is a requirement for saving labels without logging in." />
                    </div>
                  </Stack>
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
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {labelsAndProblems && labelsAndProblems.length > 0 ? (
              sortLabels(labelsAndProblems, order).map((label) => (
                <LabelItem key={label.name} label={label} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <NoDataMessage title={noDataTitle} message={noDataMessage} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
