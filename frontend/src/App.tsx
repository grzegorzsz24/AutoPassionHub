import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./pages/AppLayout";
import LoginPage from "./pages/LoginPage";
import MainPageLayout from "./pages/MainPageLayout";
import Notification from "./ui/Notification";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <MainPageLayout />,
        children: [
          {
            path: "/",
            element: <p>Posty</p>,
          },
          {
            path: "/articles",
            element: <p>Artykuły</p>,
          },
          {
            path: "/events",
            element: <p>Wydarzenia</p>,
          },
          {
            path: "/friends",
            element: <p>Znajomi</p>,
          },
          {
            path: "/bookmarks",
            element: <p>Zapisane</p>,
          },
          {
            path: "/forum",
            element: <p>Forum</p>,
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Notification />
    </>
  );
}

export default App;
