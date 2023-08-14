import React from "react";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { CF_CONTEST_URL } from "@constants/url";
import { Problem } from "@features/problems/problem";
import { Button } from "@features/ui/component/Button";

type Props = {
  readonly problem: Problem;
};

export const PickOneButton: React.FC<Props> = ({ problem }) => {
  const problemUrl = `${CF_CONTEST_URL}/${problem.contestId}/problem/${problem.index}`;

  return (
    <a href={problemUrl} target="_blank" rel="noopener noreferrer">
      <Button>
        <ShuffleIcon />
        Pick One
      </Button>
    </a>
  );
};
