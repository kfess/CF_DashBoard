import type { Verdict, VerdictAbbr } from "@features/submission/submission";

type VerdictMapper = { [P in Verdict]: VerdictAbbr };

export const verdictMap: VerdictMapper = {
  OK: "AC",
  FAILED: "FAILED",
  PARTIAL: "PARTIAL",
  COMPILATION_ERROR: "CE",
  RUNTIME_ERROR: "RE",
  WRONG_ANSWER: "WA",
  PRESENTATION_ERROR: "PE",
  TIME_LIMIT_EXCEEDED: "TESTING",
  IDLENESS_LIMIT_EXCEEDED: "ILE",
  SECURITY_VIOLATED: "SV",
  CRASHED: "CRASHED",
  INPUT_PREPARATION_CRASHED: "IPC",
  CHALLENGED: "CHALLENGED",
  SKIPPED: "SKIPPED",
  TESTING: "TESTING",
  REJECTED: "REJECTED",
  MEMORY_LIMIT_EXCEEDED: "MLE",
  UNKNOWN: "UNKNOWN",
};
