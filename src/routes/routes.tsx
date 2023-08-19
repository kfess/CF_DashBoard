import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { LayoutPage } from "@pages/layout";
import { ContestsPage } from "@pages/contests";
import { ProblemsPage } from "@pages/problems/";
import { LabelsPage } from "@pages/labels/index";
import { ProblemLabelPage, ContestLabelPage } from "@pages/labels/label/index";
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
import { PrivacyPolicyPage } from "@pages/privacy_policy";

// const ProblemsPage = lazy(() => import("@pages/problems"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ContestsPage />
          </Suspense>
        ),
      },
      {
        path: "/problems",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ProblemsPage />
          </Suspense>
        ),
      },
      {
        path: "/achievement",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <AchievementPage />
          </Suspense>
        ),
      },
      {
        path: "/recommend",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <RecommendationPage />
          </Suspense>
        ),
      },
      {
        path: "labels",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <LabelsPage />
          </Suspense>
        ),
      },
      {
        path: "labels/problem/:labelName",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ProblemLabelPage />
          </Suspense>
        ),
      },
      {
        path: "labels/contest/:labelName",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ContestLabelPage />
          </Suspense>
        ),
      },
      {
        path: "/submission",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <SubmissionPage />
          </Suspense>
        ),
      },
      // { path: "/ranking", element: <div>ranking</div> },
      {
        path: "/custom-contest",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <CustomContestPage />
          </Suspense>
        ),
      },
      {
        path: "/custom-contest/show/:contestId",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ShowCustomContestPage />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "/custom-contest/create",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <PrivateRoute>
              <CreateCustomContestPage />
            </PrivateRoute>
          </Suspense>
        ),
      },
      { path: "/api", element: <ApiPage /> },
      { path: "/links", element: <LinksPage /> },
      { path: "/setting", element: <SettingPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/callback", element: <Callback /> },
      { path: "/terms", element: <TermsPage /> },
      { path: "/privacy-policy", element: <PrivacyPolicyPage /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);
