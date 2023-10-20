import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./pages/AppLayout";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MainPageLayout from "./pages/MainPageLayout";
import Notification from "./ui/Notification";
import OutletLayout from "./pages/OutletLayout";
import ProtectedRoute from "./ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import UserCloseAccountPage from "./pages/UserCloseAccountPage";
import UserSettingsDataPage from "./pages/UserSettingsDataPage";
import UserSettingsPageLayout from "./pages/UserSettingsPageLayout";
import UserSettingsPrivacyPage from "./pages/UserSettingsPrivacyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute element={<MainPageLayout />} />,
        children: [
          {
            path: "/",
            element: <MainPage />,
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
          {
            path: "/me",
            element: <OutletLayout />,
            children: [
              {
                path: "",
                element: <p>Profil</p>,
              },
              {
                path: "settings",
                element: <UserSettingsPageLayout />,
                children: [
                  {
                    path: "data",
                    element: <UserSettingsDataPage />,
                  },
                  {
                    path: "privacy",
                    element: <UserSettingsPrivacyPage />,
                  },
                  {
                    path: "close",
                    element: <UserCloseAccountPage />,
                  },
                ],
              },
            ],
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
