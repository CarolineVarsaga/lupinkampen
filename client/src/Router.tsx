import { createHashRouter } from "react-router-dom";
import Home from "./views/Home";
import Layout from "./views/Layout";
import InfoPage from "./views/InfoPage";

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
    ],
  },
]);
