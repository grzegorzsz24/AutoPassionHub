import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/store";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }) => {
  const { cookieExpirationDate } = useAppSelector((state) => state.user);
  const isAuthenticated = new Date(cookieExpirationDate) > new Date();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
