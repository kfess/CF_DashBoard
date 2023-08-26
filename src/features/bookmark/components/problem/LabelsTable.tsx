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
import { FuzzySearch } from "@features/bookmark/components/problem/FuzzySearch";

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

  const [query, setQuery] = useState<string>(""); // pseudo fuzzy search
  const filteredLabelsAndProblems = query
    ? labelsAndProblems?.filter(
        (label) =>
          matchLabel(label.name, query) ||
          matchLabel(label.description || "", query)
      )
    : labelsAndProblems;

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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {filteredLabelsAndProblems && (
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2" fontWeight="bold" noWrap={true}>
                      {`${filteredLabelsAndProblems.length} ${
                        filteredLabelsAndProblems.length > 1
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
            {filteredLabelsAndProblems &&
            filteredLabelsAndProblems.length > 0 ? (
              sortLabels(filteredLabelsAndProblems, order).map((label) => (
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
