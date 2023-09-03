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
import type { ContestLabel } from "@features/bookmark/contestLabel";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import { LabelItem } from "@features/bookmark/components/contest/LabelItem";
import { useIndexedDBForContestLabel } from "@features/bookmark/hooks/useIndexedDBForContestLabel";
import { NoDataMessage } from "@features/ui/component/NoDataBlock";
import { HelpToolTip } from "@features/ui/component/HelpToolTip";
import { FuzzySearch } from "@features/bookmark/components/contest/FuzzySearch";

// fuzzy search (Easy implementation)
const matchLabel = (label: string, query: string) => {
  const labelWords = label.toLowerCase().split(" ");
  const queryWords = query.toLowerCase().split(" ");
  return queryWords.every((queryWord) => {
    return labelWords.some((labelWord) => {
      return labelWord.includes(queryWord);
    });
  });
};

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

  const [query, setQuery] = useState<string>(""); // pseudo fuzzy search
  const filteredLabelsAndContests = query
    ? labelsAndContests?.filter(
        (label) =>
          matchLabel(label.name, query) ||
          matchLabel(label.description || "", query)
      )
    : labelsAndContests;

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
          paddingBottom: 1.5,
        }}
        gap={2}
      >
        <Box sx={{ flexGrow: 1 }}>
          <FuzzySearch query={query} setQuery={setQuery} />
        </Box>
        <DropDownMenuButton
          title="sort"
          items={sortOrders.map((so) => {
            return { item: so };
          })}
          selectedItem={order}
          onSelect={setOrder}
        />
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          borderColor: "divider",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {filteredLabelsAndContests && (
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2" fontWeight="bold" noWrap={true}>
                      {`${filteredLabelsAndContests.length} ${
                        filteredLabelsAndContests.length > 1
                          ? "Labels"
                          : "Label"
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
                  Contests
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
            {filteredLabelsAndContests &&
            filteredLabelsAndContests.length > 0 ? (
              sortLabels(filteredLabelsAndContests, order).map((label) => (
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
