import React from "react";
import { useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { SocialIcon } from "react-social-icons";
import { CopyToClipBoard } from "@features/ui/component/CopyToClipBoard";

type SocialNetWork = {
  readonly network: string;
  readonly urlTemplate: string;
};

type SocialShareProps = {
  iconSize?: { height: number; width: number };
};

const socialNetworks: SocialNetWork[] = [
  {
    network: "twitter",
    urlTemplate:
      "https://twitter.com/intent/tweet?text=Join%20my%20custom%20codeforces%20contest%20at%20",
  },
  {
    network: "facebook",
    urlTemplate: "https://www.facebook.com/sharer/sharer.php?u=",
  },
  {
    network: "linkedin",
    urlTemplate: "https://www.linkedin.com/shareArticle?mini=true&url=",
  },
  { network: "discord", urlTemplate: "https://discord.com/channels/@me/" },
];

const DEFAULT_ICON_SIZE = { height: 30, width: 30 };

export const SocialShare: React.FC<SocialShareProps> = ({
  iconSize = DEFAULT_ICON_SIZE,
}) => {
  const location = useLocation();
  const url = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <CopyToClipBoard text={url} />
      {socialNetworks.map(({ network, urlTemplate }) => (
        <SocialIcon
          key={network}
          network={network}
          url={`${urlTemplate}${url}`}
          style={iconSize}
        />
      ))}
    </Stack>
  );
};
