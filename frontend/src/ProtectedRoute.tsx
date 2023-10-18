import { useAppDispatch, useAppSelector } from "./store/store";

import { Navigate } from "react-router-dom";
import { clearUser } from "./store/features/userSlice";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const dispatch = useAppDispatch();
  const { cookieExpirationDate } = useAppSelector((state) => state.user);

  const isAuthenticated = cookieExpirationDate > new Date();

  if (!isAuthenticated) {
    dispatch(clearUser());
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
