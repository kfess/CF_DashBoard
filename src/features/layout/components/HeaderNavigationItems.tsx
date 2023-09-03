import React, { Dispatch, SetStateAction } from "react";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { IconButton } from "@features/ui/component/IconButton";
import type { Field } from "@features/layout/components/SideNavigationItems";
import { generateUrlPath } from "@features/layout/helper";
import { useURLQuery } from "@hooks/useQueryParams";

type Props = {
  setSelectedItem: Dispatch<SetStateAction<Field>>;
};

export const HeaderNavigationItems: React.FC<Props> = ({ setSelectedItem }) => {
  const navigate = useNavigate();
  const { queryParams } = useURLQuery();
  const userId = queryParams["userId"] || "";

  return (
    <Stack direction="row" alignItems="center" spacing={0.2}>
      <IconButton
        onClick={() => {
          setSelectedItem("Problems");
          navigate(generateUrlPath("/problems", userId));
        }}
        icon={<CreateOutlinedIcon />}
      />
      <IconButton
        onClick={() => {
          setSelectedItem("Submission");
          navigate(generateUrlPath("/submission", userId));
        }}
        icon={<SendOutlinedIcon />}
      />
      <Tooltip
        title={
          <Typography variant="body2">
            "To view the Achievement page, you must first enter the codeforces
            user ID in the navigation bar.""
          </Typography>
        }
        disableHoverListener={!!userId}
      >
        <span>
          <IconButton
            onClick={() => {
              setSelectedItem("Achievement");
              navigate(generateUrlPath("/achievement", userId));
            }}
            icon={<EmojiEventsOutlinedIcon />}
            disabled={!userId}
          />
        </span>
      </Tooltip>
    </Stack>
  );
};
