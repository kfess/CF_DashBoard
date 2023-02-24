import React from "react";
import { css } from "@emotion/react";
import SvgIcon from "@mui/material/SvgIcon";

const iconCss = css({
  width: 80,
  height: 80,
  color: "white",
  borderRadius: 10,
});

type Props = {
  readonly avatarUrl: string | undefined;
};

export const ProfileIcon: React.FC<Props> = (props: Props) => {
  const { avatarUrl } = props;

  return (
    <>
      {avatarUrl ? (
        <img css={iconCss} src={avatarUrl} />
      ) : (
        <SvgIcon css={[iconCss, { backgroundColor: "gray", opacity: 0.5 }]}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z" />
          </svg>
        </SvgIcon>
      )}
    </>
  );
};
