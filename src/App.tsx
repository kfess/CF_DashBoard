import reactLogo from "./assets/react.svg";
import "./App.css";
import { ThemeContextProvider } from "@features/color/themeColor.hook";
import { RouterProvider } from "react-router-dom";
import { router } from "@routes/routes";

function App() {
  return (
    <div>
      <ThemeContextProvider>
        <RouterProvider router={router} />
      </ThemeContextProvider>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </div>
  );
}

export default App;
