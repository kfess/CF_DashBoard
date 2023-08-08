import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Submission } from "@features/submission/submission";
import { NormalizedLanguage } from "@features/language/language";
import {
  groupbyLanguage,
  filterUniqueSubmissions,
} from "@features/achievement/processSubmission";
import { formatUnixTime } from "@helpers/date";
import { Chip_ } from "@features/ui/component/Chip";
import { useToggle } from "@hooks/index";
import { pluralize } from "@helpers/index";
import { LanguageACCountPie } from "@features/achievement/components/LanguageACCountPie";
import { ReadMoreLess } from "@features/ui/component/ReadMoreLess";

export type Count = {
  readonly language: NormalizedLanguage;
  readonly count: number;
  readonly lastACDate: string;
};

const LanguageStat: React.FC<Count> = ({ language, count, lastACDate }) => {
  return (
    <Stack key={language}>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Chip_ label={language} />
        <Stack direction="row" alignItems="center">
          <Typography
            variant="body1"
            color="#9246FF"
            fontWeight="fontWeightBold"
          >
            {count.toLocaleString()}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginLeft: "8px" }}
          >
            {pluralize(count, "problem")} solved
          </Typography>
        </Stack>
      </Stack>
      <Typography variant="body2" color="text.secondary" align="right">
        Last AC Date: {lastACDate}
      </Typography>
    </Stack>
  );
};

type Props = { readonly submissions: Submission[] };

// If you solve the same problem in the same programming language more than once,
// it will not be recognized as new AC.
// If you solve the same problem in different languages, it is recognized as new AC.
export const LanguageACCount: React.FC<Props> = ({ submissions }) => {
  const [isReadMore, toggleReadMore] = useToggle(false, true);

  const groupedSubmissionsByLanguage = useMemo(
    () => groupbyLanguage(submissions),
    [submissions]
  );

  const languageCounts: Count[] = useMemo(
    () =>
      groupedSubmissionsByLanguage
        .map(([lang, subs]) => {
          const sortedSubs = subs.sort(
            (a, b) => a.creationTimeSeconds - b.creationTimeSeconds
          );
          const uniqueSubs = filterUniqueSubmissions(sortedSubs);
          return {
            language: lang,
            count: uniqueSubs.length,
            lastACDate: formatUnixTime(
              uniqueSubs[uniqueSubs.length - 1].creationTimeSeconds,
              true
            ),
          };
        })
        .sort((a, b) => b.count - a.count),
    [groupedSubmissionsByLanguage]
  );

  return (
    <Box
      sx={{
        marginTop: 1,
        marginBottom: 1,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" gutterBottom>
          Language
        </Typography>
        <LanguageACCountPie languageCounts={languageCounts} />
      </Stack>
      <Stack spacing={1}>
        {languageCounts.map((s, index) =>
          (!isReadMore && index < 3) || isReadMore ? (
            <LanguageStat key={s.language} {...s} />
          ) : null
        )}
      </Stack>
      <ReadMoreLess
        expanded={isReadMore}
        toggleExpanded={toggleReadMore}
        threshold={3}
        itemsCount={languageCounts.length}
      />
      {languageCounts.length === 0 && (
        <Typography variant="body1" color="text.secondary" align="center">
          No problems solved
        </Typography>
      )}
    </Box>
  );
};
