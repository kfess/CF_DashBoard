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
  | "Faq"
  | "Feedback"
  | "Send A Tip";

type Field = MainField | SubField | OtherField;

type Item = { field: Field[number]; link: string; icon: JSX.Element };

export const listItems: Item[] = [
  { field: "Contests", link: "/", icon: <RiBookLine /> },
  { field: "Problems", link: "/problems", icon: <BsPencil /> },
  { field: "Achievement", link: "/achievement", icon: <BsTrophy /> },
  { field: "Recommend", link: "/recommend", icon: <FiThumbsUp /> },
  { field: "Bookmark", link: "/bookmarl", icon: <AiOutlineStar /> },
  { field: "Submission", link: "/submission", icon: <ImTable /> },
  { field: "Ranking", link: "/ranking", icon: <IoPodiumOutline /> },
  { field: "Custom Contest", link: "/custom-contest", icon: <BiCustomize /> },
  { field: "Api", link: "/api", icon: <AiOutlineApi /> },
  { field: "Links", link: "Tools", icon: <AiOutlineTool /> },
  { field: "Setting", link: "/setting", icon: <FiSettings /> },
  { field: "User Guide", link: "user-guide", icon: <BiHelpCircle /> },
  { field: "Faq", link: "/faq", icon: <RiQuestionAnswerLine /> },
  { field: "Send A Tip", link: "send-a-tip", icon: <AiOutlineHeart /> },
];
