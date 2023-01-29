import { RouterProvider } from "react-router-dom";
import { router } from "@routes/routes";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { ThemeContextProvider } from "@features/color/themeColor.hook";

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeContextProvider>
          <RouterProvider router={router} />
        </ThemeContextProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
