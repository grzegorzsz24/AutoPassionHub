import { Outlet } from "react-router-dom";
import UserFriendsMenu from "../../components/Menu/UserFriendsMenu";

const UserFriendsPageLayout = () => {
  return (
    <div className="px-6 py-12 flex items-start gap-32 h-full overflow-y-auto">
      <UserFriendsMenu />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default UserFriendsPageLayout;
