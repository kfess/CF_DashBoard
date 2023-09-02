import React, { Dispatch, SetStateAction } from "react";
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
    selectedIcon: <HomeIcon sx={{ color: "#9146FF" }} />,
    notSelectedIcon: <HomeOutlinedIcon sx={{ color: "#9146FF" }} />,
  },
  {
    field: "Problems",
    link: "/problems",
    selectedIcon: <CreateIcon sx={{ color: "#9146FF" }} />,
    notSelectedIcon: <CreateOutlinedIcon sx={{ color: "#9146FF" }} />,
  },
  {
    field: "Recommend",
    link: "/recommend",
    selectedIcon: <ThumbUpIcon sx={{ color: "#9146FF" }} />,
    notSelectedIcon: <ThumbUpAltOutlinedIcon sx={{ color: "#9146FF" }} />,
  },
  {
    field: "Submission",
    link: "/submission",
    selectedIcon: <SendIcon sx={{ color: "#9146FF" }} />,
    notSelectedIcon: <SendOutlinedIcon sx={{ color: "#9146FF" }} />,
  },
  {
    field: "Achievement",
    link: "/achievement",
    selectedIcon: <EmojiEventsIcon sx={{ color: "#9146FF" }} />,
    notSelectedIcon: <EmojiEventsOutlinedIcon sx={{ color: "#9146FF" }} />,
  },
] as const;

export const activityItems: readonly Item[] = [
  {
    field: "Labels",
    link: "/labels",
    selectedIcon: <StarIcon sx={{ color: "#9146FF" }} />,
    notSelectedIcon: <StarBorderOutlinedIcon sx={{ color: "#9146FF" }} />,
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
    selectedIcon: <WidgetsIcon sx={{ color: "#9146FF" }} />,
    notSelectedIcon: <WidgetsOutlinedIcon sx={{ color: "#9146FF" }} />,
  },
] as const;

export const otherItems: readonly Item[] = [
  {
    field: "Links",
    link: "/links",
    selectedIcon: <BuildIcon sx={{ color: "#9146FF" }} />,
    notSelectedIcon: <BuildOutlinedIcon sx={{ color: "#9146FF" }} />,
  },
  {
    field: "Terms",
    link: "/terms",
    selectedIcon: <FeedIcon sx={{ color: "#9146FF" }} />,
    notSelectedIcon: <FeedOutlinedIcon sx={{ color: "#9146FF" }} />,
  },
  {
    field: "Privacy Policy",
    link: "/privacy-policy",
    selectedIcon: <PrivacyTipIcon sx={{ color: "#9146FF" }} />,
    notSelectedIcon: <PrivacyTipOutlinedIcon sx={{ color: "#9146FF" }} />,
  },
] as const;

const linkToFieldMap: Record<string, string> = {};

// mainItems, activityItems, otherItems を一つずつループしてマッピングオブジェクトを作成
[...mainItems, ...activityItems, ...otherItems].forEach((item) => {
  linkToFieldMap[item.link] = item.field;
});

// 与えられた link から field を見つける関数
export const getFieldFromLink = (link: string): string | undefined =>
  linkToFieldMap[link];

const CustomListItemIcon = styled(ListItemIcon)`
  margin-right: 8px;
`;

const CustomListItemText = styled(ListItemText)`
  margin-left: -20px;
`;

type Props = Item & {
  isSelected: boolean;
  setSelected: Dispatch<SetStateAction<Field>>;
  isOpenSideBar: boolean;
  toggleSideBar: Dispatch<SetStateAction<boolean>>;
};

export const SideNavigationItem: React.FC<Props> = ({
  field,
  link,
  selectedIcon,
  notSelectedIcon,
  isSelected,
  setSelected,
  isOpenSideBar,
  toggleSideBar,
}) => {
  const { queryParams } = useURLQuery();
  const userId = queryParams["userId"];

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
            <CustomListItemIcon>
              {isSelected ? selectedIcon : notSelectedIcon}
            </CustomListItemIcon>
            <CustomListItemText primary={field} />
          </ListItemButton>
        </ListItem>
      </Tooltip>
    );
  }

  return (
    <NavLink
      to={link}
      css={{
        color: isSelected ? "#5C17C5" : "inherit",
        "&:hover": {
          color: isSelected ? "#5C17C5" : "inherit",
        },
      }}
    >
      <ListItem key={field} disablePadding>
        <ListItemButton
          selected={isSelected}
          onClick={() => {
            setSelected(field);
            toggleSideBar(!isOpenSideBar);
          }}
        >
          <CustomListItemIcon>
            {isSelected ? selectedIcon : notSelectedIcon}
          </CustomListItemIcon>
          <CustomListItemText primary={field} />
        </ListItemButton>
      </ListItem>
    </NavLink>
  );
};
