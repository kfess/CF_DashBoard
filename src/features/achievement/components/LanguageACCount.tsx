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
import { useTheme } from "@mui/material";

export type Count = {
  readonly language: NormalizedLanguage;
  readonly count: number;
  readonly lastACDate: string;
};

const LanguageStat: React.FC<Count> = ({ language, count, lastACDate }) => {
  const theme = useTheme();

  return (
    <Stack key={language}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Chip_ label={language} onClick={() => {}} />
        <Stack direction="row" alignItems="center">
          <Typography
            variant="body1"
            color={theme.palette.primary.main}
            fontWeight="fontWeightBold"
          >
            {count.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary" ml={1}>
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

  const displayLanguageCounts = isReadMore
    ? languageCounts
    : languageCounts.slice(0, 3);

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
        {displayLanguageCounts.map((s) => (
          <LanguageStat key={s.language} {...s} />
        ))}
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
