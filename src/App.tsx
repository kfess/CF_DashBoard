import "./App.css";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { router } from "@routes/routes";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeContextProvider } from "@global/theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ThemeContextProvider>
            <RouterProvider router={router} />
          </ThemeContextProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </HelmetProvider>
  );
};

export default App;
