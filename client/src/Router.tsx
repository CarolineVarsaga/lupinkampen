import { createHashRouter } from "react-router-dom";
import Home from "./views/HomePage";
import Layout from "./views/Layout";
import LupinesInformation from "./views/LupinesInformation";
import LogInPage from "./views/LogInPage";
import RegisterPage from "./components/login-register-page/RegisterPage";
import UserPage from "./views/UserPage";
import RegisterLupinesPage from "./views/RegisterLupinesPage";
import LeaderBoard from "./views/LeaderBoard";
import CookiePolicy from "./views/CookiePolicy";
import TermsOfServicePage from "./views/TermsOfServicePage";

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
        element: <LupinesInformation />,
      },
      {
        path: "/logga-in",
        element: <LogInPage />,
      },
      {
        path: "/registrera",
        element: <RegisterPage />,
      },
      {
        path: "/profil/:userId",
        element: <UserPage />,
      },
      {
        path: "/profil/:userId/registrera-lupiner",
        element: <RegisterLupinesPage />,
      },
      {
        path: "/topplista",
        element: <LeaderBoard />,
      },
      {
        path: "/policy",
        element: <CookiePolicy />,
      },
      {
        path: "/villkor",
        element: <TermsOfServicePage />,
      },
    ],
  },
]);
