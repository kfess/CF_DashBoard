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
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
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
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import HubIcon from "@mui/icons-material/Hub";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import BuildIcon from "@mui/icons-material/Build";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import FlagIcon from "@mui/icons-material/Flag";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

const mainField = [
  "Contests",
  "Problems",
  "Recommend",
  "Achievement",
  "Submission",
] as const;
type MainField = typeof mainField[number];

const activityField = ["Labels", "Ranking", "Custom Contest"] as const;
type ActivityField = typeof activityField[number];

const otherField = [
  "API",
  "Links",
  "Tools",
  "Setting",
  "User Guide",
  "FAQ",
  "Feedback",
  "Send a Tip",
  "Terms",
] as const;
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
    field: "Achievement",
    link: "/achievement",
    selectedIcon: <EmojiEventsIcon />,
    notSelectedIcon: <EmojiEventsOutlinedIcon />,
  },
  {
    field: "Submission",
    link: "/submission",
    selectedIcon: <SendIcon />,
    notSelectedIcon: <SendOutlinedIcon />,
  },
] as const;

export const activityItems: readonly Item[] = [
  {
    field: "Labels",
    link: "/labels",
    selectedIcon: <StarIcon />,
    notSelectedIcon: <StarBorderOutlinedIcon />,
  },
  {
    field: "Ranking",
    link: "/ranking",
    selectedIcon: <LeaderboardIcon />,
    notSelectedIcon: <LeaderboardOutlinedIcon />,
  },
  {
    field: "Custom Contest",
    link: "/custom-contest",
    selectedIcon: <WidgetsIcon />,
    notSelectedIcon: <WidgetsOutlinedIcon />,
  },
] as const;

export const otherItems: readonly Item[] = [
  {
    field: "API",
    link: "/api",
    selectedIcon: <HubIcon />,
    notSelectedIcon: <HubOutlinedIcon />,
  },
  {
    field: "Links",
    link: "/links",
    selectedIcon: <BuildIcon />,
    notSelectedIcon: <BuildOutlinedIcon />,
  },
  {
    field: "Setting",
    link: "/setting",
    selectedIcon: <SettingsIcon />,
    notSelectedIcon: <SettingsOutlinedIcon />,
  },
  {
    field: "User Guide",
    link: "/user-guide",
    selectedIcon: <HelpOutlinedIcon />,
    notSelectedIcon: <HelpOutlineIcon />,
  },
  {
    field: "FAQ",
    link: "/faq",
    selectedIcon: <QuestionAnswerIcon />,
    notSelectedIcon: <QuestionAnswerOutlinedIcon />,
  },
  {
    field: "Feedback",
    link: "/feedback",
    selectedIcon: <FlagIcon />,
    notSelectedIcon: <OutlinedFlagIcon />,
  },
  {
    field: "Send a Tip",
    link: "/send-a-tip",
    selectedIcon: <FavoriteIcon />,
    notSelectedIcon: <FavoriteBorderOutlinedIcon />,
  },
] as const;

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

export const SideNavigationItem: React.FC<Props> = (props: Props) => {
  const {
    field,
    link,
    selectedIcon,
    notSelectedIcon,
    isSelected,
    setSelected,
    isOpenSideBar,
    toggleSideBar,
  } = props;

  return (
    <NavLink
      to={link}
      css={{
        color: isSelected ? "#0d47a1" : "inherit",
        "&:hover": {
          color: isSelected ? "#0d47a1" : "inherit",
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
