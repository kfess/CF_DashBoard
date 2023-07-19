import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Submission } from "@features/submission/submission";
import { NormalizedLanguage } from "@features/language/language";
import {
  isACSubmission,
  groupByLanguage,
  filterUniqueSubmissions,
} from "@features/achievement/processSubmission";
import { formatUnixTime } from "@helpers/date";
import { Chip_ } from "@features/ui/component/Chip";
import { useToggle } from "@hooks/index";
import { pluralize } from "@helpers/index";

type Count = {
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
        <Typography variant="body1">
          <strong>{count.toLocaleString()}</strong>{" "}
          {pluralize(count, "problem")} solved
        </Typography>
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

  const ACSubmissions = submissions.filter(isACSubmission);
  const groupedSubmissionsByLanguage = groupByLanguage(ACSubmissions);

  const languageCounts: Count[] = groupedSubmissionsByLanguage
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
    .sort((a, b) => b.count - a.count);

  return (
    <Box
      sx={{
        marginTop: 1,
        marginBottom: 1,
      }}
    >
      <Box sx={{ marginTop: 1, marginBottom: 1 }}>
        <Typography variant="h6" gutterBottom>
          Language
        </Typography>
      </Box>
      <Stack spacing={1}>
        {languageCounts.map((s, index) =>
          (!isReadMore && index < 3) || isReadMore ? (
            <LanguageStat key={s.language} {...s} />
          ) : null
        )}
      </Stack>
      {languageCounts.length > 3 && (
        <Box sx={{ display: "flex", justifyContent: "center", padding: 1 }}>
          <span onClick={toggleReadMore} css={{ cursor: "pointer" }}>
            {isReadMore ? "Show Less" : "Show More"}
          </span>
        </Box>
      )}
      {languageCounts.length === 0 && (
        <Typography variant="body1" color="text.secondary" align="center">
          No problems solved
        </Typography>
      )}
    </Box>
  );
};

// under development
// const groupSubmissionsByLanguage = (submissions: Submission[]) => {
//   const submissionsByLanguage = new Map<NormalizedLanguage, Submission[]>();
//   submissions.forEach((sub) => {
//     let subs =
//       submissionsByLanguage.get(
//         sub.programmingLanguage as NormalizedLanguage
//       ) || [];
//     subs = [...subs, sub];
//     submissionsByLanguage.set(
//       sub.programmingLanguage as NormalizedLanguage,
//       subs
//     );
//   });
//   return submissionsByLanguage;
// };
