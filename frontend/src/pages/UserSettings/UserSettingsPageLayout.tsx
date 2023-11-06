import { Outlet } from "react-router-dom";
import UserSettingsMenu from "../../components/Menu/UserSettingsMenu";

const UserSettingsPageLayout = () => {
  return (
    <div className="px-6 py-12 flex items-start gap-8 xl:gap-32">
      <UserSettingsMenu />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default UserSettingsPageLayout;
