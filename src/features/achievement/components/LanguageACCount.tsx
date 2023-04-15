import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
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
  const [isReadMore, toggleReadMore] = useToggle(true, false);

  const { submissions } = props;
  const ACSubmissions = submissions.filter(isACSubmission);
  const gLangSubs = groupByLanguage(ACSubmissions);
  const languageCounts: Count[] = gLangSubs
    .map((g) => {
      const [lang, subs] = g;
      const sortSubs = subs.sort(
        (a, b) => a.creationTimeSeconds - b.creationTimeSeconds
      );
      const uniSubs = filterUniqueSubmissions(sortSubs);
      const lastACDate = formatUnixTime(
        uniSubs[uniSubs.length - 1].creationTimeSeconds,
        true
      );
      return {
        language: lang,
        count: uniSubs.length,
        lastACDate: lastACDate,
      } as Count;
    })
    .sort((a, b) => b.count - a.count);

  const readLabguageCounts = isReadMore
    ? languageCounts.slice(0, 3)
    : languageCounts;

  return (
    <Box>
      <Box sx={{ marginTop: 1, marginBottom: 1 }}>
        <strong>Language</strong>
      </Box>
      {readLabguageCounts.map((s) => (
        <Stack>
          <Stack
            direction="row"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              m: 0.1,
            }}
          >
            <Chip_ label={s.language} />
            <div>
              <strong>{s.count.toLocaleString()}</strong>{" "}
              <span css={{ fontSize: "14px", color: "gray" }}>
                {s.count > 1 ? "problems" : "problem"} solved
              </span>
            </div>
          </Stack>
          <Box sx={{ fontSize: "14px", color: "gray", textAlign: "right" }}>
            Last AC Date: {s.lastACDate}
          </Box>
        </Stack>
      ))}
      {languageCounts.length > 3 && (
        <div css={{ fontSize: "12px", color: "gray", textAlign: "center" }}>
          <span onClick={toggleReadMore} css={{ cursor: "pointer" }}>
            {isReadMore ? "Show More" : "Show Less"}
          </span>
        </div>
      )}
      {languageCounts.length === 0 && (
        <div css={{ fontSize: "14px", color: "gray" }}>No problems solved</div>
      )}
    </Box>
  );
};
