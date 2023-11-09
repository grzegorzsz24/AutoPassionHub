import ForumMenu from "../../components/Menu/ForumMenu";
import { Outlet } from "react-router-dom";
import PageWithAsideMenuLayout from "../PageWithAsideMenuLayout";

const ForumPageLayout = () => {
  return <PageWithAsideMenuLayout menu={<ForumMenu />} content={<Outlet />} />;
};

export default ForumPageLayout;
