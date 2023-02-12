import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import type { Submission } from "@features/submission/submission";
import { NormalizedLanguage } from "@features/language/language";
import {
  isACSubmission,
  groupByLanguage,
  filterUniqueSubmissions,
} from "@features/achievement/processSubmission";
import { formatUnixTime } from "@helpers/index";

type Count = {
  language: NormalizedLanguage;
  count: number;
  lastACDate: string;
};

type Props = { submissions: Submission[] };

// If you solve the same problem in the same programming language more than once,
// it will not be recognized as new AC.
// If you solve the same problem in different languages, it is recognized as new AC.
export const LanguageACCount: React.FC<Props> = (props: Props) => {
  const { submissions } = props;

  const ACSubmissions = submissions.filter(isACSubmission);
  const gLangSubmissions = groupByLanguage(ACSubmissions);
  const gUniLangSubmissions: Count[] = gLangSubmissions
    .map((g) => {
      const [lang, submissions] = g;
      const sortSubmissions = submissions.sort(
        (a, b) => a.creationTimeSeconds - b.creationTimeSeconds
      );
      const uniSubmissions = filterUniqueSubmissions(sortSubmissions);
      const lastACDate = formatUnixTime(
        uniSubmissions[uniSubmissions.length - 1].creationTimeSeconds
      );
      return {
        language: lang,
        count: uniSubmissions.length,
        lastACDate: lastACDate,
      } as Count;
    })
    .sort((a, b) => b.count - a.count);

  return (
    <Box>
      <div>Language</div>
      {gUniLangSubmissions.map((s) => (
        <Stack>
          <Stack direction="row" spacing={5}>
            <Chip
              sx={{ m: 0.5 }}
              label={s.language}
              size="small"
              onClick={() => {}}
            />
            <div>
              {s.count} {s.count > 1 ? "problems" : "problem"} solved
            </div>
            <div>{s.lastACDate}</div>
          </Stack>
        </Stack>
      ))}
    </Box>
  );
};
