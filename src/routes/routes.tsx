import { createBrowserRouter, Navigate } from "react-router-dom";
import { LayoutPage } from "@pages/layout";
import { ContestsPage } from "@pages/contests";
import { ProblemsPage } from "@pages/problems";
import { LabelsPage } from "@pages/bookmark/labels";
import { LabelPage } from "@pages/bookmark/label/index";
import { SubmissionPage } from "@pages/submission";
import { AchievementPage } from "@pages/achievement";
import { RecommendationPage } from "@pages/recommendation";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      { index: true, element: <ContestsPage /> },
      { path: "/problems", element: <ProblemsPage /> },
      { path: "/achievement", element: <AchievementPage /> },
      { path: "/recommend", element: <RecommendationPage /> },
      { path: "labels", element: <LabelsPage /> },
      { path: "labels/:labelName", element: <LabelPage /> },
      { path: "/submission", element: <SubmissionPage /> },
      { path: "/ranking", element: <div>ranking</div> },
      { path: "/custom-contest", element: <div>custom contest</div> },
      { path: "/api", element: <div>api</div> },
      { path: "/links", element: <div>links</div> },
      { path: "/setting", element: <div>setting</div> },
      { path: "/user-guide", element: <div>user guide</div> },
      { path: "/faq", element: <div>faq</div> },
      { path: "/feedback", element: <div>feedback</div> },
      { path: "/send-a-tip", element: <div>send a tip</div> },
      { path: "/terms", element: <div>terms</div> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);
