import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import { SideBar } from "@features/layout/components/sidebar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <div>Layout (Header, Side Bar, Footer!)</div>
        <SideBar />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <div>contest</div> },
      { path: "/problems", element: <div>problems</div> },
      { path: "/achievement", element: <div>achievement</div> },
      { path: "/recommend", element: <div>recommend</div> },
      { path: "/bookmark", element: <div>bookmark</div> },
      { path: "/labels", element: <div>label for bookmark</div> },
      { path: "/submission", element: <div>submission</div> },
      { path: "/ranking", element: <div>ranking</div> },
      { path: "custom-contest", element: <div>custom contest</div> },
      { path: "/api", element: <div>api</div> },
      { path: "links", element: <div>links</div> },
      { path: "setting", element: <div>setting</div> },
      { path: "/user-guide", element: <div>user guide</div> },
      { path: "/faq", element: <div>faq</div> },
      { path: "/feedback", element: <div>feedback</div> },
      { path: "/send-a-tip", element: <div>send a tip</div> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);
