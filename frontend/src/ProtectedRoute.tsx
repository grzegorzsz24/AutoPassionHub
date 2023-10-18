import { Navigate } from "react-router-dom";
import { useAppSelector } from "./store/store";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { cookieExpirationDate } = useAppSelector((state) => state.user);

  const isAuthenticated = new Date(cookieExpirationDate) > new Date();
  console.log(new Date(cookieExpirationDate));
  console.log(new Date());
  console.log(`isAuthenticated: ${isAuthenticated}`);

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
