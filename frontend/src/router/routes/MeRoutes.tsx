import OutletLayout from "../../pages/OutletLayout";
import UserCloseAccountPage from "../../pages/UserSettings/UserCloseAccountPage";
import UserPage from "../../pages/UserPage";
import UserSettingsDataPage from "../../pages/UserSettings/UserSettingsDataPage";
import UserSettingsPageLayout from "../../pages/UserSettings/UserSettingsPageLayout";
import UserSettingsPhoto from "../../pages/UserSettings/UserSettingsPhoto";
import UserSettingsPrivacyPage from "../../pages/UserSettings/UserSettingsPrivacyPage";

const MeRoutes = {
  path: "/me",
  element: <OutletLayout />,
  children: [
    {
      path: "",
      element: <UserPage />,
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
        {
          path: "photo",
          element: <UserSettingsPhoto />,
        },
      ],
    },
  ],
};

export default MeRoutes;
