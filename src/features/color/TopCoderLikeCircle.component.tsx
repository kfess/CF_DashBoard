import React from "react";
import { css, jsx } from "@emotion/react";

const circle = css({
  fontSize: "30px",
  color: "red",
});

type Props = {
  rating?: number;
};

export const TopcoderLikeCircle: React.FC<Props> = (props: Props) => {
  const { rating } = props;
  return <div css={circle}>a</div>;
};
