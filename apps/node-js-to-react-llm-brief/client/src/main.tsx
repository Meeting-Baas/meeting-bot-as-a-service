import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "@/styles/globals.css";

import Root from "@/routes/root";
import Join from "@/routes/join";
import View from "@/routes/view";
import NotFound from "@/routes/not-found";

import { Toaster } from "@/components/ui/sonner"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/join",
    element: <Join />,
  },
  {
    path: "/view",
    element: <View />,
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>
);
