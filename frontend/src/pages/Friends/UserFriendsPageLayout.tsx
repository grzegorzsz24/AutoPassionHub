import { Outlet } from "react-router-dom";
import PageWithAsideMenuLayout from "../PageWithAsideMenuLayout";
import UserFriendsMenu from "../../components/Menu/UserFriendsMenu";

const UserFriendsPageLayout = () => {
  return (
    <PageWithAsideMenuLayout menu={<UserFriendsMenu />} content={<Outlet />} />
  );
};

export default UserFriendsPageLayout;
