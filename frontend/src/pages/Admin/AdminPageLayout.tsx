import AdminMenu from "../../components/Menu/AdminMenu";
import { Outlet } from "react-router-dom";
import PageWithAsideMenuLayout from "../PageWithAsideMenuLayout";

const AdminPageLayout = () => {
  return (
    <div className="h-full overflow-y-auto">
      <PageWithAsideMenuLayout menu={<AdminMenu />} content={<Outlet />} />
    </div>
  );
};

export default AdminPageLayout;
