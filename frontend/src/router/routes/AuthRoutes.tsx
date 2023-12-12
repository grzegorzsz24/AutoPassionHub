import LoginPage from "../../pages/Auth/LoginPage";
import RegisterPage from "../../pages/Auth/RegisterPage";

const AuthRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];

export default AuthRoutes;
