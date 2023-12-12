import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";

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
