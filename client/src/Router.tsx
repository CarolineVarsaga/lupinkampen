import { createHashRouter } from "react-router-dom";
import Home from "./views/Home";
import Layout from "./views/Layout";
import InfoPage from "./views/InfoPage";
import LogInRegisterPage from "./views/LogInRegisterPage";

export const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/information",
        element: <InfoPage />,
      },
      {
        path: "/logga-in",
        element: <LogInRegisterPage />,
      },
    ],
  },
]);
