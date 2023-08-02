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
import type { ContestLabel } from "@features/bookmark/contestLabel";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import { LabelItem } from "@features/bookmark/components/contest/LabelItem";
import { useIndexedDBForContestLabel } from "@features/bookmark/hooks/useIndexedDBForContestLabel";
import { NoDataMessage } from "@features/ui/component/NoDataBlock";

const sortOrders = [
  "Alphabetically",
  "Reverse Alphabetically",
  "Most Problems",
  "Fewest Problems",
] as const;

type SortOrder = typeof sortOrders[number];

const sortLabels = (labels: ContestLabel[], order: SortOrder) => {
  return [...labels].sort((a, b) => {
    switch (order) {
      case "Alphabetically":
        return a.name.localeCompare(b.name);
      case "Reverse Alphabetically":
        return b.name.localeCompare(a.name);
      case "Most Problems":
        return b.contests.length - a.contests.length;
      case "Fewest Problems":
        return a.contests.length - b.contests.length;
    }
  });
};

export const LabelsTable: React.FC = () => {
  const { labelsAndContests } = useIndexedDBForContestLabel();
  const [order, setOrder] = useState<SortOrder>("Alphabetically");

  const noDataTitle = "Welcome to Contest Labels!";
  const noDataMessage = `
    Contest Labels are used to manage and classify contests.
    As labels are created, they’ll appear here in a searchable
    and filterable list. To get started, you should create a contest label.
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
              {labelsAndContests && (
                <TableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {`${labelsAndContests.length} ${
                      labelsAndContests.length > 1 ? "Labels" : "Label"
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
                  Contests
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
            {labelsAndContests && labelsAndContests.length > 0 ? (
              sortLabels(labelsAndContests, order).map((label) => (
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
