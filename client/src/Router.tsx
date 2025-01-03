import { createHashRouter } from "react-router-dom";
import Home from "./views/Home";
import Layout from "./views/Layout";
import InfoPage from "./views/InfoPage";
import LogInRegisterPage from "./views/LogInRegisterPage";
import RegisterPage from "./components/login-register-page/RegisterPage";

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
      {
        path: "/registrera",
        element: <RegisterPage />,
      },
    ],
  },
]);
