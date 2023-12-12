import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/store";

interface AdminRouteProps {
  element: JSX.Element;
}

const AdminRoute: FC<AdminRouteProps> = ({ element }) => {
  const { role } = useAppSelector((state) => state.user);
  const isAdmin = role === "ADMIN";
  return isAdmin ? element : <Navigate to="/" />;
};

export default AdminRoute;
