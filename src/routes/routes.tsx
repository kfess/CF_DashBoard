import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import { HeaderBar } from "@features/layout/components/HeaderBar";
import { ContestsPage } from "@pages/contests";
import { ProblemLinkCell } from "@features/problems/components/ProblemLinkCell";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <div>Layout (Header, Side Bar, Footer!!!!!!!!!!!!!!!)</div>
        <HeaderBar />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <ContestsPage /> },
      { path: "/problems", element: <div>problems</div> },
      { path: "/achievement", element: <div>achievement</div> },
      { path: "/recommend", element: <div>recommend</div> },
      { path: "/bookmark", element: <div>bookmark</div> },
      { path: "/labels", element: <div>label for bookmark</div> },
      { path: "/submission", element: <div>submission</div> },
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
