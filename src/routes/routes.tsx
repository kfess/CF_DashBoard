import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { LayoutPage } from "@pages/layout";
import { ContestsPage } from "@pages/contests";
import { ProblemsPage } from "@pages/problems/";
import { LabelsPage } from "@pages/labels/index";
import { LabelPage } from "@pages/labels/label/index";
import { SubmissionPage } from "@pages/submission";
import { AchievementPage } from "@pages/achievement";
import { RecommendationPage } from "@pages/recommendation";
import { CustomContestPage } from "@pages/custom_contests";
import { ShowCustomContestPage } from "@pages/custom_contests/show_custom_contest";
import { CreateCustomContestPage } from "@pages/custom_contests/create_custom_contest";
import Callback from "@features/authentication/components/Callback";
import { PrivateRoute } from "@features/authentication/components/PrivateRoute";
import { ProfilePage } from "@pages/authentication/profile";
import { LoginPage } from "@pages/authentication/login";
import { LinksPage } from "@pages/links";
import { TermsPage } from "@pages/terms";
import { ApiPage } from "@pages/api";
import { SettingPage } from "@pages/setting";
import { CircularProgress } from "@features/ui/component/CircularProgress";

// const ProblemsPage = lazy(() => import("@pages/problems"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      { index: true, element: <ContestsPage /> },
      { path: "/problems", element: <ProblemsPage /> },
      {
        path: "/achievement",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <AchievementPage />
          </Suspense>
        ),
      },
      { path: "/recommend", element: <RecommendationPage /> },
      { path: "labels", element: <LabelsPage /> },
      { path: "labels/:labelName", element: <LabelPage /> },
      { path: "/submission", element: <SubmissionPage /> },
      // { path: "/ranking", element: <div>ranking</div> },
      { path: "/custom-contest", element: <CustomContestPage /> },
      {
        path: "/custom-contest/show/:contestId",
        element: <ShowCustomContestPage />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/custom-contest/create",
        element: (
          <PrivateRoute>
            <CreateCustomContestPage />
          </PrivateRoute>
        ),
      },
      { path: "/api", element: <ApiPage /> },
      { path: "/links", element: <LinksPage /> },
      { path: "/setting", element: <SettingPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/callback", element: <Callback /> },
      { path: "/terms", element: <TermsPage /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);
