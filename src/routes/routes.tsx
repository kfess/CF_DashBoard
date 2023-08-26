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
import { ErrorFallback } from "@features/ui/component/ErrorBoundary";

// const ProblemsPage = lazy(() => import("@pages/problems"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        index: true,
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<CircularProgress />}>
              <ContestsPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/problems",
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<CircularProgress />}>
              <ProblemsPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/achievement",
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<CircularProgress />}>
              <AchievementPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/recommend",
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<CircularProgress />}>
              <RecommendationPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "labels",
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<CircularProgress />}>
              <LabelsPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "labels/problem/:labelName",
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<CircularProgress />}>
              <ProblemLabelPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "labels/contest/:labelName",
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<CircularProgress />}>
              <ContestLabelPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/submission",
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<CircularProgress />}>
              <SubmissionPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      // { path: "/ranking", element: <div>ranking</div> },
      {
        path: "/custom-contest",
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<CircularProgress />}>
              <CustomContestPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/custom-contest/show/:contestId",
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<CircularProgress />}>
              <ShowCustomContestPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/profile",
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<CircularProgress />}>
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/custom-contest/create",
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<CircularProgress />}>
              <PrivateRoute>
                <CreateCustomContestPage />
              </PrivateRoute>
            </Suspense>
          </ErrorBoundary>
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
