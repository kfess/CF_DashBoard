import React, { Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import {
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CreateIcon from "@mui/icons-material/Create";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import SendIcon from "@mui/icons-material/Send";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import WidgetsIcon from "@mui/icons-material/Widgets";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import BuildIcon from "@mui/icons-material/Build";
import FeedIcon from "@mui/icons-material/Feed";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useURLQuery } from "@hooks/useQueryParams";
import { useTheme } from "@mui/material/styles";

const mainField = [
  "Contests",
  "Problems",
  "Recommend",
  "Achievement",
  "Submission",
] as const;
type MainField = typeof mainField[number];

const activityField = ["Labels", "Ranking", "Custom Contest (beta)"] as const;
type ActivityField = typeof activityField[number];

const otherField = ["Links", "FAQ", "Terms", "Privacy Policy"] as const;
type OtherField = typeof otherField[number];

export type Field = MainField | ActivityField | OtherField;

type Item = {
  field: Field;
  link: string;
  selectedIcon: JSX.Element;
  notSelectedIcon: JSX.Element;
};

export const mainItems: readonly Item[] = [
  {
    field: "Contests",
    link: "/",
    selectedIcon: <HomeIcon />,
    notSelectedIcon: <HomeOutlinedIcon />,
  },
  {
    field: "Problems",
    link: "/problems",
    selectedIcon: <CreateIcon />,
    notSelectedIcon: <CreateOutlinedIcon />,
  },
  {
    field: "Recommend",
    link: "/recommend",
    selectedIcon: <ThumbUpIcon />,
    notSelectedIcon: <ThumbUpAltOutlinedIcon />,
  },
  {
    field: "Submission",
    link: "/submission",
    selectedIcon: <SendIcon />,
    notSelectedIcon: <SendOutlinedIcon />,
  },
  {
    field: "Achievement",
    link: "/achievement",
    selectedIcon: <EmojiEventsIcon />,
    notSelectedIcon: <EmojiEventsOutlinedIcon />,
  },
] as const;

export const activityItems: readonly Item[] = [
  {
    field: "Labels",
    link: "/labels",
    selectedIcon: <StarIcon />,
    notSelectedIcon: <StarBorderOutlinedIcon />,
  },
  // {
  //   field: "Ranking",
  //   link: "/ranking",
  //   selectedIcon: <LeaderboardIcon />,
  //   notSelectedIcon: <LeaderboardOutlinedIcon />,
  // },
  {
    field: "Custom Contest (beta)",
    link: "/custom-contest",
    selectedIcon: <WidgetsIcon />,
    notSelectedIcon: <WidgetsOutlinedIcon />,
  },
] as const;

export const otherItems: readonly Item[] = [
  {
    field: "Links",
    link: "/links",
    selectedIcon: <BuildIcon />,
    notSelectedIcon: <BuildOutlinedIcon />,
  },
  {
    field: "Terms",
    link: "/terms",
    selectedIcon: <FeedIcon />,
    notSelectedIcon: <FeedOutlinedIcon />,
  },
  {
    field: "Privacy Policy",
    link: "/privacy-policy",
    selectedIcon: <PrivacyTipIcon />,
    notSelectedIcon: <PrivacyTipOutlinedIcon />,
  },
] as const;

const linkToFieldMap: Record<string, string> = {};
[...mainItems, ...activityItems, ...otherItems].forEach((item) => {
  linkToFieldMap[item.link] = item.field;
});

// 与えられた link から field を見つける
export const getFieldFromLink = (link: string): string | undefined =>
  linkToFieldMap[link];

type Props = Item & {
  isSelected: boolean;
  setSelected: Dispatch<SetStateAction<Field>>;
  toggleSideBar: () => void;
};

export const SideNavigationItem: React.FC<Props> = ({
  field,
  link,
  selectedIcon,
  notSelectedIcon,
  isSelected,
  setSelected,
  toggleSideBar,
}) => {
  const { queryParams } = useURLQuery();
  const userId = queryParams["userId"];

  const theme = useTheme();

  if (field === "Achievement" && !userId) {
    return (
      <Tooltip
        title={
          <Typography variant="body2">
            To view the Achievement page, you must first enter the codeforces
            user ID in the navigation bar.
          </Typography>
        }
      >
        <ListItem key={field} disablePadding>
          <ListItemButton disabled selected={isSelected}>
            <ListItemIcon sx={{ pr: 2 }}>
              {isSelected ? selectedIcon : notSelectedIcon}
            </ListItemIcon>
            <ListItemText primary={field} sx={{ ml: "-10px" }} />
          </ListItemButton>
        </ListItem>
      </Tooltip>
    );
  }

  return (
    <NavLink
      to={link}
      css={{
        color: isSelected ? theme.palette.primary.main : "inherit",
        "&:hover": { color: theme.palette.primary.main },
      }}
    >
      <ListItem key={field} disablePadding>
        <ListItemButton
          selected={isSelected}
          onClick={() => {
            setSelected(field);
            toggleSideBar();
          }}
        >
          <ListItemIcon sx={{ pr: 2 }}>
            <div css={{ color: theme.palette.primary.main }}>
              {isSelected ? selectedIcon : notSelectedIcon}
            </div>
          </ListItemIcon>
          <ListItemText primary={field} sx={{ ml: "-10px" }} />
        </ListItemButton>
      </ListItem>
    </NavLink>
  );
};
