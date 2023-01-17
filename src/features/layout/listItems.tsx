import { IoPodiumOutline } from "react-icons/io5";
import { BsPencil, BsTrophy } from "react-icons/bs";
import { FiThumbsUp, FiSettings } from "react-icons/fi";
import {
  AiOutlineStar,
  AiOutlineApi,
  AiOutlineTool,
  AiOutlineHeart,
} from "react-icons/ai";
import { ImTable } from "react-icons/im";
import { RiBookLine, RiQuestionAnswerLine } from "react-icons/ri";
import { BiCustomize, BiHelpCircle } from "react-icons/bi";

// main feature
type MainField = "Contests" | "Problems";

type SubField =
  | "Achievement"
  | "Recommend"
  | "Bookmark"
  | "Submission"
  | "Ranking"
  | "Custom Contest";

type OtherField =
  | "Api"
  | "Links"
  | "Tools"
  | "Setting"
  | "User Guide"
  | "FAQ"
  | "Feedback"
  | "Send a Tip";

type Field = MainField | SubField | OtherField;

export type Item = { field: Field[number]; link: string; icon: JSX.Element };

export const mainListItems: readonly Item[] = [
  { field: "Contests", link: "/", icon: <RiBookLine size="20px" /> },
  { field: "Problems", link: "/problems", icon: <BsPencil size="20px" /> },
] as const;

export const subListItems: readonly Item[] = [
  {
    field: "Achievement",
    link: "/achievement",
    icon: <BsTrophy size="20px" />,
  },
  { field: "Recommend", link: "/recommend", icon: <FiThumbsUp size="20px" /> },
  { field: "Bookmark", link: "/bookmark", icon: <AiOutlineStar size="20px" /> },
  { field: "Submission", link: "/submission", icon: <ImTable size="20px" /> },
  { field: "Ranking", link: "/ranking", icon: <IoPodiumOutline size="20px" /> },
  {
    field: "Custom Contest",
    link: "/custom-contest",
    icon: <BiCustomize size="20px" />,
  },
] as const;

export const otherListItems: readonly Item[] = [
  { field: "Api", link: "/api", icon: <AiOutlineApi size="20px" /> },
  { field: "Links", link: "Tools", icon: <AiOutlineTool size="20px" /> },
  { field: "Setting", link: "/setting", icon: <FiSettings size="20px" /> },
  {
    field: "User Guide",
    link: "user-guide",
    icon: <BiHelpCircle size="20px" />,
  },
  { field: "FAQ", link: "/faq", icon: <RiQuestionAnswerLine size="20px" /> },
  {
    field: "Send a Tip",
    link: "send-a-tip",
    icon: <AiOutlineHeart size="20px" />,
  },
] as const;
