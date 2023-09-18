import React, { useState } from "react";
import { Tooltip } from "@mui/material";
import { IconButton } from "@features/ui/component/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const copyTextToClipBoard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.log(`Failed to copy text: ${error}`);
  }
};

type Props = {
  text: string;
};

export const CopyToClipBoard: React.FC<Props> = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = (): void => {
    setIsOpen(false);
  };
  const handleClickButton = (): void => {
    setIsOpen(true);
    copyTextToClipBoard(text);
  };

  return (
    <Tooltip
      title="Copied!"
      placement="top"
      disableFocusListener
      open={isOpen}
      onClose={handleClose}
    >
      <span>
        <IconButton
          icon={<ContentCopyIcon />}
          onClick={handleClickButton}
          size="small"
          color="primary"
        />
      </span>
    </Tooltip>
  );
};
