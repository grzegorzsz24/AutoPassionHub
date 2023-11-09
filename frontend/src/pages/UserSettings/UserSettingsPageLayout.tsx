import { Outlet } from "react-router-dom";
import PageWithAsideMenuLayout from "../PageWithAsideMenuLayout";
import UserSettingsMenu from "../../components/Menu/UserSettingsMenu";

const UserSettingsPageLayout = () => {
  return (
    <PageWithAsideMenuLayout menu={<UserSettingsMenu />} content={<Outlet />} />
  );
};

export default UserSettingsPageLayout;
