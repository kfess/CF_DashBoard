import React from "react";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CreateIcon from "@mui/icons-material/Create";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
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
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

const mainField = ["Contests", "Problems", "Recommend", "Bookmark"] as const;
type MainField = typeof mainField[number];

const activityField = [
  "Achievement",
  "Submission",
  "Ranking",
  "Custom Contest",
] as const;
type ActivityField = typeof activityField[number];

const otherField = [
  "Api",
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

type Field = MainField | ActivityField | OtherField;

export type Item = { field: Field; link: string; icon: JSX.Element };

type Props = {
  isSelected: boolean;
  filledIcon: JSX.Element;
  outlinedIcon: JSX.Element;
};

// tab の select 状態に合わせて Icon の色を反転
const SideNavigationIcon: React.FC<Props> = (props: Props) => {
  const { isSelected, filledIcon, outlinedIcon } = props;
  return (
    <React.Fragment>{isSelected ? filledIcon : outlinedIcon}</React.Fragment>
  );
};

export const mainItems: readonly Item[] = [
  {
    field: "Contests",
    link: "/",
    icon: (
      <SideNavigationIcon
        isSelected={false}
        filledIcon={<LeaderboardIcon />}
        outlinedIcon={<LeaderboardOutlinedIcon />}
      />
    ),
  },
  {
    field: "Problems",
    link: "/problems",
    icon: (
      <SideNavigationIcon
        isSelected={false}
        filledIcon={<CreateIcon />}
        outlinedIcon={<CreateOutlinedIcon />}
      />
    ),
  },
  {
    field: "Recommend",
    link: "/recommend",
    icon: (
      <SideNavigationIcon
        isSelected={false}
        filledIcon={<ThumbUpIcon />}
        outlinedIcon={<ThumbUpAltOutlinedIcon />}
      />
    ),
  },
  {
    field: "Bookmark",
    link: "/bookmark",
    icon: (
      <SideNavigationIcon
        isSelected={false}
        filledIcon={<StarIcon />}
        outlinedIcon={<StarBorderOutlinedIcon />}
      />
    ),
  },
] as const;

export const activityItems: readonly Item[] = [
  {
    field: "Achievement",
    link: "/achievement",
    icon: (
      <SideNavigationIcon
        isSelected={false}
        filledIcon={<VerifiedIcon />}
        outlinedIcon={<VerifiedOutlinedIcon />}
      />
    ),
  },
  {
    field: "Submission",
    link: "/submission",
    icon: (
      <SideNavigationIcon
        isSelected={false}
        filledIcon={<SendIcon />}
        outlinedIcon={<SendOutlinedIcon />}
      />
    ),
  },
  {
    field: "Ranking",
    link: "/ranking",
    icon: (
      <SideNavigationIcon
        isSelected={false}
        filledIcon={<EmojiEventsIcon />}
        outlinedIcon={<EmojiEventsOutlinedIcon />}
      />
    ),
  },
  {
    field: "Custom Contest",
    link: "/custom-contest",
    icon: (
      <SideNavigationIcon
        isSelected={false}
        filledIcon={<WidgetsIcon />}
        outlinedIcon={<WidgetsOutlinedIcon />}
      />
    ),
  },
] as const;

export const otherItems: readonly Item[] = [
  {
    field: "Api",
    link: "/api",
    icon: (
      <SideNavigationIcon
        isSelected={false}
        filledIcon={<HubIcon />}
        outlinedIcon={<HubOutlinedIcon />}
      />
    ),
  },
  {
    field: "Links",
    link: "Tools",
    icon: (
      <SideNavigationIcon
        isSelected={false}
        filledIcon={<BuildIcon />}
        outlinedIcon={<BuildOutlinedIcon />}
      />
    ),
  },
  {
    field: "Setting",
    link: "/setting",
    icon: (
      <SideNavigationIcon
        isSelected={false}
        filledIcon={<SettingsIcon />}
        outlinedIcon={<SettingsOutlinedIcon />}
      />
    ),
  },
  {
    field: "User Guide",
    link: "user-guide",
    icon: (
      <SideNavigationIcon
        isSelected={false}
        filledIcon={<HelpOutlinedIcon />}
        outlinedIcon={<HelpOutlineIcon />}
      />
    ),
  },
  {
    field: "FAQ",
    link: "/faq",
    icon: (
      <SideNavigationIcon
        isSelected={false}
        filledIcon={<QuestionAnswerIcon />}
        outlinedIcon={<QuestionAnswerOutlinedIcon />}
      />
    ),
  },
  {
    field: "Send a Tip",
    link: "send-a-tip",
    icon: (
      <SideNavigationIcon
        isSelected={false}
        filledIcon={<FavoriteIcon />}
        outlinedIcon={<FavoriteBorderOutlinedIcon />}
      />
    ),
  },
] as const;
