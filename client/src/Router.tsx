import { createHashRouter } from "react-router-dom";
import Home from "./views/Home";
import Layout from "./views/Layout";

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
    ],
  },
]);
